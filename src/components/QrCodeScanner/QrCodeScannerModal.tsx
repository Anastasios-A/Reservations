import { useEffect, useRef, useState } from "react";
import styles from "./QrCodeScannerModal.module.scss";

// Styles
//import "./QrStyles.css";

// Qr Scanner
import QrScanner from "qr-scanner";
//import QrFrame from "../assets/qr-frame.svg";

interface IQrReaderProps {
  onScan: (value: string) => void;
  onClose: () => void;
}

export default function QrReader(props: IQrReaderProps) {
  // QR States
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);

  // Result

  // Success
  const onScanSuccess = (result: QrScanner.ScanResult) => {
    props?.onScan(result?.data);
    props?.onClose();
  };

  // Fail
  const onScanFail = (err: string | Error) => {
    // 🖨 Print the "err" to browser console.
    console.log(err, "Naiiiiiiiiiiiiiii");
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      // 👉 Instantiate the QR Scanner
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        // 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
        preferredCamera: "environment",
        // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
        highlightScanRegion: true,
        // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
        highlightCodeOutline: true,
        // 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
        overlay: qrBoxEl?.current || undefined,
      });

      // 🚀 Start QR Scanner
      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }
  }, [videoEl]);

  // ❌ If "camera" is not allowed in browser permissions, show an alert.
  useEffect(() => {
    console.log("----------", qrOn);
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
  }, [qrOn]);

  return (
    <div className={styles.wrapper}>
      {qrOn && <video /* className={styles.wrapper} */ ref={videoEl} />}
    </div>
  );
}
