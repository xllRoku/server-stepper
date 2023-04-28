export class FormatError extends Error {}

export class AplicationError extends Error {}

export class UserEmailAlreadyInUse extends AplicationError {
    constructor() {
        super('El email ya está en uso');
    }
}

export class UserIdAlreadyInUse extends Error {
    constructor() {
        super('El ID del usuario ya está en uso');
    }
}

export class NotUserFound extends AplicationError {
    constructor() {
        super('El usuario no existe');
    }
}

export class InvalidLoginException extends AplicationError {
    constructor() {
        super('Credenciales incorrectas');
    }
}
