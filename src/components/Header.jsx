import { Link } from "react-router-dom";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import styles from "../styles/Header.module.css";

export default function Header() {
  return (
    <>
      <div className={styles.logo}>
        <DiamondOutlinedIcon />
        <Link to="/">
          <h1 className={styles.heading}>NC NEWS</h1>
        </Link>
      </div>
    </>
  );
}
