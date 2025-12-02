import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

const menuItems = [
  { id: "dashboard", label: "Dashboard", to: "/dashboard" },
  { id: "orders", label: "Orders", to: "/orders" },
  { id: "products", label: "Products", to: "/products" },
  { id: "customers", label: "Customers", to: "/customers" },
  { id: "suppliers", label: "Suppliers", to: "/suppliers" },
];

function Sidebar() {
  return (
    <nav className={styles.SidebarNav}>
 
      <div className={styles.TopButton}>
        <span className={styles.TopIcon}>⟳</span>
      </div>

      <ul className={styles.MenuList}>
        {menuItems.map((item) => (
          <li key={item.id} className={styles.MenuItem}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `${styles.MenuLink} ${isActive ? styles.MenuLinkActive : ""}`
              }
            >
              <span className={styles.IconCircle} />
              <span className={styles.SrOnly}>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
