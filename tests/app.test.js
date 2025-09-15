const request = require('supertest');
const { app } = require('../src/app');

// Criar server para os testes
const server = app.listen(0); // Porta aleatória para testes

describe('Tasks Microservice', () => {
  afterAll((done) => {
    server.close(done);
  });

  it('should return health check status', async () => {
    const response = await request(server).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.service).toBe('Tasks Microservice');
  });

  it('should return 404 for unknown routes', async () => {
    const response = await request(server).get('/unknown');
    expect(response.status).toBe(404);
  });
});