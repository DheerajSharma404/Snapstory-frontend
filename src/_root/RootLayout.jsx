import { Outlet } from "react-router-dom";
import { Navbar } from "../components/index.js";

import styles from "./RootLayout.module.css";

const RootLayout = () => {
  return (
    <main className={styles.main}>
      <Navbar />

      <section>
        <Outlet />
      </section>
    </main>
  );
};

export default RootLayout;
