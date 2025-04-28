function generateApiCode(selected) {
  const { tables = [], views = [], procedures = [] } = selected;

  let code = `// Código generado de API REST con Express.js\n`;
  code += `const express = require('express');\n`;
  code += `const app = express();\n`;
  code += `app.use(express.json());\n\n`;

  code += `// Rutas para tablas\n`;
  tables.forEach(table => {
    code += `app.get('/api/${table}', (req, res) => {\n`;
    code += `  // TODO: Obtener todos los registros de la tabla ${table}\n`;
    code += `  res.send('GET all from ${table}');\n`;
    code += `});\n\n`;

    code += `app.get('/api/${table}/:id', (req, res) => {\n`;
    code += `  // TODO: Obtener registro por id de la tabla ${table}\n`;
    code += `  res.send('GET by id from ${table}');\n`;
    code += `});\n\n`;

    code += `app.post('/api/${table}', (req, res) => {\n`;
    code += `  // TODO: Crear nuevo registro en la tabla ${table}\n`;
    code += `  res.send('POST to ${table}');\n`;
    code += `});\n\n`;

    code += `app.put('/api/${table}/:id', (req, res) => {\n`;
    code += `  // TODO: Actualizar registro por id en la tabla ${table}\n`;
    code += `  res.send('PUT to ${table}');\n`;
    code += `});\n\n`;

    code += `app.delete('/api/${table}/:id', (req, res) => {\n`;
    code += `  // TODO: Eliminar registro por id en la tabla ${table}\n`;
    code += `  res.send('DELETE from ${table}');\n`;
    code += `});\n\n`;
  });

  code += `// Rutas para vistas\n`;
  views.forEach(view => {
    code += `app.get('/api/${view}', (req, res) => {\n`;
    code += `  // TODO: Obtener todos los registros de la vista ${view}\n`;
    code += `  res.send('GET all from ${view}');\n`;
    code += `});\n\n`;

    code += `app.get('/api/${view}/:id', (req, res) => {\n`;
    code += `  // TODO: Obtener registro por id de la vista ${view}\n`;
    code += `  res.send('GET by id from ${view}');\n`;
    code += `});\n\n`;
  });

  code += `// Rutas para procedimientos almacenados\n`;
  procedures.forEach(proc => {
    code += `app.post('/api/procedure/${proc}', (req, res) => {\n`;
    code += `  // TODO: Ejecutar procedimiento almacenado ${proc}\n`;
    code += `  res.send('POST to procedure ${proc}');\n`;
    code += `});\n\n`;
  });

  code += `const port = 3000;\n`;
  code += `app.listen(port, () => {\n`;
  code += `  console.log(\`API REST generada escuchando en http://localhost:\${port}\`);\n`;
  code += `});\n`;

  return code;
}

module.exports = {
  generateApiCode,
};
