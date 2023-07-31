const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { app } = require("../index");
const { describe, it } = require("node:test");
const expect = chai.expect;

chai.use(chaiHttp);

describe('GET /', () => {
  it('debería retornar status 200', async () => {
    const respuesta = await chai.request(app).get('/').send();
    expect(respuesta.statusCode).to.equal(200);
  });

  it('debería retornar el mensaje de bienvenida', async () => {
    const respuesta = await chai.request(app).get('/').send();
    expect(respuesta.text).to.equal("Bienvenidos a nuestros test");
  });

  it('debería retornar status 200 y la lista de animes', async () => {
    const respuesta = await chai.request(app).get('/animes').send();
    expect(respuesta.statusCode).to.equal(200);
    expect(respuesta.body).to.be.an('object');
    expect(Object.keys(respuesta.body).length).to.be.greaterThan(0);
  });
});