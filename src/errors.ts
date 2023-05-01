export class FormatError extends Error {}

export class ApplicationConflictException extends Error {}

export class DomainFormatException extends Error {}

export class UserEmailAlreadyInUse extends ApplicationConflictException {
    constructor() {
        super('El email ya está en uso');
    }
}

export class UserIdAlreadyInUse extends ApplicationConflictException {
    constructor() {
        super('El ID del usuario ya está en uso');
    }
}

export class NotUserFound extends ApplicationConflictException {
    constructor() {
        super('El usuario no existe');
    }
}

export class InvalidLoginException extends ApplicationConflictException {
    constructor() {
        super('Credenciales incorrectas');
    }
}

export class VOFormatException extends DomainFormatException {
    constructor(constructorName: string, value: any) {
        super(`${constructorName}: Invalid value ${JSON.stringify(value)}`);
    }
}
