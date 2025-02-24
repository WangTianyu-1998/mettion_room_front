import { UpdatePassword } from '.';
import { instance } from '../../utils/interfaces';

export async function updatePasswordCaptcha(email: string) {
  return await instance.get('/user/update_password/captcha', {
    params: {
      address: email,
    },
  });
}

export async function updatePassword(data: UpdatePassword) {
  return await instance.post('/user/update_password', data);
}
