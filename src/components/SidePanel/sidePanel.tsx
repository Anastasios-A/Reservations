import styles from './sidePanel.module.scss';
import logo from '../../store/logo.png';
import ourLogo from "../../store/athensLogo.png"

export default function SidePanel() {
  return (
    <div className={styles.sidePanel}>
      <header>
        <img className={styles.logo} src={logo} alt="Logo" />
        <div className={styles.label}>
          Powered By
        <img className={styles.ourLogo} src={ourLogo} alt='ourLogo'/>
        </div>
      </header>

      <footer>
        <button className={styles.logout}>Log out</button>
      </footer>
    </div>
  );
}
