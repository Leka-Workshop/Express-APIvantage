import { Express, Request, Response } from 'express';
import mongooseUsersRouter from '../controllers/mongoose/user.controller';
import typeormProductsRouter from '../controllers/typeorm/product.controller';
import responseInterceptor from '../shared/middlewares/response-interceptor';

const routerSetup = (app: Express) =>
  app

    .get('/', async (req: Request, res: Response) => {
      res.send('Hello Express APIvantage!');
    })

    // place interceptor above all routes that you want to intercept
    // interceptor will trigger for every request
    .use(responseInterceptor)
    .use('/api/mongoose/users', mongooseUsersRouter)
    .use('/api/typeorm/products', typeormProductsRouter)

export default routerSetup;
