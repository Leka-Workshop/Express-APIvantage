import { IUser } from '../../../databases/mongodb/model/user.model';

export class UserResponseDTO {
  _id!: string;
  username!: string;
  email!: string;

  static toResponse(user: IUser): UserResponseDTO {
    const userDTO = new UserResponseDTO();
    userDTO._id = user._id;
    userDTO.username = user.username;
    userDTO.email = user.email;

    return userDTO;
  }
}
