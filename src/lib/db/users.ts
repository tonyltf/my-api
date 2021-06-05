import db from '.';

interface UserId {
  uid: number;
}

export const getUser = async ({ username, password }: { username: string, password: string }) => {
  const result: any = await db
    .select<any, UserId[]>('uid')
    .from('users')
    .where('username', username)
    .andWhere('password', password);
  return result?.[0];
};

