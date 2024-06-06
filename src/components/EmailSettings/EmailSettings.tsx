import { TextField } from "@fluentui/react";
import styles from "./EmailSettings.module.scss";

export default function EmailSettings() {
  return (
    <form className={styles.form}>
      <header className={styles.header}>
        <div className={styles.title}>Ρυθμίσεις Email</div>
      </header>

      <div>
        <div className={styles.emailReciver}>
          <TextField
            label="Email καταστήματος (εδω θα λαμβάνεται τις κρατήσεις)"
            styles={{
              fieldGroup: styles.input,
            }}
          />
        </div>

        <div className={styles.subject}>
          <TextField
            label="Θέμα email"
            styles={{
              fieldGroup: styles.input,
            }}
          />
        </div>

        <TextField
          label="Περιεχόμενο email"
          multiline
          //     autoAdjustHeight
          rows={3}
          styles={{
            fieldGroup: styles.bigInput,
            field: { height: "100%" },
          }}
        />
      </div>
    </form>
  );
}
