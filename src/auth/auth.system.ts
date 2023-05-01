import { inject, injectable } from 'inversify';
import { UserService } from './services';
import { SignOptions } from 'jsonwebtoken';
import { signAsync } from '../jwt.service';
import { User } from './user';
import { UuidVO } from './value-objects/uuid.vo';
import { EmailVO } from './value-objects/email.vo';
import { PasswordVO } from './value-objects/password.vo';
import { PlainPasswordVO } from './value-objects/plain.password.vo';
import { ContainerSymbols } from '../symbols';

@injectable()
export class AuthUser {
    constructor(
        @inject(ContainerSymbols.UserService)
        private userService: UserService
    ) {}

    async registerUser(
        _id: UuidVO,
        email: EmailVO,
        password: PasswordVO
    ): Promise<string> {
        const newUser = User.createUser(_id, email, password);

        await this.userService.register(newUser);

        return await this.createAuthToken(newUser._id);
    }

    async loginUser(
        email: EmailVO,
        password: PlainPasswordVO
    ): Promise<string> {
        const userId = await this.userService.login(email, password);

        return this.createAuthToken(userId);
    }

    async createAuthToken(id: UuidVO): Promise<string> {
        const payload = { id };
        const options: SignOptions = {
            algorithm: 'HS512',
            expiresIn: '7d',
        };
        const token = await signAsync(payload, options);
        return token;
    }
}
