import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/matchesModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Ao acessar o endpoint /matches', () => {
  let chaiHttpResponse: Response;
  const matchesMock: unknown = [
    {
      home_team: 16,
      home_team_goals: 1,
      away_team: 8,
      away_team_goals: 1,
      in_progress: false,
    },
    {
      home_team: 9,
      home_team_goals: 1,
      away_team: 14,
      away_team_goals: 1,
      in_progress: false,
    },
    {
      home_team: 4,
      home_team_goals: 3,
      away_team: 11,
      away_team_goals: 0,
      in_progress: false,
    },
    {
      home_team: 3,
      home_team_goals: 0,
      away_team: 2,
      away_team_goals: 0,
      in_progress: false,
    },
    {
      home_team: 7,
      home_team_goals: 1,
      away_team: 10,
      away_team_goals: 1,
      in_progress: false,
    },
    {
      home_team: 5,
      home_team_goals: 1,
      away_team: 13,
      away_team_goals: 1,
      in_progress: false,
    },
    {
      home_team: 12,
      home_team_goals: 2,
      away_team: 6,
      away_team_goals: 2,
      in_progress: false,
    },
    {
      home_team: 15,
      home_team_goals: 0,
      away_team: 1,
      away_team_goals: 1,
      in_progress: false,
    },
    {
      home_team: 1,
      home_team_goals: 0,
      away_team: 12,
      away_team_goals: 3,
      in_progress: false,
    },
    {
      home_team: 2,
      home_team_goals: 0,
      away_team: 9,
      away_team_goals: 2,
      in_progress: false,
    },
    {
      home_team: 13,
      home_team_goals: 1,
      away_team: 3,
      away_team_goals: 0,
      in_progress: false,
    },
    {
      home_team: 6,
      home_team_goals: 0,
      away_team: 4,
      away_team_goals: 1,
      in_progress: false,
    },
    {
      home_team: 8,
      home_team_goals: 2,
      away_team: 5,
      away_team_goals: 1,
      in_progress: false,
    },
    {
      home_team: 14,
      home_team_goals: 2,
      away_team: 16,
      away_team_goals: 1,
      in_progress: false,
    },
    {
      home_team: 10,
      home_team_goals: 0,
      away_team: 15,
      away_team_goals: 1,
      in_progress: false,
    },
    {
      home_team: 11,
      home_team_goals: 0,
      away_team: 7,
      away_team_goals: 0,
      in_progress: false,
    },
    {
      home_team: 1,
      home_team_goals: 2,
      away_team: 8,
      away_team_goals: 3,
      in_progress: false,
    },
    {
      home_team: 12,
      home_team_goals: 4,
      away_team: 5,
      away_team_goals: 2,
      in_progress: false,
    },
    {
      home_team: 11,
      home_team_goals: 2,
      away_team: 2,
      away_team_goals: 2,
      in_progress: false,
    },
    {
      home_team: 7,
      home_team_goals: 0,
      away_team: 9,
      away_team_goals: 1,
      in_progress: false,
    },
    {
      home_team: 6,
      home_team_goals: 3,
      away_team: 13,
      away_team_goals: 1,
      in_progress: false,
    },
    {
      home_team: 4,
      home_team_goals: 3,
      away_team: 3,
      away_team_goals: 1,
      in_progress: false,
    },
    {
      home_team: 15,
      home_team_goals: 2,
      away_team: 16,
      away_team_goals: 3,
      in_progress: false,
    },
    {
      home_team: 10,
      home_team_goals: 2,
      away_team: 14,
      away_team_goals: 2,
      in_progress: false,
    },
    {
      home_team: 2,
      home_team_goals: 0,
      away_team: 6,
      away_team_goals: 1,
      in_progress: false,
    },
    {
      home_team: 13,
      home_team_goals: 1,
      away_team: 1,
      away_team_goals: 0,
      in_progress: false,
    },
    {
      home_team: 5,
      home_team_goals: 1,
      away_team: 15,
      away_team_goals: 2,
      in_progress: false,
    },
    {
      home_team: 16,
      home_team_goals: 3,
      away_team: 7,
      away_team_goals: 0,
      in_progress: false,
    },
    {
      home_team: 9,
      home_team_goals: 0,
      away_team: 4,
      away_team_goals: 4,
      in_progress: false,
    },
    {
      home_team: 3,
      home_team_goals: 0,
      away_team: 12,
      away_team_goals: 4,
      in_progress: false,
    },
    {
      home_team: 8,
      home_team_goals: 2,
      away_team: 10,
      away_team_goals: 0,
      in_progress: false,
    },
    {
      home_team: 14,
      home_team_goals: 5,
      away_team: 11,
      away_team_goals: 1,
      in_progress: false,
    },
    {
      home_team: 1,
      home_team_goals: 1,
      away_team: 16,
      away_team_goals: 1,
      in_progress: false,
    },
    {
      home_team: 9,
      home_team_goals: 3,
      away_team: 6,
      away_team_goals: 1,
      in_progress: false,
    },
    {
      home_team: 10,
      home_team_goals: 1,
      away_team: 5,
      away_team_goals: 3,
      in_progress: false,
    },
    {
      home_team: 2,
      home_team_goals: 0,
      away_team: 7,
      away_team_goals: 1,
      in_progress: false,
    },
    {
      home_team: 15,
      home_team_goals: 0,
      away_team: 13,
      away_team_goals: 1,
      in_progress: false,
    },
    {
      home_team: 14,
      home_team_goals: 2,
      away_team: 4,
      away_team_goals: 1,
      in_progress: false,
    },
    {
      home_team: 3,
      home_team_goals: 2,
      away_team: 11,
      away_team_goals: 0,
      in_progress: false,
    },
    {
      home_team: 12,
      home_team_goals: 4,
      away_team: 8,
      away_team_goals: 1,
      in_progress: false,
    },
    {
      home_team: 16,
      home_team_goals: 2,
      away_team: 9,
      away_team_goals: 0,
      in_progress: true,
    },
    {
      home_team: 6,
      home_team_goals: 1,
      away_team: 1,
      away_team_goals: 0,
      in_progress: true,
    },
    {
      home_team: 11,
      home_team_goals: 0,
      away_team: 10,
      away_team_goals: 0,
      in_progress: true,
    },
    {
      home_team: 7,
      home_team_goals: 2,
      away_team: 15,
      away_team_goals: 2,
      in_progress: true,
    },
    {
      home_team: 5,
      home_team_goals: 1,
      away_team: 3,
      away_team_goals: 1,
      in_progress: true,
    },
    {
      home_team: 4,
      home_team_goals: 1,
      away_team: 12,
      away_team_goals: 1,
      in_progress: true,
    },
    {
      home_team: 8,
      home_team_goals: 1,
      away_team: 14,
      away_team_goals: 2,
      in_progress: true,
    },
    {
      home_team: 13,
      home_team_goals: 1,
      away_team: 2,
      away_team_goals: 1,
      in_progress: true,
    }
  ];

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
