import * as express from 'express';
import bodyParser = require('body-parser');
import cors = require('cors');
import userRoute from './database/routes/usersRoute';
import teamsRoute from './database/routes/teamsRoute';
import matchesRoute from './database/routes/matchesRoute';
import leaderBoardsRoute from './database/routes/leaderBoardsRoute';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.use('/login', userRoute);
    this.app.use('/teams', teamsRoute);
    this.app.use('/matches', matchesRoute);
    this.app.use('/leaderboard', leaderBoardsRoute);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
