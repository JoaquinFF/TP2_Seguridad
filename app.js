const express = require('express');
const https = require('https');

const app = express();
const PORT = 3000;

app.get('/characters', (req, res) => {
  const url = 'https://rickandmortyapi.com/api/character';

  https.get(url, (apiRes) => {
    let data = '';

    apiRes.on('data', (chunk) => {
      data += chunk;
    });

    apiRes.on('end', () => {
      try {
        const characters = JSON.parse(data).results;
        const characterName = characters.map((char) => char.name);
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

app.get('/rick-info', (req, res) => {
  const url = 'https://rickandmortyapi.com/api/character/1';

  https.get(url, (apiRes) => {
    let data = '';

    apiRes.on('data', (chunk) => {
      data += chunk;
    });

    apiRes.on('end', () => {
      try {
        const character = JSON.parse(data);
        res.status(200).json(character);
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

app.get('/hombre-pajaro', (req, res) => {
  const url = 'https://rickandmortyapi.com/api/character/?name=Birdperson&type=Bird-Person&species=Alien';

  https.get(url, (apiRes) => {
    let data = '';

    apiRes.on('data', (chunk) => {
      data += chunk;
    });

    apiRes.on('end', () => {
      try {
        const character = JSON.parse(data);
        res.status(200).json(character);
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

const apiKey = process.env.OPENWEATHERMAP_API_KEY;

app.get('/clima', (req, res) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=Mendoza&appid=${apiKey}`;

  https.get(url, (apiRes) => {
    let data = '';

    apiRes.on('data', (chunk) => {
      data += chunk;
    });

    apiRes.on('end', () => {
      try {
        const clima = JSON.parse(data);
        res.status(200).json(clima);
      } catch (error) {
        console.error('Error al parsear los datos:', error.message);
        res.status(500).json({ error: 'Error al procesar la respuesta de la API' });
      }
    });
  }).on('error', (err) => {
    console.error('Error al hacer la solicitud HTTP:', err.message);
    res.status(500).json({ error: 'Error en la solicitud al clima' });
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app; // Exporta la app para poder probarla
