import { IUser } from "../entities/user.interface";

export interface ILoginResponse {
    message: string;
    token:   string;
    user:    IUser;
}
