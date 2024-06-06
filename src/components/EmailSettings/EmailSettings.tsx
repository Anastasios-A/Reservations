import styles from "./EmailSettings.module.scss";

export default function EmailSettings() {
  return (
    <form className={styles.form}>
      <header className={styles.header}>
        <h3>Ρυθμίσεις Email</h3></header>

      <main>
        <div className={styles.emailReciver}>
          <label className={styles.smallLabel} htmlFor="email">
            Email καταστήματος (εδω θα λαμβάνεται τις κρατήσεις)
          </label>
          <input className={styles.input} type="text" id="email" />
        </div>

        <div className={styles.subject}>
          <label htmlFor="subject" className={styles.label}>
            Θέμα email
          </label>
          <input className={styles.input} type="text" id="subject" />
        </div>

        <div className={styles.message}>
          <label htmlFor="message" className={styles.label}>
            Περιεχόμενο email
          </label>
          <textarea className={styles.bigInput}  id="message" />
        </div>
      </main>
    </form>
  );
}
