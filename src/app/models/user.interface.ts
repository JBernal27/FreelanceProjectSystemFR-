export interface IUser {
    id:    number;
    name:  string;
    email: string;
}

export interface ILoginResponse {
    message: string;
    token:   string;
    user:    IUser;
}