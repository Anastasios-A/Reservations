import {
  IIconProps,
  IconButton,
  Modal,
  Spinner,
  SpinnerSize,
} from "@fluentui/react";
import styles from "./SettingsModal.module.scss";

import TimeSlots from "../../pages/TimeSlots/TimeSlotsl";
import EmailSettings from "../EmailSettings/EmailSettings";
import {
  IStoreDetails,
  useReservationsContext,
} from "../../store/reservation-context";
import { useCallback, useState } from "react";
import { updateStoreDetails } from "../../Utils/firebaseFunctions";

interface ISettingsModalProps {
  onDismiss: () => void;
}
const CancelIcon: IIconProps = { iconName: "Cancel" };

export default function SettingsModal(props: ISettingsModalProps) {
  const reserVationsContext = useReservationsContext();

  const [storeDetails, setStoreDetails] = useState<IStoreDetails>(
    reserVationsContext.storeDetails
  );
  const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false);

  const onSave = useCallback(async () => {
    setIsSaveLoading(true);
    console.log(storeDetails);
    await updateStoreDetails(storeDetails);
    reserVationsContext.changeStoreDetails(storeDetails);
    setIsSaveLoading(false);
    props?.onDismiss();
  }, [props, reserVationsContext, storeDetails]);

  return (
    <Modal
      isOpen={true}
      containerClassName={styles.container}
      onDismiss={props?.onDismiss}
    >
      <div className={styles.settingsModal}>
        <header>
          <div className={styles.title}>Ρυθμίσεις</div>
          <IconButton iconProps={CancelIcon} onClick={props?.onDismiss} />
        </header>

        <main>
          <div className={styles.timeSlots}>
            <TimeSlots
              setShopDetails={setStoreDetails}
              shopDetails={storeDetails}
            />
          </div>
          <div className={styles.emailSettings}>
            <EmailSettings
              setShopDetails={setStoreDetails}
              shopDetails={storeDetails}
            />
          </div>
        </main>

        <footer className={styles.footerButtons}>
          <button className={`${styles.button} ${styles.cancel}`}>
            Ακύρωση
          </button>
          <button
            className={`${styles.button} ${styles.accept}`}
            onClick={onSave}
          >
            {isSaveLoading ? (
              <Spinner size={SpinnerSize.medium} />
            ) : (
              "Αποθήκευση"
            )}
          </button>
        </footer>
      </div>
    </Modal>
  );
}
