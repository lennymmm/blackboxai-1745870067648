const mssql = require('mssql');
const mysql = require('mysql2/promise');

async function getMssqlMetadata(config) {
  const pool = await mssql.connect({
    user: config.user,
    password: config.password,
    server: config.server,
    port: parseInt(config.port, 10),
    database: config.database,
    options: {
      encrypt: false,
      trustServerCertificate: true,
    },
  });

  const tablesResult = await pool.request().query(`
    SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'
  `);
  const viewsResult = await pool.request().query(`
    SELECT TABLE_NAME FROM INFORMATION_SCHEMA.VIEWS
  `);
  const procsResult = await pool.request().query(`
    SELECT ROUTINE_NAME FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_TYPE = 'PROCEDURE'
  `);

  await pool.close();

  return {
    tables: tablesResult.recordset.map(row => row.TABLE_NAME),
    views: viewsResult.recordset.map(row => row.TABLE_NAME),
    procedures: procsResult.recordset.map(row => row.ROUTINE_NAME),
  };
}

async function getMysqlMetadata(config) {
  const connection = await mysql.createConnection({
    host: config.server,
    port: parseInt(config.port, 10),
    user: config.user,
    password: config.password,
    database: config.database,
  });

  const [tablesRows] = await connection.execute(`
    SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_TYPE = 'BASE TABLE'
  `, [config.database]);

  const [viewsRows] = await connection.execute(`
    SELECT TABLE_NAME FROM INFORMATION_SCHEMA.VIEWS WHERE TABLE_SCHEMA = ?
  `, [config.database]);

  const [procsRows] = await connection.execute(`
    SELECT ROUTINE_NAME FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_SCHEMA = ? AND ROUTINE_TYPE = 'PROCEDURE'
  `, [config.database]);

  await connection.end();

  return {
    tables: tablesRows.map(row => row.TABLE_NAME),
    views: viewsRows.map(row => row.TABLE_NAME),
    procedures: procsRows.map(row => row.ROUTINE_NAME),
  };
}

async function getMetadata(connectionInfo) {
  const { dbType } = connectionInfo;
  if (!dbType) {
    throw new Error('dbType is required');
  }

  switch (dbType.toLowerCase()) {
    case 'mssql':
      return await getMssqlMetadata(connectionInfo);
    case 'mysql':
      return await getMysqlMetadata(connectionInfo);
    default:
      throw new Error(`Unsupported dbType: ${dbType}`);
  }
}

module.exports = {
  getMetadata,
};
