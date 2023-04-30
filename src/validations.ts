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

        if (!PASSWORD.test(user.password) || !user.password.length) {
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
            user.password,
            existingUser!.password
        );

        if (!didPasswordMatch) throw new InvalidLoginException();

        return existingUser!._id;
    };

    return { UserRegisterBody, IfFieldsAreAlreadyInUse, IfUserExists };
};

export { validate };
