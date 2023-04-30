import { UserDTO } from './dto';
import { userRepository } from './respository';
import { validate } from './validations';

export class UserService {
    async register(user: UserDTO) {
        await validate().IfFieldsAreAlreadyInUse(user);
        await userRepository().register(user);
    }

    async login(user: UserDTO) {
        return await validate().IfUserExists(user);
    }
}
