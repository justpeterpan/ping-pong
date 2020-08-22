const supertest = require('supertest');

const app = require('../../app');

describe('GET /api/v1/players', () => {
  it('should respond with  an array of players', async () => {
    const response = await supertest(app).get('/api/v1/players').expect('Content-Type', /json/).expect(200);

    expect(response.body).toEqual([]);
  });
});
