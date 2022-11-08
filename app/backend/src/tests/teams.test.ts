import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/teamsModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Ao acessar o endpoint /teams', () => {
  let chaiHttpResponse: Response;
  const teamsMock: unknown = [
    { id: 1, clubName: 'Avaí/Kindermann' },
    { id: 2, clubName: 'Bahia' },
    { id: 3, clubName: 'Botafogo' },
    { id: 4, clubName: 'Corinthians' },
    { id: 5, clubName: 'Cruzeiro' },
    { id: 6, clubName: 'Ferroviária' },
    { id: 7, clubName: 'Flamengo' },
    { id: 8, clubName: 'Grêmio' },
    { id: 9, clubName: 'Internacional' },
    { id: 10, clubName: 'Minas Brasília' },
    { id: 11, clubName: 'Napoli-SC' },
    { id: 12, clubName: 'Palmeiras' },
    { id: 13, clubName: 'Real Brasília' },
    { id: 14, clubName: 'Santos' },
    { id: 15, clubName: 'São José-SP' },
    { id: 16, clubName: 'São Paulo' }
  ];

  before(async () => {
    sinon
      .stub(Teams, "findAll")
      .resolves(teamsMock as Teams[]);
  });

  after(()=>{
    (Teams.findAll as sinon.SinonStub).restore();
  })

  it('Retorna status code 200 com todos os times', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams');
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(teamsMock);
  });
});
