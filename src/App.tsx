import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import SidePanel from "./components/SidePanel/sidePanel";
import ReservationsContextProvider from "./store/reservation-context";

import TimeSlots from "./pages/TimeSlots/TimeSlotsl";
import Home from "./pages/Home/Home";

export default function App() {
  return (
    <>
      <ReservationsContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SidePanel />}>
              <Route index element={<Home />} />
              <Route path="timeSlots" element={<TimeSlots />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ReservationsContextProvider>
    </>
  );
}

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}

// npx create-react-app my-app --template typescript
// npm install sass
// npm install bootstrap@3
// npm i -D react-router-dom@latest