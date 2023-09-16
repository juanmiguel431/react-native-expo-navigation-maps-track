export type User = {
  email: string;
  password: string;
};

export type SignInResponse = {
  token: string;
}

export type SignUpResponse = {
  token: string;
}
