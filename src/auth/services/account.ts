
import config from '../../lib/config';
import { createUser } from '../../lib/db/users';
import { INewUser, IUserId } from '../../lib/interface';


const AccountService = ({ logger }: { logger: any }) => {

  const createAccount = async (user: INewUser): Promise<number> => {
    try {
      const result: IUserId = await createUser(user);
      return result?.uid;
    } catch (e) {
      logger.error(e);
      throw new Error(e);
    }
  }

  return {
    createAccount,
  }
};

export default AccountService;
