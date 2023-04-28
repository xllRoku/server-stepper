import { UserDTO } from './dto';
import {
    FormatError,
    InvalidLoginException,
    NotUserFound,
    UserEmailAlreadyInUse,
    UserIdAlreadyInUse,
} from './errors';
import { comparePassword } from './haspassword';
import { userRepository } from './respository';

const EMAIL =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const PASSWORD = /^\d{6,}$/;

const validate = () => {
    const UserRegisterBody = (user: UserDTO) => {
        if (!EMAIL.test(user.email) || !user.email.length) {
            throw new FormatError('El formato del email es incorrecto');
        }

        if (PASSWORD.test(user.password) || !user.password.length) {
            throw new FormatError('El formato de la contraseña es incorrecto');
        }
    };

    const IfFieldsAreAlreadyInUse = async (user: UserDTO) => {
        const existingUserById = await userRepository().findById(user._id);
        if (existingUserById) throw new UserIdAlreadyInUse();

        const existingUserByEmail = await userRepository().findByEmail(
            user.email
        );
        if (existingUserByEmail) throw new UserEmailAlreadyInUse();
    };

    const IfUserExists = async (user: UserDTO) => {
        const existingUser = await userRepository().findByEmail(user.email);

        const didPasswordMatch = await comparePassword(
            existingUser!.password,
            user.password
        );

        if (!didPasswordMatch) throw new InvalidLoginException();

        return existingUser!._id;
    };

    return { UserRegisterBody, IfFieldsAreAlreadyInUse, IfUserExists };
};

export { validate };

// export class ValidateUserBody {
//     constructor() {}

//     validate(email: string, password: string) {
//         this.email(email);
//         this.password(password);
//     }

//     private email(email: string) {
//         if (!EMAIL.test(email) || !email.length) {
//             throw new FormatError('El formato del email es incorrecto');
//         }
//     }

//     private password(password: string) {
//         if (PASSWORD.test(password) || !password.length) {
//             throw new FormatError('El formato de la contraseña es incorrecto');
//         }
//     }
// }

// export class ValidateIfUserExists {
//     constructor(private userRespository: UserRepository) {}

//     async validate(_id: string, email: string) {
//         await this.existsById(_id);
//         await this.existsByEmail(email);
//     }

//     private async existsById(_id: string) {
//         const existingUserById = await this.userRespository.findByEmail(_id);
//         if (existingUserById) throw new UserIdAlreadyInUse();
//     }
//     private async existsByEmail(email: string) {
//         const existingUserById = await this.userRespository.findByEmail(email);
//         if (existingUserById) throw new UserEmailAlreadyInUse();
//     }
// }
