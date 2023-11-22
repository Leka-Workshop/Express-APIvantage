import { Express, Request, Response } from 'express';
import mongooseUsersRouter from '../controllers/mongoose/user.controller';
import typeormProductsRouter from '../controllers/typeorm/product.controller';
import responseInterceptor from '../shared/middlewares/response-interceptor';
import { exceptionHandler } from '../shared/middlewares/exception-handling.middleware';
import { pageNotFoundExceptionHandler } from '../shared/middlewares/page-not-found-exception-handler.middleware';

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

    // asterisk handles all request paths, but because the order maters,
    // it will ignore route paths that came before
    .use('*', pageNotFoundExceptionHandler)

    // The exception handling middleware is the last one in the pipeline
    .use(exceptionHandler)

export default routerSetup;
