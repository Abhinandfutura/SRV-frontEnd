import "./App.css";
import styled from "styled-components";

import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Header from "./Components/Header";
import { lazy, Suspense } from "react";
import { CircularProgress } from "@mui/material";

import { useSelector } from "react-redux";

function App() {
  const Signup = lazy(() => import("../src/Pages/SignUp"));
  const Navigation = lazy(() => import("../src/Pages/Navigation"));
  const Signin = lazy(() => import("../src/Pages/SignIn"));
  const data = useSelector((state) => state.user);
  return (
    <Container>
      <Suspense
        fallback={
          <Box>
            <CircularProgress />
          </Box>
        }
      >
        <Router>
          <Header />
          <Switch>
            {data.isAuth && data.access ? (
              <Route path="/*" element={<Navigation />} />
            ) : (
              <>
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/" element={<Signin />} />
              </>
            )}
          </Switch>
        </Router>
      </Suspense>
    </Container>
  );
}

export default App;

const Container = styled.div``;
const Box = styled.div`
  width: 96%;
  height: 100vh;
  display: grid;

  place-items: center;
`;
