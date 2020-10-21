export type User = {
  id: number;
  name: string;
  email: string;
  meta: Meta;
};

export type Meta = {
  isVerified?: boolean;
  isExpired?: boolean;
  addedOn: string;
};
