import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <Link to="/vehicles">MyTables</Link>
    </div>
  );
};
export default HomePage;
