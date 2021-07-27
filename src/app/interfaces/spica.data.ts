// https://stackblitz.com/edit/typescript-z24svs?file=index.ts

/**
 * Project
 */
export interface Coordinate {
  authentication_code?: AuthenticationCode;
  configurations?: Configurations;
  connection?: Connection;
  favorites?: Favorites;
  mail_templates?: MailTemplates;
  password_recovery_auth_code?: PasswordRecoveryAuthCode;
  social_media?: SocialMedia;
  user?: User;
  verified_user?: VerifiedUser;
}

export interface AuthenticationCode {
  _id?: string;
  /**
   * Description of the code input
   */
  code?: string;
  /**
   * Description of the date input
   */
  date?: string;
  /**
   * Email of the user
   */
  email?: string;
  /**
   * Full name of the user
   */
  fullname?: string;
  /**
   * The password of the user
   */
  password?: string;
  /**
   * Trace id of the auth code attempt
   */
  trace_id?: string;
}

export interface Configurations {
  _id?: string;
  /**
   * Description of the key input
   */
  key?: string;
  /**
   * Description of the value_array input
   */
  value_array?: string;
}

export interface Connection {
  _id?: string;
  /**
   * Link of this connection
   */
  link?: string;
  /**
   * Description of the social_media input
   */
  social_media?: SocialMedia | string;
  /**
   * Status of this connection
   */
  status?: boolean;
  /**
   * Description of the user input
   */
  user?: User | string;
}

/**
 * Description of the social_media input
 */
export interface SocialMedia {
  _id?: string;
  /**
   * Background color of the icon
   */
  icon_background_color?: any;
  /**
   * Color of the icon
   */
  icon_color?: any;
  /**
   * URL of the icon
   */
  icon_url?: string;
  /**
   * Name of the social media
   */
  name?: string;
}

/**
 * Description of the user input
 *
 * favorite user of the main user
 *
 * Main user
 *
 * Candidate user
 */
export interface User {
  _id?: string;
  /**
   * Background photo of the user
   */
  background_photo?: string;
  /**
   * City of the user
   */
  city?: string;
  /**
   * Country of the user
   */
  country?: string;
  /**
   * Fullname of the user
   */
  fullname?: string;
  /**
   * identity id of the user
   */
  identity_id?: string;
  /**
   * Job of the user
   */
  job?: string;
  /**
   * Profile photo of the user
   */
  profile_photo?: string;
  /**
   * Username of the user
   */
  username?: string;
  /**
   * Username of the user
   */
  activated?: boolean;
}

export interface Favorites {
  _id?: string;
  /**
   * Create time
   */
  date?: string;
  /**
   * favorite user of the main user
   */
  favorite_user?: User | string;
  /**
   * Description of the key input
   */
  key?: string;
  /**
   * Main user
   */
  user?: User | string;
}

export interface MailTemplates {
  _id?: string;
  /**
   * Name of the mail
   */
  name?: string;
  /**
   * Template of the mail
   */
  template?: string;
}

export interface PasswordRecoveryAuthCode {
  _id?: string;
  /**
   * Code
   */
  code?: string;
  /**
   * Description of the date input
   */
  date?: string;
  /**
   * Email of the user
   */
  email?: string;
  /**
   * Trace id of the password recovery attempt
   */
  trace_id?: string;
}

export interface VerifiedUser {
  _id?: string;
  /**
   * Updated date of the entry
   */
  date?: string;
  /**
   * Candidate user
   */
  user?: User | string;
  /**
   * Verified state of the user
   */
  verified?: boolean;
}
