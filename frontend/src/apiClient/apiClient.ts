import { VehiclesApi, Configuration, VehicleDto } from "../api";

const config = new Configuration({ basePath: "/api/v1" });
export const api = new VehiclesApi(config);

export const fetchVehicles = async (): Promise<VehicleDto[]> => {
  const res = await api.getVehicles();
  return res.embedded.vehicleDtoList || [];
};

export const deleteVehicle = async (id: number) => {
  try {
    await api.deleteVehicle({ id });
    console.log(`Vehicle ${id} deleted`);
  } catch (error) {
    console.error("Error deleting vehicle:", error);
  }
};
