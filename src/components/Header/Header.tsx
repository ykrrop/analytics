import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import Logo from "../../assets/icons/Logo.svg";
import Analytics from "../../assets/icons/Analytics.svg";
import Generator from "../../assets/icons/Generator.svg";
import History from "../../assets/icons/History.svg";

export const Header = () => (
  <header className={styles.header}>
    <div className={styles.brand}>
      <img
        src={Logo}
        alt="Логотип Межгалактической аналитики"
        className={styles.mainLogo}
      />
      <span className={styles.title}>МЕЖГАЛАКТИЧЕСКАЯ АНАЛИТИКА</span>
    </div>
    <nav className={styles.nav}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        <img src={Analytics} alt="CSV Аналитик" className={styles.icon} />{" "}
        <span className={styles.label}>CSV Аналитик</span>
      </NavLink>
      <NavLink
        to="/generator"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        <img src={Generator} alt="CSV Генератор" className={styles.icon} />
        <span className={styles.label}>CSV Генератор</span>
      </NavLink>
      <NavLink
        to="/history"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        <img src={History} alt="История" className={styles.icon} />
        <span className={styles.label}>История</span>
      </NavLink>
    </nav>
  </header>
);
