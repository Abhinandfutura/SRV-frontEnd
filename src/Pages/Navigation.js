import { CircularProgress } from "@mui/material";
import React, { lazy, Suspense } from "react";
import { Routes as Switch, Route } from "react-router-dom";

function Navigation() {
  const Home = lazy(() => import("../Pages/Home"));
  const UpdateProfile = lazy(() => import("../Pages/UpdateProfile"));

  return (
    <div>
      <Suspense fallback={<CircularProgress />}>
        <Switch>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default Navigation;
