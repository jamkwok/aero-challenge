export type UserEntity = {
  id?: number;
  name: string;
  email: string;
  meta: Meta;
};

export type Meta = {
  isVerified: boolean;
  isExpired?: boolean;
  addedOn: string;
};
