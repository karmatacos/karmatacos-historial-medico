const express = require("express");
const cors = require("cors");
require("dotenv").config();

const conexion = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend funcionando correctamente");
});

app.get("/api/probar-db", async (req, res) => {
  try {
    const [rows] = await conexion.query("SELECT 1 + 1 AS resultado");

    res.json({
      mensaje: "Conexión a MySQL correcta",
      resultado: rows[0].resultado
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al conectar con MySQL",
      error: error.message
    });
  }
});

app.get("/api/medicos", async (req, res) => {
  try {
    const [rows] = await conexion.query("SELECT * FROM medicos");
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener médicos",
      error: error.message
    });
  }
});

// Login del médico usando MySQL
app.post("/api/login", async (req, res) => {
  try {
    const { usuario, password } = req.body;

    const [rows] = await conexion.query(
      `SELECT id_medico, nombre, especialidad, cmp, usuario
       FROM medicos
       WHERE usuario = ? AND password = ?`,
      [usuario, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        mensaje: "Usuario o contraseña incorrectos"
      });
    }

    res.json({
      mensaje: "Login correcto",
      medico: rows[0]
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error en el login",
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});