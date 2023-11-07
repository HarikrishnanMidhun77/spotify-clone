import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { SearchResultsType } from "../types/types";
import Grid from "@mui/material/Grid";
import { Link } from "@mui/material";
import { millisToMinutesAndSeconds } from "../utils/timeConversion";
import { SingleArtistResponse } from "spotify-api";

type SearchResultDisplayProps = {
  track: SearchResultsType;
};

export default function TrackCard({ track }: SearchResultDisplayProps) {
  return (
    <Grid item xs={12} sm={12} lg={6} xl={6}>
      <Card sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: 100, alignSelf: "stretch" }}
          image={track.albumImg}
          alt="Live from space album cover"
        ></CardMedia>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              <Link
                href={track.trackUrl}
                sx={{ cursor: "pointer" }}
                underline="none"
              >
                {track.title}
              </Link>
            </Typography>
            <Typography variant="subtitle1" component="div">
              <Link
                href={track.albumUrl}
                sx={{ cursor: "pointer" }}
                underline="none"
              >
                {track.albumName + " - "}
              </Link>

              {track.artistArr.map((artist: SingleArtistResponse) => (
                <Link
                  href={artist.external_urls.spotify}
                  sx={{ cursor: "pointer" }}
                  underline="none"
                  color="text.secondary"
                >
                  {artist.name + " | "}
                </Link>
              ))}
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              component="div"
            >
              {millisToMinutesAndSeconds(track.durationMs)}
            </Typography>
            <Typography
              variant="subtitle2"
              component="div"
              color="text.primary"
            >
              <Link
                href={track.previewUrl}
                sx={{ cursor: "pointer" }}
                underline="none"
              >
                Preview
              </Link>
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Grid>
  );
}
