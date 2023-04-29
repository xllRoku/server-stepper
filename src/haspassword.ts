import { compare, hash } from 'bcrypt';

const HASH_SALT = 10;

const hashPassword = async (password: string) => {
    return await hash(password, HASH_SALT);
};

const comparePassword = async (cantidadePassword: string, password: string) => {
    return await compare(cantidadePassword, password);
};

export { hashPassword, comparePassword };
