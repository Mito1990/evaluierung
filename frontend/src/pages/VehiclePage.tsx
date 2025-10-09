import { Message } from "primereact/message";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import VehicleTable from "../components/VehicleTable/VehicleTable";
import useSWR from "swr";
import { getVehicles, removeVehicle } from "../service/vehicle-service";
import { VehicleDto } from "../api/models/VehicleDto";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const fetcher = () => getVehicles();

const Loading = () => <Message severity="info" text="Loading vehicles..." />;

export const VehiclePage = () => {
  const toast = useRef<Toast>(null);
  const {
    data: vehicles,
    isLoading,
    mutate,
  } = useSWR<VehicleDto[]>("vehicles", fetcher);

  const confirmDelete = (vehicle: VehicleDto) => {
    confirmDialog({
      message: "Are you sure you want to delete this vehicle?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => handleDelete(vehicle),
    });
  };

  const handleDelete = async (vehicle: VehicleDto) => {
    try {
      mutate((current) => current?.filter((v) => v.id !== vehicle.id) ?? [], false);

      await removeVehicle(vehicle.id);

      mutate();

      toast.current?.show({
        severity: "success",
        summary: "Deleted",
        detail: `Vehicle ${vehicle.vehicleType} deleted`,
        life: 5000,
      });
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: `Could not delete vehicle: ${error}`,
        life: 5000,
      });
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div style={{ padding: "2rem" }}>
      <Toast ref={toast} />
      <ConfirmDialog />
      <VehicleTable vehicles={vehicles ?? []} onDelete={confirmDelete} />
    </div>
  );
};

export default VehiclePage;
