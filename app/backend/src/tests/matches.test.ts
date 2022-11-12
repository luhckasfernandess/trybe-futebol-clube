import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/matchesModel';
import IMatches from '../database/interfaces/IMatches';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const matchesMock: IMatches[]= [
  {
    id: 1,
    homeTeam: 7,
    homeTeamGoals: 3,
    awayTeam: 16,
    awayTeamGoals: 0,
    inProgress: false,
  },
  {
    id: 2,
    homeTeam: 3,
    homeTeamGoals: 0,
    awayTeam: 2,
    awayTeamGoals: 3,
    inProgress: false,
  },
  {
    id: 3,
    homeTeam: 7,
    homeTeamGoals: 5,
    awayTeam: 3,
    awayTeamGoals: 1,
    inProgress: true,
  },
  {
    id: 4,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 14,
    awayTeamGoals: 2,
    inProgress: true,
  },
];

describe('Ao acessar o endpoint /matches', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Matches, "findAll")
      .resolves(matchesMock as Matches[]);
  });

  after(()=>{
    (Matches.findAll as sinon.SinonStub).restore();
  })

  it('Retorna status code 200 com todas as partidas', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches');
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(matchesMock);
  });
});

describe('Ao acessar o endpoint /matches?inProgress=true', () => {
  let chaiHttpResponse: Response;
  const matchesInProgressMock = matchesMock.filter((matches) => matches.inProgress === true);

  before(async () => {
    sinon
      .stub(Matches, "findAll")
      .resolves(matchesInProgressMock as Matches[]);
  });

  after(()=>{
    (Matches.findAll as sinon.SinonStub).restore();
  })

  it('Retorna status code 200 com as partidas em progresso', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(matchesInProgressMock);
  });
});