import { hashPassword } from '../haspassword';
import { UserDTO } from './dto';
import { UserService } from './services';
import uuid from 'uuid-random';
import { UserValidator } from './validations';
import { SignOptions } from 'jsonwebtoken';
import { signAsync } from '../jwt.service';

export class AuthUser {
    private readonly userService: UserService;
    private readonly userValidator: UserValidator;

    constructor(userService: UserService, userValidator: UserValidator) {
        this.userService = userService;
        this.userValidator = userValidator;
    }

    async registerUser(user: UserDTO): Promise<string> {
        this.userValidator.validateBody(user);

        const id = uuid();
        const hashedPassword = await hashPassword(user.password);

        const newUser = {
            _id: id,
            email: user.email,
            password: hashedPassword,
        };

        await this.userService.register(newUser);

        return await this.createAuthToken(newUser._id);
    }

    async loginUser(user: UserDTO): Promise<string> {
        this.userValidator.validateBody(user);
        const userId = await this.userService.login(user);

        return this.createAuthToken(userId);
    }

    async createAuthToken(id: string): Promise<string> {
        const payload = { id };
        const options: SignOptions = {
            algorithm: 'HS512',
            expiresIn: '7d',
        };
        const token = await signAsync(payload, options);
        return token;
    }
}
