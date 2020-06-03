import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

interface Token {
  email: string;
  firstname: string;
  lastname: string;
  isadmin: boolean;
  shortname: string;
}

const getToken = (): Token => {
  const cookie = Cookies.get('JWT');
  let result: Token;
  jwt.verify(cookie, 'secertToken', async (err, decoded: Token) => {
    result = decoded;
  });
  return result;
};

export default getToken;
