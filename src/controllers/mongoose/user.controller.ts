import { Router, Request, Response } from 'express';
import { IUser } from '../../databases/mongodb/model/user.model';
import UserModel from '../../databases/mongodb/schema/user.schema';
import {
  changePasswordValidator,
  createUserValidator,
  getUserByIdValidator,
  updateUserValidator,
} from '../../shared/middlewares/user-validator.middleware';

const controller = Router();

controller

  .post('/', createUserValidator, async (req, res) => {
    try {
      const newUser = new UserModel();
      newUser.username = req.body.username;
      newUser.email = req.body.email;
      newUser.password = req.body.password;

      await newUser.save();
    } catch(e: any) {

      // If unique mongoose constraint (for username or email) is violated
      if (e.name === 'MongoServerError' && e.code === 11000) {
        return res.status(422).send({ message: 'User already exists!' });
      }
      res.status(500).send({ message: 'Unable to save entry to DB!' })
    }
  })

  .get('/', async (req: Request, res: Response) => {
    try {
      const users = await UserModel.find({});
      res.send(users);
    } catch(e: unknown) {
      res.status(500).send({ message: 'Unable to retrieve data from DB!' })
    }
  })

  .get('/:id', getUserByIdValidator, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const existingUser = await UserModel.findById(id);

      if (!existingUser) {
        return res
          .status(404)
          .send({ message: `User with id: ${id} was not found.` });
      }

      res.send(existingUser);

    } catch(e: unknown) {
      res.status(500).send({ message: 'Unable to retrieve data from DB!' })
    }
  })

  .patch('/:id', getUserByIdValidator, updateUserValidator, async (req, res) => {
    try {
      const { id } = req.params;

      const changes: Partial<IUser> = req.body;

      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: id },
        { $set: { ...changes } },
        { new: true }
      );

      if (!updatedUser) {
        return res
          .status(404)
          .send({ message: `User with id: ${id} was not found.` });
      }

      res.send(updatedUser);
    } catch(e: unknown) {
      res.status(500).send({ message: 'Unable to update data in DB!' })
    }
  })

  .patch(
    '/change-password/:id',
    getUserByIdValidator,
    changePasswordValidator,
    async (req: Request, res: Response) => {
      try {
        const { id } = req.params;

        const updatedUser = await UserModel.findOneAndUpdate(
          { _id: id },
          { $set: { password: req.body.new_password } },
          { new: true }
        );

        if (!updatedUser) {
          return res
            .status(404)
            .send({ message: `User with id: ${id} was not found.` });
        }

        res.send(updatedUser);
      } catch(e: unknown) {
        res.status(500).send({ message: 'Unable to update data in DB!' })
      }
    }
  )

  .delete('/:id', getUserByIdValidator, async (req, res) => {
    try {
      const { id } = req.params;

      const existingUser = await UserModel.findById(id);

      if (!existingUser) {
        return res
          .status(404)
          .send({ message: `User with id: ${id} was not found.` });
      }

      await UserModel.findOneAndRemove({ _id: id });

      res.send({ message: 'User removed!' });

    } catch(e: unknown) {
      res.status(500).send({ message: 'Unable to delete entry from DB!' })
    }
  });

export default controller;
