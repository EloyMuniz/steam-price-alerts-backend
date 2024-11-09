//Interfaces relacionadas ao fluxo de usuário

export interface IUser {
    use_uuid: string;
    use_name?: string | null
    use_email?: string | null
}

export interface IUserRepository {
    findById(use_uuid: string): Promise<IUser | null | undefined>
}