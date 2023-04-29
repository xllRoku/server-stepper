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
