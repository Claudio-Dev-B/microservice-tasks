const request = require('supertest');
const { app } = require('../src/app'); // ✅ Correto - importar app

describe('Tasks Microservice', () => {
  it('should return health check status', async () => {
    const response = await request(app).get('/health'); // ✅ Agora funciona
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.service).toBe('Tasks Microservice');
  });

  it('should return 404 for unknown routes', async () => {
    const response = await request(app).get('/unknown');
    expect(response.status).toBe(404);
  });
});