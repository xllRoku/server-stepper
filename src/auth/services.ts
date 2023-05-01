import {
    InvalidLoginException,
    UserEmailAlreadyInUse,
    UserIdAlreadyInUse,
} from '../errors';
import { comparePassword } from '../haspassword';
import { UserDTO } from './dto';
import { UserRepository } from './respository';
import { User } from './user';
import { EmailVO } from './value-objects/email.vo';
import { PlainPasswordVO } from './value-objects/plain.password.vo';

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

    async register(user: User) {
        await this.existsUserById(user._id.value);
        await this.existsUserByEmail(user.email.value);
        await this.userRepository.create(user);
    }

    async login(email: EmailVO, password: PlainPasswordVO) {
        const existingUser = await this.userRepository.findByEmail(email.value);

        if (!existingUser) {
            throw new InvalidLoginException();
        }

        const didPasswordMatch = await existingUser.comparePassword(password);

        if (!didPasswordMatch) {
            throw new InvalidLoginException();
        }

        return existingUser._id;
    }
}
