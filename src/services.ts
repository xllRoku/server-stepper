import { UserDTO } from './dto';
import { userRepository } from './respository';
import { validate } from './validations';

const userRegisterUseCase = async (user: UserDTO) => {
    await validate().IfFieldsAreAlreadyInUse(user);
    await userRepository().register(user);
};

const userLoginUseCase = async (user: UserDTO) => {
    return await validate().IfUserExists(user);
};

export { userRegisterUseCase, userLoginUseCase };

// export class UserRegisterUseCase {
//     private validateIfUserExists: ValidateIfUserExists;
//     constructor(private userRepository: UserRepository) {
//         this.validateIfUserExists = new ValidateIfUserExists(
//             new UserRepository()
//         );
//     }

//     async register(
//         _id: string,
//         email: string,
//         password: string
//     ): Promise<void> {
//         await this.validateIfUserExists.validate(_id, email);

//         const newUser = {
//             _id,
//             email,
//             password,
//         };

//         await this.userRepository.create(newUser);
//     }
// }

// export class UserLoginUSeCase {
//     private validateIfUserExists: ValidateIfUserExists;
//     constructor(private userRepository: UserRepository) {
//         this.validateIfUserExists = new ValidateIfUserExists(
//             new UserRepository()
//         );
//     }

//     async register(
//         _id: string,
//         email: string,
//         password: string
//     ): Promise<void> {
//         await this.validateIfUserExists.validate(_id, email);

//         const newUser = {
//             _id,
//             email,
//             password,
//         };

//         await this.userRepository.create(newUser);
//     }
// }
