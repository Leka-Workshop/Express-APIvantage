import { IUser } from '../../../databases/mongodb/model/user.model';

export class UserResponseDTO {
  id!: string;
  username!: string;
  email!: string;

  static toResponse(user: IUser): UserResponseDTO {
    const userDTO = new UserResponseDTO();
    userDTO.id = user._id;
    userDTO.username = user.username;
    userDTO.email = user.email;

    return userDTO;
  }
}
