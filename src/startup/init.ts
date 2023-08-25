import { Express } from 'express';
import mongooseConnect from '../databases/mongodb/mongodb';
import typeORMConnect from '../databases/postgresql/typeorm';

const appSetup = async (app: Express) => {

  try {
    await Promise.all([
      typeORMConnect(),
      mongooseConnect(),
    ]);

    console.log('Databases connected successfully!');
    const PORT = Number(process.env.PORT) || 3000;

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });

  } catch (error: unknown) {
    console.log('Unable to start the app!');
    console.error(error);
  }
};

export default appSetup;
