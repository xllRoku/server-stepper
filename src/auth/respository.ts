import { injectable } from 'inversify';
import { User } from './user';
import { UserSchema } from './user.model';
import { EmailVO } from './value-objects/email.vo';
import { PasswordVO } from './value-objects/password.vo';
import { UuidVO } from './value-objects/uuid.vo';

type IUser = {
    _id: string;
    email: string;
    password: string;
};

export interface IUserRepository {
    /**
     * Finds a user by id
     * @param id User id
     * @returns Domain user
     */
    findById(id: UuidVO): Promise<User | null>;

    /**
     * Finds a user by email
     * @param email User email
     * @returns Domain user
     */
    findByEmail(email: EmailVO): Promise<User | null>;

    /**
     * Persists a new user
     * @param domainUser Domain user
     */
    create(domainUser: User): Promise<void>;

    /**
     * Updates a user
     * @param domainUser Domain user
     */
    update(domainUser: User): Promise<void>;
}

@injectable()
export class UserRepository implements IUserRepository {
    /**
     * Transforms a database user into a domain user
     * @param persistanceUser Database user
     * @returns Domain user
     */
    private toDomain(persistanceUser: IUser) {
        const { _id, email, password } = persistanceUser;

        return new User(
            new UuidVO(_id),
            new EmailVO(email),
            new PasswordVO(password)
        );
    }

    /**
     * Transforms a domain user into a database user
     * @param domainUser Domain user
     * @returns Database user
     */
    private toPersistance(domainUser: User) {
        const { _id, email, password } = domainUser;

        return {
            _id: _id.value,
            email: email.value,
            password: password.value,
        };
    }

    /**
     * Finds a user by id
     * @param id User id
     * @returns Domain user
     */

    async findById(_id: UuidVO): Promise<User | null> {
        const userFound = await UserSchema.findById(_id.value).exec();
        if (!userFound) return null;

        return this.toDomain(userFound);
    }

    /**
     * Finds a user by email
     * @param email User email
     * @returns Domain user
     */

    async findByEmail(email: EmailVO): Promise<User | null> {
        const userFound = await UserSchema.findOne({
            email: email.value,
        }).exec();
        if (!userFound) return null;

        return this.toDomain(userFound);
    }

    /**
     * Persists a new user
     * @param User Domain user
     */

    async create(user: User) {
        const persistanceUser = this.toPersistance(user);

        const newUser = new UserSchema(persistanceUser);
        await newUser.save();
    }

    async update(domainUser: User): Promise<void> {}
}
