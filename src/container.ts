import 'reflect-metadata';
import { Container } from 'inversify';
import { IUserRepository, UserRepository } from './auth/respository';
import { ContainerSymbols } from './symbols';
import { AuthUser } from './auth/auth.system';
import { UserService } from './auth/services';
import { UserController } from './auth/controllers';

const container = new Container();

container
    .bind<IUserRepository>(ContainerSymbols.UserRepository)
    .to(UserRepository);

container.bind<AuthUser>(ContainerSymbols.AuthUser).to(AuthUser);

container.bind<UserService>(ContainerSymbols.UserService).to(UserService);

container
    .bind<UserController>(ContainerSymbols.UserController)
    .to(UserController);

export default container;
