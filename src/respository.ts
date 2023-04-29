import { UserDTO } from './dto';
import { UserSchema } from './user.model';

type UserModel = {
    _id: string;
    email: string;
    password: string;
};

const userRepository = () => {
    const findById = (_id: string) => {
        const userFound = UserSchema.findById(_id).exec();
        if (!userFound) return null;
        return userFound;
    };

    const findByEmail = (email: string) => {
        const userFound = UserSchema.findOne({ email }).exec();
        if (!userFound) return null;
        return userFound;
    };

    const register = async (user: UserDTO) => {
        const newUser = new UserSchema(user);
        await newUser.save();
    };

    return { register, findByEmail, findById };
};

export { userRepository };
