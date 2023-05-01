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

export class UserRepository {
    private toDomain(persistanceUser: IUser) {
        const { _id, email, password } = persistanceUser;

        return new User(
            new UuidVO(_id),
            new EmailVO(email),
            new PasswordVO(password)
        );
    }

    async findById(_id: string): Promise<User | null> {
        const userFound = await UserSchema.findById(_id).exec();
        if (!userFound) return null;

        return this.toDomain(userFound);
    }

    async findByEmail(email: string): Promise<User | null> {
        const userFound = await UserSchema.findOne({ email }).exec();
        if (!userFound) return null;

        return this.toDomain(userFound);
    }

    async create(user: User) {
        const newUser = new UserSchema(user);
        await newUser.save();
    }
}
