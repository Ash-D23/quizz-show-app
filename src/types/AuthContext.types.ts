export type dataType = {
    email: string,
    password: string
}

export type AuthType = {
    user: any,
    setuser: any,
    signIn: (data: dataType) => Promise<void>,
    signUp: (data: dataType) => Promise<void>,
    signOut: () => Promise<void>,
    isLoading: boolean;
}