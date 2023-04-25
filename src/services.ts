import { UserRepository } from './respository';
import { ValidateIfUserExists } from './validations';

export class UserRegisterUseCase {
    private validateIfUserExists: ValidateIfUserExists;
    constructor(private userRepository: UserRepository) {
        this.validateIfUserExists = new ValidateIfUserExists(
            new UserRepository()
        );
    }

    async register(
        _id: string,
        email: string,
        password: string
    ): Promise<void> {
        await this.validateIfUserExists.validate(_id, email);

        const newUser = {
            _id,
            email,
            password,
        };

        await this.userRepository.create(newUser);
    }
}
