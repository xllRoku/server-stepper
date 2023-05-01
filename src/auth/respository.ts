import { UserDTO } from './dto';
import { UserSchema } from './user.model';

export class UserRepository {
    async findById(_id: string): Promise<string | null> {
        const userFound = await UserSchema.findById(_id).exec();
        if (!userFound) return null;
        return userFound._id;
    }

    async findByEmail(email: string) {
        const userFound = await UserSchema.findOne({ email }).exec();
        if (!userFound) return null;
        return userFound;
    }

    async create(user: UserDTO) {
        const newUser = new UserSchema(user);
        await newUser.save();
    }
}
