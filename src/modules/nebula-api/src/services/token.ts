export interface Token {
  /**
   * JWT token
   */
  token: string;

  /**
   * JSON data attached to the session
   */
  data: Object;

  /**
   * Unix timestamp when token expires
   */
  expires: number; // unix timestamp
}
