import { VehicleDto } from "../api";
import {
  fetchVehicles as apiFetchVehicles,
  deleteVehicle as apiDeleteVehicle,
} from "../apiClient/apiClient";

export const getVehicles = async (): Promise<VehicleDto[]> => {
  const vehicles = await apiFetchVehicles();
  return vehicles;
};

export const removeVehicle = async (id: number): Promise<void> => {
  await apiDeleteVehicle(id);
};
