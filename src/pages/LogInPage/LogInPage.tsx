import styles from "./LogInPage.module.scss";
import { useState } from "react";
import { useAuth } from "../../store/AuthProvider";
import ourLogo from "../../store/athensLogo.png";

import { useNavigate } from "react-router-dom";
import { DefaultButton } from "@fluentui/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const authContext = useAuth();
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div>
        <img className={styles.ourLogo} src={ourLogo} alt="ourLogo" />
        <div className={styles.formWrapper}>
          <div className={styles.header}> Login</div>
          <div className={styles.titleWithField}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.titleWithField}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p>{error}</p>}
          <div className={styles.buttonContainer}>
            <DefaultButton
              styles={{ root: styles.buttonRoot }}
              text="Log in"
              onClick={() => {
                authContext?.login(email, password);
                navigate("/", { replace: true });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
