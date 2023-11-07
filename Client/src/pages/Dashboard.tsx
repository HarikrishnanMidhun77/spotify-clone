import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import SpotifyWebApi from "spotify-web-api-node";
import useAuthorization from "../hooks/useAuthorization";
import { AlbumTracksResponse, PlaylistCoverImageResponse } from "spotify-api";
import { SearchResultsType } from "../types/types";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import TrackCard from "../components/TrackCard";

type DashboardProps = {
  code: string | null;
};

const spotifyApi = new SpotifyWebApi({
  clientId: "095502f438374a018337eb296c025aa9",
});

export default function Dashboard({ code }: DashboardProps) {
  const accessToken: string | undefined = useAuthorization({ code });
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResultsType[]>();
  //console.log("searchResults", searchResults);
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!searchString) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    /* 
    'cancel' is a flag to cancel the previous search action when the search string is updated.  
    This eliminates requesting the api each time a key is pressed and only gives results for 
    the search string once there after the last key stroke 
    */
    spotifyApi.searchTracks(searchString).then((res: AlbumTracksResponse) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track: AlbumTracksResponse) => {
          const smallestAlbumImage = track.album.images.reduce(
            (
              smallest: PlaylistCoverImageResponse,
              image: PlaylistCoverImageResponse
            ) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            trackType: track.type,
            albumUrl: track.album.external_urls
              ? track.album.external_urls.spotify
              : track.external_urls.spotify,
            albumName: track.album.name,
            artistArr: track.artists,
            durationMs: track.duration_ms,
            title: track.name,
            previewUrl: track.preview_url,
            trackUrl: track.external_urls.spotify,
            uri: track.uri,
            albumImg: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [searchString, accessToken]);

  const searchHandler: React.ChangeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchString(e.currentTarget.value);
  };

  return (
    <>
      <Container maxWidth="xl">
        <TextField
          id="outlined-search"
          sx={{
            alignSelf: "center",
            margin: "20px",
            minWidth: "40%",
            paddingBottom: "50px",
          }}
          type="search"
          label="Search Song/Artist"
          onChange={searchHandler}
        />
      </Container>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {searchResults ? (
          searchResults.map((track) => <TrackCard track={track} />)
        ) : (
          <></>
        )}
      </Grid>
    </>
  );
}
