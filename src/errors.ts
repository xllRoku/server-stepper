export class FormatError extends Error {}

export class UserEmailAlreadyInUse extends Error {
    constructor() {
        super('El email ya está en uso');
    }
}

export class UserIdAlreadyInUse extends Error {
    constructor() {
        super('El ID del usuario ya está en uso');
    }
}
