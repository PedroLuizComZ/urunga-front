
import { ISigninDTO } from "../interfaces/ISigninDTO";
import { IUser } from "../interfaces/IUser";
import { publicApi } from "./api";

export const createUserService = async (createUser: IUser) => {
  return publicApi
    .post("/user/client", createUser)
    .then(({ data }: any) => data)
    .catch((err: any) => {
      return err.response.data;
    });
};

export const signinService = async (user: ISigninDTO) => {
  return publicApi
    .post("/user/login", user)
    .then(({ data }: any) => data)
    .catch((err: any) => {
      return err.response.data;
    });
};

export const getUserProfileService = async (userId : string) => {
  return publicApi
    .get(`/user/${userId}`, )
    .then(({ data }: any) => data)
    .catch((err: any) => {
      return err.response.data;
    });
};


export const deleteAccountService = async (userId: string) => {
  return publicApi
    .delete(`/user/${userId}`)
    .then(({ data }: any) => data)
    .catch((err: any) => {
      return err.response.data;
    });
};
