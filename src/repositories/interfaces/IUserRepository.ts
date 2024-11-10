//Interfaces relacionadas ao fluxo de usuário

export interface IUser {
    use_uuid: string;
    use_name?: string | null
    use_email?: string | null
}

export interface IUserRepository {
    findById(use_uuid: string): Promise<IUser | null | undefined>
    findbyEMail(use_email: string): Promise<IUser | null | undefined>
    createUser(use_email: string, use_password: string, use_name: string): Promise<boolean> | null | undefined
}