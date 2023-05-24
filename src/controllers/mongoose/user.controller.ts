import { Router, Request, Response } from 'express';
import { IUser } from '../../databases/mongodb/model/user.model';
import UserModel from '../../databases/mongodb/schema/user.schema';

const controller = Router();

controller

  .post('/', async (req, res) => {
    const newUser = new UserModel();
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.password = req.body.password;

    await newUser.save();
    res.status(201).send(newUser);
  })

  .get('/', async (req: Request, res: Response) => {
    const users = await UserModel.find({});
    res.send(users);
  })

  .get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: 'Required parameter "id" is missing!' });
    }

    const existingUser = await UserModel.findById(id);

    if (!existingUser) {
      return res.status(404).send({ message: `User with id: ${id} was not found.` });
    }

    res.send(existingUser);
  })

  .patch('/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: 'Required parameter "id" is missing!' });
    }

    const existingUser = await UserModel.findById(id);

    if (!existingUser) {
      return res
        .status(404)
        .send({ message: `User with id: ${id} was not found.` });
    }

    const changes: Partial<IUser> = req.body;

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: id },
      { $set: { ...changes } },
      { new: true }
    );

    res.send(updatedUser);
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: 'Required parameter "id" is missing!' });
    }

    const existingUser = await UserModel.findById(id);

    if (!existingUser) {
      return res.status(404).send({ message: `User with id: ${id} was not found.` });
    }

    await UserModel.findOneAndRemove({ _id: id });

    res.send({ message: 'User removed!' });
  });

export default controller;
