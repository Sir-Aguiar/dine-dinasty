import { jwtDecode } from "jwt-decode";

const DecodeJWT = <TokenType>(token: string): TokenType => {
  return jwtDecode(token);
};

export default DecodeJWT;
