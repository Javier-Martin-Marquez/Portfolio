const express = require('express');
const router = express.Router();
const pool = require('../database');

// Ruta Principal
router.get('/', (req, res) => {
  // Simplemente renderiza la vista 'home.handlebars'
  // No pasamos ningún objeto con datos {}
  res.render('home');
});

// Ruta para un miembro (ejemplo estático)
router.get('/contacto', (req, res) => {
  res.render('contacto');
});

router.get('/artemis', async(req, res) => {
  const miId = 1; // En el script SQL, Artemis es el ID 1

  // 1. CONSULTA: Datos Personales
  const rows = await pool.query('SELECT * FROM miembros WHERE id = ?', [miId]);
  const yo = rows[0]; // Nos quedamos con el objeto del usuario

  // 2. CONSULTA: Habilidades y Nivel (Hacemos un JOIN)
  const misHabilidades = await pool.query(`
        SELECT h.nombre, mh.nivel 
        FROM habilidades h
        JOIN miembro_habilidad mh ON h.id = mh.habilidad_id
        WHERE mh.miembro_id = ?
    `, [miId]);

  // 3. CONSULTA: Proyectos Personales
  const misProyectos = await pool.query('SELECT * FROM proyectos_personales WHERE miembro_id = ?', [miId]);

  res.render('artemis', {
    miembro: yo,
    habilidades: misHabilidades,
    proyectos: misProyectos
  });
});

router.get('/noelia', async (req, res) => {
  const miId = 2; // En el script SQL, Noelia es el ID 2

  // 1. CONSULTA: Datos Personales
  const rows = await pool.query('SELECT * FROM miembros WHERE id = ?', [miId]);
  const yo = rows[0]; // Nos quedamos con el objeto del usuario

  // 2. CONSULTA: Habilidades y Nivel (Hacemos un JOIN)
  const misHabilidades = await pool.query(`
        SELECT h.nombre, mh.nivel 
        FROM habilidades h
        JOIN miembro_habilidad mh ON h.id = mh.habilidad_id
        WHERE mh.miembro_id = ?
    `, [miId]);

  // 3. CONSULTA: Proyectos Personales
  const misProyectos = await pool.query('SELECT * FROM proyectos_personales WHERE miembro_id = ?', [miId]);

  // 4. RENDERIZAR: Enviamos todos esos datos a la vista
  res.render('noelia', {
    miembro: yo,
    habilidades: misHabilidades,
    proyectos: misProyectos
  });
});


router.get('/javier', async (req, res) => {
  const miId = 3; // En el script SQL, Javier es el ID 3

  // 1. CONSULTA: Datos Personales
  const rows = await pool.query('SELECT * FROM miembros WHERE id = ?', [miId]);
  const yo = rows[0]; // Nos quedamos con el objeto del usuario

  // 2. CONSULTA: Habilidades y Nivel (Hacemos un JOIN)
  const misHabilidades = await pool.query(`
        SELECT h.nombre, mh.nivel 
        FROM habilidades h
        JOIN miembro_habilidad mh ON h.id = mh.habilidad_id
        WHERE mh.miembro_id = ?
    `, [miId]);

  // 3. CONSULTA: Proyectos Personales
  const misProyectos = await pool.query('SELECT * FROM proyectos_personales WHERE miembro_id = ?', [miId]);

  // 4. RENDERIZAR: Enviamos todos esos datos a la vista
  res.render('javier', {
    miembro: yo,
    habilidades: misHabilidades,
    proyectos: misProyectos
  });
});

module.exports = router;