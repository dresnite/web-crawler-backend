if(!process.env.JWT_SECRET) {
    throw new Error("You didn't specify a valid JWT secret in the env JWT_SECRET");
}

if(!process.env.MONGODB_URI) {
    throw new Error("You didn't define a valid MongoDB URI in the env MONGODB_URI");
}

export const USERNAME_MAX_LENGTH: number = 32;
export const PASSWORD_MIN_LENGTH: number = 6;
export const JWT_SECRET: string = process.env.JWT_SECRET; 
export const MONGODB_URI: string = process.env.MONGODB_URI;
