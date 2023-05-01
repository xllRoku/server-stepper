import { UserDTO } from './dto';
import { FormatError } from '../errors';

export class UserValidator {
    private validateEmail(email: string): boolean {
        const EMAIL_REGEX =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return EMAIL_REGEX.test(email) && email.length > 0;
    }

    private validatePassword(password: string): boolean {
        const PASSWORD_REGEX = /^\d{6,}$/;
        return PASSWORD_REGEX.test(password) && password.length > 0;
    }

    async validateBody(user: UserDTO): Promise<void> {
        if (!this.validateEmail(user.email)) {
            throw new FormatError('El formato del email es incorrecto');
        }

        if (!this.validatePassword(user.password)) {
            throw new FormatError('El formato de la contraseña es incorrecto');
        }
    }
}
