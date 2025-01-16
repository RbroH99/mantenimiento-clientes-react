export interface UserAuthDataType {
  username: string;
  password: string;
}

export interface UserRegisterDataType extends UserAuthDataType {
  username: string;
}

export interface UserInfoType {
  token: string;
  expiration: string;
  userId: string;
  username: string;
}
