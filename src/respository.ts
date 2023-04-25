import { UserSchema } from './user.model';

type UserModel = {
    _id: string;
    email: string;
    password: string;
};

export interface UserRepository {
    /**
     * Finds a user by id
     * @param id User id
     * @returns Domain user
     */
    findById(id: string): Promise<UserModel | null>;

    /**
     * Finds a user by email
     * @param email User email
     * @returns Domain user
     */
    findByEmail(email: string): Promise<UserModel | null>;

    /**
     * Persists a new user
     * @param domainUser Domain user
     */
    create(user: Object): Promise<void>;

    /**
     * Updates a user
     * @param domainUser Domain user
     */
    update(user: Object): Promise<void>;
}

export class UserRepository implements UserRepository {
    /**
     * Finds a user by id
     * @param id User id
     * @returns Domain user
     */
    async findById(_id: string): Promise<UserModel | null> {
        const userFound = UserSchema.findById(_id).exec();

        if (!userFound) return null;

        return userFound;
    }

    /**
     * Finds a user by email
     * @param email User email
     * @returns Domain user
     */
    async findByEmail(email: string): Promise<UserModel | null> {
        const userFound = UserSchema.findOne({ email }).exec();

        if (!userFound) return null;

        return userFound;
    }

    /**
     * Persists a new user
     * @param User Domain user
     */
    async create(user: UserModel): Promise<void> {
        const { password } = user;

        console.log(password);

        const newUser = new UserSchema(user);

        await newUser.save();
    }

    /**
     * Updates a user
     * @param User Domain user
     */
    async update(user: UserModel): Promise<void> {
        const { _id, ...rest } = user;

        await UserSchema.findByIdAndUpdate(_id, rest).exec;
    }
}
