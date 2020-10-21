export type NewUser = {
    // Database should return Id, not required for user creation
    name: string;
    email: string;
    meta: Meta;
}

export type Meta = {
    isVerified?: boolean;
    isExpired?: boolean;
    addedOn: string;
}