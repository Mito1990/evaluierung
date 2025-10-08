import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { VehicleDto } from "../../api";

import "./VehicleTable.scss";
import { Card } from "primereact/card";

interface VehicleTableProps {
  vehicles: VehicleDto[];
  onDelete: (id: number) => void;
}

interface ColumnMeta {
  field: string;
  header: string;
}

export const VehicleTable = ({ vehicles, onDelete }: VehicleTableProps) => {
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
      label="Delete"
      className="p-button-danger"
      onClick={() => onDelete(vehicle.id)}
    />
  );

  return (
    <div className="card">
      <Card className="vehicle-card" title="Vehicles">
        <DataTable
          value={vehicles ?? []}
          className="vehicle-table-header"
          tableStyle={{ minWidth: "50rem" }}
          scrollable
          scrollHeight="55vh"
        >
          {columns.map((col) => (
            <Column key={col.field} field={col.field} header={col.header} />
          ))}
          <Column header="Actions" body={actionBodyTemplate} />
        </DataTable>
      </Card>
    </div>
  );
};

export default VehicleTable;
