export default interface IUser {
    username: string;
    password: string;
    tokens: { token: string }[];
}