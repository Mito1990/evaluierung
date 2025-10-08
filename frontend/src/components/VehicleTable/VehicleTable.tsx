import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { VehicleDto } from "../../api";

import "./VehicleTable.scss";

interface VehicleTableProps {
  vehicles: VehicleDto[];
  onDelete: (id: number) => void;
}

interface ColumnMeta {
  field: string;
  header: string;
}

export const VehicleTable: React.FC<VehicleTableProps> = ({
  vehicles,
  onDelete,
}) => {
  const columns: ColumnMeta[] = [
    { field: "vehicleType", header: "Vehicle Type" },
    { field: "created", header: "Created" },
    { field: "mileage", header: "Mileage" },
    { field: "owner", header: "Owner" },
    { field: "kwAndPs", header: "KwAndPs" },
    { field: "taxation", header: "Taxation" },
  ];

  const actionBodyTemplate = (vehicle: VehicleDto) => (
    <Button
      label="Löschen"
      className="p-button-danger"
      onClick={() => onDelete(vehicle.id)}
    />
  );

  return (
    <div className="card">
      <DataTable
        value={vehicles ?? []}
        className="vehicle-table-header"
        tableStyle={{ minWidth: "50rem" }}
        emptyMessage="Keine Fahrzeuge vorhanden"
      >
        {columns.map((col) => (
          <Column key={col.field} field={col.field} header={col.header} />
        ))}
        <Column header="Aktionen" body={actionBodyTemplate} />
      </DataTable>
    </div>
  );
};

export default VehicleTable;
