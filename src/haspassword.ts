import { compare, hash } from 'bcrypt';

const HASH_SALT = 10;

const hashPassword = async (password: string) => {
    return await hash(password, HASH_SALT);
};

const comparePassword = async (cantidadePassword: string, password: string) => {
    return await compare(cantidadePassword, password);
};

export { hashPassword, comparePassword };

// export class Password {
//     constructor(private readonly value: string) {}

//     public static async hashed(password: string) {
//         const hashedPassword = await hash(password, HASH_SALT);

//         return new Password(hashedPassword);
//     }

//     public static compare(password: string, hashedPassword: Password) {
//         return compare(password, hashedPassword.value);
//     }

//     public getValue() {
//         return this.value;
//     }
// }
