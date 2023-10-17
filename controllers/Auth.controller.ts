import { ISigninDTO } from "../interfaces/ISigninDTO";
import { IUser } from "../interfaces/IUser";
import {
  createUserService,
  deleteAccountService,
  getUserProfileService,
  signinService,
} from "../services/Auth.service";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export const createUserController = async (createUser: IUser) => {
  const response = await createUserService(createUser);
  if (response.sessionToken) {
    Cookies.set("token", response.sessionToken);
    Cookies.set("userType", "app");
    toast.success("Usuario Criado");
    return {
      status: "success",
    };
  } else {
    toast.error(JSON.stringify(response.message));
    return {
      status: "error",
    };
  }
};

export const signinController = async (signinDTO: ISigninDTO) => {
  const response = await signinService(signinDTO);
  if (response.status === "error") {
    toast.error("Email e/ou senha Inválidos");
    return {
      status: "error",
    };
  } else {
    Cookies.set("token", response.sessionToken);
    Cookies.set("userType", "app");
    return {
      status: "success",
      sessionToken: response.sessionToken,
    };
  }
};

export const getUserProfileController = async (userId: string) => {
  return await getUserProfileService(userId);
};

export const deleteAccountController = async (userId: string) => {
  return await deleteAccountService(userId);
};
