import db from '.';
import { INewUser, IUserId } from '../interface';


export const getUser = async ({ username }: { username: string }) => {
  const result: any = await db
    .select<any, IUserId[]>('uid')
    .from('users')
    .where('username', username);
  return result?.[0];
};

export const getUserPassword = async (username: string): Promise<string> => {
  const result: any = await db
    .select<any, IUserId[]>('password')
    .from('users')
    .where('username', username);
  return result?.[0]?.password;
};

export const createUser = async (user: INewUser): Promise<IUserId> => {
  const uid = await db('users')
    .returning('uid')
    .insert(user)

  return { uid: uid?.[0] };
};