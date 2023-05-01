import { inject, injectable } from 'inversify';
import {
    InvalidLoginException,
    UserEmailAlreadyInUse,
    UserIdAlreadyInUse,
} from '../errors';
import { UserRepository } from './respository';
import { User } from './user';
import { EmailVO } from './value-objects/email.vo';
import { PlainPasswordVO } from './value-objects/plain.password.vo';
import { UuidVO } from './value-objects/uuid.vo';
import { ContainerSymbols } from '../symbols';

@injectable()
export class UserService {
    constructor(
        @inject(ContainerSymbols.UserRepository)
        private userRepository: UserRepository
    ) {}

    private async existsUserById(_id: UuidVO) {
        const existingUserById = await this.userRepository.findById(_id);
        if (existingUserById) {
            throw new UserIdAlreadyInUse();
        }
    }

    private async existsUserByEmail(email: EmailVO) {
        const existingUserByEmail = await this.userRepository.findByEmail(
            email
        );
        if (existingUserByEmail) {
            throw new UserEmailAlreadyInUse();
        }
    }

    async register(user: User) {
        await this.existsUserById(user._id);
        await this.existsUserByEmail(user.email);
        await this.userRepository.create(user);
    }

    async login(email: EmailVO, password: PlainPasswordVO) {
        const existingUser = await this.userRepository.findByEmail(email);

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
