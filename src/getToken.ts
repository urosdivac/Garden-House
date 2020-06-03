import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

const getToken = () => {
  const cookie = Cookies.get('JWT');
  let result: any;
  if (cookie) {
    jwt.verify(cookie, 'secertToken', async (err, decoded) => {
      result = decoded;
    });
  }

  return result;
};

export default getToken;
