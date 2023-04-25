import {
    FormatError,
    UserEmailAlreadyInUse,
    UserIdAlreadyInUse,
} from './errors';
import { UserRepository } from './respository';

const EMAIL =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const PASSWORD = /^\d{6,}$/;

export class ValidateUserBody {
    constructor() {}

    validate(email: string, password: string) {
        this.email(email);
        this.password(password);
    }

    private email(email: string) {
        if (!EMAIL.test(email) || !email.length) {
            throw new FormatError('El formato del email es incorrecto');
        }
    }

    private password(password: string) {
        if (PASSWORD.test(password) || !password.length) {
            throw new FormatError('El formato de la contraseña es incorrecto');
        }
    }
}

export class ValidateIfUserExists {
    constructor(private userRespository: UserRepository) {}

    async validate(_id: string, email: string) {
        await this.existsById(_id);
        await this.existsByEmail(email);
    }

    private async existsById(_id: string) {
        const existingUserById = await this.userRespository.findByEmail(_id);
        if (existingUserById) throw new UserIdAlreadyInUse();
    }
    private async existsByEmail(email: string) {
        const existingUserById = await this.userRespository.findByEmail(email);
        if (existingUserById) throw new UserEmailAlreadyInUse();
    }
}
