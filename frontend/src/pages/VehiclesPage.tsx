import useSWR from "swr";
import { VehicleDto } from "../api";
import { api } from "../apiClient";
import VehicleTable from "../components/VehicelTable";

const fetcher = async () => {
  try {
    const res = await api.getVehicles();
    const fetchedVehicles = (res.data as any)._embedded?.vehicles || [];
    return fetchedVehicles;
  } catch (err: any) {
    console.error("Fehler beim Laden der Fahrzeuge:", err);
    throw err;
  }
};

export const VehiclesPage = () => {
  const {
    data: vehicles,
    error,
    isLoading,
    mutate,
  } = useSWR<VehicleDto[]>("vehicles", fetcher);

  if (isLoading) return <p>Lädt...</p>;
  if (error)
    return <p style={{ color: "red" }}>Fehler beim Laden der Fahrzeuge</p>;
  if (!vehicles || vehicles.length === 0)
    return <p>Keine Fahrzeuge gefunden</p>;

  return (
    <div style={{ padding: "2rem", maxWidth: "50%" }}>
      <VehicleTable vehicles={vehicles} />
      <button onClick={() => mutate()}>Neu laden</button>
    </div>
  );
};
export default VehiclesPage;
