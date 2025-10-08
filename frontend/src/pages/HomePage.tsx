import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <Link to="/my_table">MyTables</Link>
    </div>
  );
};
export default HomePage;
