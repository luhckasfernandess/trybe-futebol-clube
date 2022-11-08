import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/usersModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Ao acessar o endpoint /login', () => {
  let chaiHttpResponse: Response;
  const userMock = {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  };

  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves({
        ...userMock
      } as Users);
  });

  after(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('Retorna status code 200 e o token gerado, se foi logado com sucesso', async () => {
    chaiHttpResponse = await chai.request(app).post('/login');
    expect(chaiHttpResponse).to.have.status(200);
  });
});
