import { compare, hash } from 'bcrypt';

const HASH_SALT = 10;

export class Password {
    constructor(private readonly value: string) {}

    public static async hashed(password: string) {
        const hashedPassword = await hash(password, HASH_SALT);

        return new Password(hashedPassword);
    }

    public static compare(password: string, hashedPassword: Password) {
        return compare(password, hashedPassword.value);
    }

    public getValue() {
        return this.value;
    }
}
