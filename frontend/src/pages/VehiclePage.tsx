import { Message } from "primereact/message";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import VehicleTable from "../components/VehicleTable/VehicleTable";
import useSWR from "swr";
import { VehicleDto } from "../api";
import { fetchVehicles, deleteVehicle } from "../apiClient/apiClient";

const fetcher = async (): Promise<VehicleDto[]> => {
  const res = await fetchVehicles();
  return res || [];
};

const Loading = () => <Message severity="info" text="Loading vehicles..." />;

export const VehiclePage = () => {
  const toast = useRef<Toast>(null);

  const {
    data: vehicles,
    isLoading,
    mutate,
  } = useSWR<VehicleDto[]>("vehicles", fetcher);

  const handleDelete = async (id: number) => {
    try {
      mutate(
        (currentVehicles) => currentVehicles?.filter((v) => v.id !== id) ?? [],
        false
      );

      await deleteVehicle(id);

      mutate();

      toast.current?.show({
        severity: "success",
        summary: "Deleted",
        detail: `Vehicle ${id} deleted`,
      });
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: `Could not delete vehicle: ${error}`,
      });
    }
  };

  if (isLoading) return <Loading />;
  return (
    <div style={{ padding: "2rem", maxWidth: "70%" }}>
      <Toast ref={toast} />
      <VehicleTable vehicles={vehicles ?? []} onDelete={handleDelete} />
    </div>
  );
};
