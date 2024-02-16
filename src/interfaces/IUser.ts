export default interface IUser extends Document {
    username: string;
    password: string;
    tokens: { token: string }[];
}