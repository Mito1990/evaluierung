import { Message } from "primereact/message";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import VehicleTable from "../components/VehicleTable/VehicleTable";
import useSWR from "swr";
import { getVehicles, removeVehicle } from "../service/vehicleService";
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

  const confirmDelete = (id: number) => {
    confirmDialog({
      message: "Are you sure you want to delete this vehicle?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => handleDelete(id),
    });
  };

  const handleDelete = async (id: number) => {
    try {
      mutate((current) => current?.filter((v) => v.id !== id) ?? [], false);

      await removeVehicle(id);

      mutate();

      toast.current?.show({
        severity: "success",
        summary: "Deleted",
        detail: `Vehicle ${id} deleted`,
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
