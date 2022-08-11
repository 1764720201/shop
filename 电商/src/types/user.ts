export type Register = {
  phone: string;
  code: string;
  password: string;
  confirm: string;
  agree: boolean;
};
export type Verify = {
  phone: string;
  password: string;
  code: string;
  nickName?: string;
};
export type Login = {
  phone: string;
  password: string;
  token?: string;
};
export type UserInfo = {
  birthday: null;
  createTime: string;
  email: null;
  gender: string;
  headImg: string;
  id: number;
  loginName: string;
  name: string;
  nickName: string;
  operateTime: string;
  passwd: string;
  phoneNum: string;
  status: number;
  userLevel: string;
};
