export interface AuthResult {
  // message: string;
  // jwt_auth: JWT_AUTH;
  // user_id: string;
  // username: string
  [key: string]: any;
}
export interface JWT_AUTH {
  [key: string]: any;
  // jwt_token: string;
  // expire: number;
}

export interface RegisterSendInfoResult {
  [key: string]: any;
}

export interface RegisterValidateCodeResult {
  [key: string]: any;
}

export interface PasswordRecoverySendCodeResult {
  [key: string]: any;
}

export interface passwordRecoveryValidateCodeResult {
  [key: string]: any;
}
