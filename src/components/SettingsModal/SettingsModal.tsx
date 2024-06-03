import { Modal } from "@fluentui/react";
import styles from "./SettingsModal.module.scss";

import TimeSlots from "../../pages/TimeSlots/TimeSlotsl";

interface ISettingsModalProps {
  onDismiss: () => void;
}

export default function SettingsModal(props: ISettingsModalProps) {
  return (
    <Modal
      isOpen={true}
      containerClassName={styles.container}
      onDismiss={props?.onDismiss}
    >
      <h1>Settings</h1>
      <TimeSlots />
      <h3>Decline email template:</h3>
    </Modal>
  );
}
