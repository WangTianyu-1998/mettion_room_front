import { UserInfo } from '.';
import { instance } from '../../utils/interfaces';

export async function getUserInfoApi() {
  return await instance.get('/user/info');
}

export async function updateInfo(data: UserInfo) {
  return await instance.post('/user/update', data);
}

export async function updateUserInfoCaptcha() {
  return await instance.get('/user/update/captcha');
}
