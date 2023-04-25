import { UserDTO } from './dto';

const EMAIL =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const PASSWORD = /^\d{6,}$/;

const validateBody = (body: UserDTO) => {
    const { email, password } = body;

    if (!EMAIL.test(email) || !email.length) {
        throw new FormatError('El formato del email es incorrecto');
    }

    if (!PASSWORD.test(password) || !password.length) {
        throw new FormatError('El formato de la contraseña es incorrecto');
    }

    return true;
};

export { validateBody };
