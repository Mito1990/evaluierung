import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { VehicleDto } from "../api";
import axios from "axios";
import { api } from "../apiClient";
interface VehicleTableProps {
  vehicles: VehicleDto[];
}

interface ColumnMeta {
  field: string;
  header: string;
}

export const VehicleTable: React.FC<VehicleTableProps> = ({
  vehicles,
}) => {
  const columns: ColumnMeta[] = [
    { field: "vehicleType", header: "Vehicle Type" },
    { field: "created", header: "Created" },
    { field: "mileage", header: "Mileage" },
    { field: "owner", header: "Owner" },
    { field: "kwAndPs", header: "KwAndPs" },
    { field: "taxation", header: "Taxation" },
  ];

  const deleteVehicle = async (vehicle: VehicleDto) => {
    try {
      api.deleteVehicle(vehicle.id);
      console.log(`Fahrzeug ${vehicle.id} gelöscht`);
    } catch (err) {
      console.error("Fehler beim Löschen:", err);
    }
  };

  const actionBodyTemplate = (vehicle: VehicleDto) => (
    <Button
      label="Löschen"
      className="p-button-danger"
      onClick={() => deleteVehicle(vehicle)}
    />
  );

  return (
    <div className="card">
      <DataTable value={vehicles} tableStyle={{ minWidth: "50rem" }}>
        {columns.map((col) => (
          <Column key={col.field} field={col.field} header={col.header} />
        ))}
        <Column header="Aktionen" body={actionBodyTemplate} />
      </DataTable>
    </div>
  );
};

export default VehicleTable;
