import {
    InvalidLoginException,
    UserEmailAlreadyInUse,
    UserIdAlreadyInUse,
} from '../errors';
import { comparePassword } from '../haspassword';
import { UserDTO } from './dto';
import { UserRepository } from './respository';

export class UserService {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    private async existsUserById(_id: string) {
        const existingUserById = await this.userRepository.findById(_id);
        if (existingUserById) {
            throw new UserIdAlreadyInUse();
        }
    }

    private async existsUserByEmail(email: string) {
        const existingUserByEmail = await this.userRepository.findByEmail(
            email
        );
        if (existingUserByEmail) {
            throw new UserEmailAlreadyInUse();
        }
    }

    async register(user: UserDTO) {
        await this.existsUserById(user._id);
        await this.existsUserByEmail(user.email);
        await this.userRepository.create(user);
    }

    async login(user: UserDTO) {
        const existingUser = await this.userRepository.findByEmail(user.email);

        if (!existingUser) {
            throw new InvalidLoginException();
        }

        const didPasswordMatch = await comparePassword(
            user.password,
            existingUser.password
        );
        if (!didPasswordMatch) {
            throw new InvalidLoginException();
        }

        return existingUser._id;
    }
}
