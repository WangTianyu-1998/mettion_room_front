import { request } from '../../utils/interfaces';

export const loginApi = (username: string, password: string) =>
  request<any>('/user/login', 'POST', {
    username,
    password,
  });
