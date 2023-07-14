const express = require('express');
const mysql = require('mysql2');
const config = require('./db/config.js');

const app = express();
const connection = mysql.createConnection(config);

connection.connect((error) => {
  if (error) {
    console.error('Error de conexión a la base de datos:', error);
    throw error;
  }
  console.log('Conexión exitosa a la base de datos MySQL.');
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Ruta para guardar datos de doctores
app.post('/doctores', (req, res) => {
  const data = req.body;

  connection.query('INSERT INTO doctor_tabla SET ?', data, (error, results) => {
    if (error) {
      console.error('Error al guardar los datos del doctor:', error);
      res.status(500).json({ error: 'Error al guardar los datos del doctor.' });
    } else {
      res.status(200).json({ message: 'Datos del doctor guardados correctamente.' });
    }
  });
});

// Ruta para guardar datos de pacientes
app.post('/pacientes', (req, res) => {
  const data = req.body;

  connection.query('INSERT INTO personas_tabla SET ?', data, (error, results) => {
    if (error) {
      console.error('Error al guardar los datos del paciente:', error);
      res.status(500).json({ error: 'Error al guardar los datos del paciente.' });
    } else {
      res.status(200).json({ message: 'Datos del paciente guardados correctamente.' });
    }
  });
});

// Obtener lista de doctores
app.get('/doctores', (req, res) => {
  connection.query('SELECT * FROM doctor_tabla', (error, results) => {
    if (error) {
      console.error('Error al obtener la lista de doctores:', error);
      res.status(500).json({ error: 'Error al obtener la lista de doctores.' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Obtener lista de pacientes
app.get('/pacientes', (req, res) => {
  connection.query('SELECT * FROM personas_tabla', (error, results) => {
    if (error) {
      console.error('Error al obtener la lista de pacientes:', error);
      res.status(500).json({ error: 'Error al obtener la lista de pacientes.' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor en funcionamiento en http://localhost:3000');
});
