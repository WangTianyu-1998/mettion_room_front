import { instance } from '../../utils/interfaces';

export async function registerCaptcha(email: string) {
  return await instance.get('/user/register-captcha', {
    params: {
      address: email,
    },
  });
}

export async function register(registerUser: any) {
  return await instance.post('/user/register', registerUser);
}
