import { useState } from "react";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider } from "@mui/material/styles";
import { spotifyTheme } from "./styles/theme";

const code: string | null = new URLSearchParams(window.location.search).get(
  "code"
);

function App() {
  return (
    <>
      <ThemeProvider theme={spotifyTheme}>
        {code ? <Dashboard code={code} /> : <Login />}
      </ThemeProvider>
    </>
  );
}

export default App;
