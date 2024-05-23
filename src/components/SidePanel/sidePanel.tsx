import styles from "./sidePanel.module.scss";

export default function SidePanel() {
  return (
    <div className={styles.sidePanel}>
      <div>
        <button>Log out</button>
      </div>
    </div>
  );
}
