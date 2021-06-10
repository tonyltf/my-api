import bcrypt from 'bcrypt';

import config from '../../lib/config';
import { HTTP_STATUS } from '../../lib/constant';
import { createUser, getUser, getUserPassword } from '../../lib/db/users';
import { HttpError } from '../../lib/error';
import { INewUser, IUser, IUserId } from '../../lib/interface';

const saltRounds = 10;

const AccountService = ({ logger }: { logger: any }) => {

  const createAccount = async (user: INewUser): Promise<number> => {
    try {
      return new Promise((resolve, reject) => {

        bcrypt.hash(user.password, saltRounds, async function(err, hash) {
          if (err) {
            logger.error(e);
            throw new Error(e);
          }
          const result: IUserId = await createUser({ ...user, password: hash });
          resolve(result?.uid);
        });

        // return result?.uid;
      });
    } catch(e) {
      logger.error(e);
      throw new Error(e);
    }
  };

  const validateUser = async ({ username, password }: { username: string, password: string }): Promise<IUser> => {
      const hash: string = await getUserPassword(username);
      if (!hash) {
        throw new HttpError(HTTP_STATUS.UNAUTHORIZED, 'invalid username or password');
      }
      const match = await bcrypt.compare(password, hash);
      if(match) {
          //login
          return getUser({ username });
      } else {
        throw new HttpError(HTTP_STATUS.UNAUTHORIZED, 'invalid username or password');
      }
  }

  return {
    createAccount,
    validateUser,
  }
};

export default AccountService;
