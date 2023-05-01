import { EmailVO } from './value-objects/email.vo';
import { PasswordVO } from './value-objects/password.vo';
import { PlainPasswordVO } from './value-objects/plain.password.vo';
import { UuidVO } from './value-objects/uuid.vo';

export class User {
    /**
     * Constructor
     * @param id User unique identifier
     * @param email User email
     * @param password User hashed password
     */

    constructor(
        public readonly _id: UuidVO,
        public email: EmailVO,
        public password: PasswordVO
    ) {}

    static createUser(_id: UuidVO, email: EmailVO, password: PasswordVO) {
        return new User(_id, email, password);
    }

    public comparePassword(password: PlainPasswordVO) {
        return this.password.compare(password);
    }
}
