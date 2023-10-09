import { ICheckin } from "../interfaces/ICheckin";
import { createCheckinService, getCheckinByIdService } from "../services/Checkin.service";

export const createCheckinController = async (checkinData: ICheckin) => {
  return await createCheckinService(checkinData);
};

export const getCheckinByIdController = async (userId: string, storeId: string) => {
  return await getCheckinByIdService(userId, storeId);
};
