import { Dispatch } from 'react';
import { UserType } from './Auth.types';

export type dataType = {
    email: string,
    password: string
}

export type userType = {
    email: string,
    firstName: string,
    gender: string,
    lastName: string,
    uid: string,
    userName: string
}

export type AuthType = {
    user: userType,
    setuser: Dispatch<UserType>,
    signIn: (data: dataType) => Promise<void>,
    signUp: (data: dataType) => Promise<void>,
    signOut: () => Promise<void>,
    isLoading: boolean;
}