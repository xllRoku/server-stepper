import { UserDTO } from './dto';
import { UserSchema } from './user.model';

function UserService() {
    function createUser(user: UserDTO) {
        console.log(user);
        const newUser = new UserSchema({
            _id: user._id,
            email: user.email,
            password: user.password,
        });
        newUser.save();
    }

    return { createUser };
}

export { UserService };
