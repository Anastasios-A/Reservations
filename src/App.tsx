import { BrowserRouter, Routes, Route } from "react-router-dom";
import SidePanel from "./components/SidePanel/sidePanel";
import ReservationsContextProvider from "./store/reservation-context";

import HomePage from "./pages/Home/Home";
import { initializeIcons } from "@fluentui/react";
import LoginPage from "./pages/LogInPage/LogInPage";
import AuthProvider from "./store/AuthProvider";

export default function App() {
  initializeIcons();

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ReservationsContextProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<SidePanel />}>
                <Route path="/home" element={<HomePage />} />
              </Route>
            </Routes>
          </ReservationsContextProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

// npx create-react-app my-app --template typescript
// npm install sass
// npm install bootstrap@3
// npm i -D react-router-dom@latest
