export type UserProfileActions = 
    | {
        type: "updateUserName";
        payload: string
    }
    | {
        type: 'updateFirstName';
        payload: string
    }
    | {
        type: 'updateLastName';
        payload: string
    }
    | {
        type: 'updatePhone';
        payload: string
    }
    | {
        type: 'updateGender';
        payload: string
    }
    | {
        type: 'resetProfile';
        payload: any
    }