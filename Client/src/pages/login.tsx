import React from "react";
import { Container, Button } from "@mui/material";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=095502f438374a018337eb296c025aa9&response_type=code&redirect_uri=http://localhost:5173/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function Login() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Button color="primary" variant="contained" href={AUTH_URL}>
        Login With Spotify
      </Button>
    </Container>
  );
}
