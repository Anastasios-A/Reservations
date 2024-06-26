import styles from "./LogInPage.module.scss";
import { useState } from "react";
import { useAuth } from "../../store/AuthProvider";
import ourLogo from "../../Assets/athensLogo.png";

import { useNavigate } from "react-router-dom";
import {
  DefaultButton,
  Spinner,
  SpinnerSize,
  TextField,
} from "@fluentui/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useAuth();
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div>
        <img className={styles.ourLogo} src={ourLogo} alt="ourLogo" />
        <div className={styles.formWrapper}>
          <div className={styles.header}> Login</div>
          <div className={styles.titleWithField}>
            <TextField
              value={email}
              onChange={(e, newValue) => setEmail(newValue || "")}
              label="Email:"
              styles={{
                fieldGroup: styles.input,
              }}
            />
          </div>
          <div className={styles.titleWithField}>
            <TextField
              value={password}
              onChange={(e, newValue) => setPassword(newValue || "")}
              label="Password:"
              styles={{
                fieldGroup: styles.input,
              }}
            />
          </div>
          <div className={styles.buttonContainer}>
            {authContext?.isLoading ? (
              <Spinner
                size={SpinnerSize.large}
                styles={{ circle: styles.circle }}
              />
            ) : (
              <DefaultButton
                styles={{ root: styles.buttonRoot }}
                text="Log in"
                onClick={async () => {
                  const logedInEmail: string | undefined =
                    await authContext?.login(email, password);
                  if (logedInEmail) navigate("/home", { replace: true });
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
