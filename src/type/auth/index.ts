
export interface TLogin {
    email: string;
    password: string
}


export interface TUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
    // role: UserRole;
    // status: 'in-progress' | 'blocked';
    // isDeleted: boolean;
    address?: string;
    image?: string;
    number?: string;
    // passwordChangedAt?: Date;
}