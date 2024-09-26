const express = require('express');
const https = require('https');

const app = express();
const PORT = 3000;

// Ruta para obtener personajes
app.get('/characters', (req, res) => {
  const url = 'https://rickandmortyapi.com/api/character';

  // Hacer la solicitud HTTP nativa
  https.get(url, (apiRes) => {
    let data = '';

    // A medida que recibimos datos, los vamos acumulando
    apiRes.on('data', (chunk) => {
      data += chunk;
    });

    // Cuando se recibe toda la respuesta
    apiRes.on('end', () => {
      try {
        const characters = JSON.parse(data).results;

        const characterName = characters.map((char) => {
            return char.name;
        })
        res.json(characterName);
      } catch (error) {
        console.error('Error al parsear los datos:', error.message);
        res.status(500).json({ error: 'Error al procesar la respuesta de la API' });
      }
    });

  }).on('error', (err) => {
    console.error('Error al hacer la solicitud HTTP:', err.message);
    res.status(500).json({ error: 'Error en la solicitud a la API de Rick y Morty' });
  });
});

// Servidor escuchando en el puerto
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
