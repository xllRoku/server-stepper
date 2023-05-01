const Repositories = {
    UserRepository: Symbol.for('UserUserRepository'),
};

const Systems = {
    AuthUser: Symbol.for('AuthUser'),
};

const Services = {
    UserService: Symbol.for('UserService'),
};

const Controllers = {
    UserController: Symbol.for('UserController'),
};

const ContainerSymbols = {
    ...Repositories,
    ...Services,
    ...Controllers,
    ...Systems,
};

export { ContainerSymbols };
