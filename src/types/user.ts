export interface UserAuthDataType {
  username: string;
  password: string;
}

export interface UserRegisterDataType extends UserAuthDataType {
  email: string;
}

export interface UserInfoType {
  token: string;
  expiration: string;
  userid: string;
  username: string;
}

export interface UserAuthFormData {
  username: string;
  password: string;
  remember: boolean;
}
