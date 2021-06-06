import db from '.';
import { INewUser, IUserId } from '../interface';


export const getUser = async ({ username, password }: { username: string, password: string }) => {
  const result: any = await db
    .select<any, IUserId[]>('uid')
    .from('users')
    .where('username', username)
    .andWhere('password', password);
  return result?.[0];
};

export const createUser = async (user: INewUser): Promise<IUserId> => {
  const uid = await db('users')
    .returning('uid')
    .insert(user)

  return { uid: uid?.[0] };
};