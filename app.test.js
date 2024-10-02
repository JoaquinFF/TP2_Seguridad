const request = require('supertest');
const https = require('https');
const app = require('./app'); // Importa tu aplicación Express

jest.mock('https'); // Mockea el módulo https

describe('GET /characters', () => {
  it('should return a list of character names', async () => {
    const mockData = JSON.stringify({
      results: [
        { name: 'Rick Sanchez' },
        { name: 'Morty Smith' }
      ]
    });

    https.get.mockImplementation((url, callback) => {
      const apiRes = {
        on: jest.fn().mockImplementation((event, handler) => {
          if (event === 'data') handler(mockData);
          if (event === 'end') handler();
        })
      };
      callback(apiRes);
      return { on: jest.fn() }; // Mock de `on` para capturar errores
    });

    const res = await request(app).get('/characters');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(['Rick Sanchez', 'Morty Smith']);
  });

  it('should handle API errors', async () => {
    https.get.mockImplementation((url, callback) => {
      return {
        on: jest.fn((event, handler) => {
          if (event === 'error') handler(new Error('Simulated API error'));
        })
      };
    });

    const res = await request(app).get('/characters');
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      error: 'Error en la solicitud a la API de Rick y Morty'
    });
  });
});

describe('GET /rick-info', () => {
  it('should return Rick\'s info', async () => {
    const mockData = JSON.stringify({
      id: 1,
      name: 'Rick Sanchez',
      species: 'Human'
    });

    https.get.mockImplementation((url, callback) => {
      const apiRes = {
        on: jest.fn().mockImplementation((event, handler) => {
          if (event === 'data') handler(mockData);
          if (event === 'end') handler();
        })
      };
      callback(apiRes);
      return { on: jest.fn() }; // Mock de `on` para capturar errores
    });

    const res = await request(app).get('/rick-info');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      name: 'Rick Sanchez',
      species: 'Human'
    });
  });

  it('should handle API errors', async () => {
    https.get.mockImplementation((url, callback) => {
      return {
        on: jest.fn((event, handler) => {
          if (event === 'error') handler(new Error('Simulated API error'));
        })
      };
    });

    const res = await request(app).get('/rick-info');
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      error: 'Error en la solicitud a la API de Rick y Morty'
    });
  });
});

describe('GET /hombre-pajaro', () => {
  it('should return Birdperson\'s info', async () => {
    const mockData = JSON.stringify({
      results: [
        { id: 47, name: 'Birdperson', species: 'Alien' }
      ]
    });

    https.get.mockImplementation((url, callback) => {
      const apiRes = {
        on: jest.fn().mockImplementation((event, handler) => {
          if (event === 'data') handler(mockData);
          if (event === 'end') handler();
        })
      };
      callback(apiRes);
      return { on: jest.fn() }; // Mock de `on` para capturar errores
    });

    const res = await request(app).get('/hombre-pajaro');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      results: [
        { id: 47, name: 'Birdperson', species: 'Alien' }
      ]
    });
  });

  it('should handle API errors', async () => {
    https.get.mockImplementation((url, callback) => {
      return {
        on: jest.fn((event, handler) => {
          if (event === 'error') handler(new Error('Simulated API error'));
        })
      };
    });

    const res = await request(app).get('/hombre-pajaro');
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      error: 'Error en la solicitud a la API de Rick y Morty'
    });
  });
});
