import { TextField } from "@fluentui/react";
import styles from "./EmailSettings.module.scss";
import { IStoreDetails } from "../../store/reservation-context";
import { useCallback } from "react";

interface IEmailSettingsProps {
  setShopDetails: React.Dispatch<React.SetStateAction<IStoreDetails>>;
  shopDetails: IStoreDetails;
}

export default function EmailSettings(props: IEmailSettingsProps) {
  const onChangeEmail = useCallback(
    (event: any, newValue?: string) => {
      props?.setShopDetails({ ...props.shopDetails, email: newValue || "" });
    },
    [props]
  );

  const onChangeSubject = useCallback(
    (event: any, newValue?: string) => {
      props?.setShopDetails({
        ...props.shopDetails,
        emailSubjectTemplate: newValue || "",
      });
    },
    [props]
  );
  const onChangeEmailText = useCallback(
    (event: any, newValue?: string) => {
      props?.setShopDetails({
        ...props.shopDetails,
        emailTextTemplate: newValue || "",
      });
    },
    [props]
  );
  return (
    <form className={styles.form}>
      <header className={styles.header}>
        <div className={styles.title}>Ρυθμίσεις Email</div>
      </header>

      <div>
        <div className={styles.emailReciver}>
          <TextField
            value={props.shopDetails.email}
            onChange={onChangeEmail}
            label="Email καταστήματος (εδω θα λαμβάνεται τις κρατήσεις)"
            styles={{
              fieldGroup: styles.input,
            }}
          />
        </div>

        <div className={styles.subject}>
          <TextField
            value={props.shopDetails.emailSubjectTemplate}
            onChange={onChangeSubject}
            label="Θέμα email"
            styles={{
              fieldGroup: styles.input,
            }}
          />
        </div>

        <TextField
          value={props.shopDetails.emailTextTemplate}
          onChange={onChangeEmailText}
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
