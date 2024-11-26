import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";
import {Toaster } from 'react-hot-toast';
function App() {
  const { pathname } = useLocation();
  const [isRTL, setIsRTL] = useState(true);

  const toggleDirection = () => {
    setIsRTL(!isRTL);
  };

  return (
    <div dir={"rtl"} className={ ""}>
      {/* Toggle button for RTL */}
     

      {/* Conditionally render the Navbar */}
      {!(pathname === "/sign-in" || pathname === "/sign-up") && (
        <div className="absolute container mx-auto p-4 z-10">
          <Navbar routes={routes} />
        </div>
      )}

      {/* Define Routes */}
      <Routes>
        {routes.map(
          ({ path, element }, key) =>
            element && <Route key={key} exact path={path} element={element} />
        )}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>

      <Toaster />

    </div>
  );
}

export default App;
