import { Link } from "react-router-dom";
import "../styles/Header.css";

export default function Header() {
  return (
    <>
      <div className="header-class">
        <h1>NC NEWS</h1>
        <p>Topic</p>
        <Link to="/login">
          <p>Login</p>
        </Link>
      </div>
    </>
  );
}
