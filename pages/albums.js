import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { useSession } from "next-auth/react";
import Player from "../components/Player";
import { playingTrackState } from "../atoms/playerAtom";
import { useRecoilState } from "recoil";
import BodyPopular from "../components/BodyPopular";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
});

function Popular() {
  const { data: session } = useSession();
  // const { accessToken } = session;
  const accessToken = session?.accessToken;
  console.log("accessToken", accessToken);
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    setShowPlayer(true);
  }, []);

  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };

  return (
    <main className="flex justify-center min-h-screen min-w-max bg-black lg:pb-24">
      <Sidebar />
      <BodyPopular chooseTrack={chooseTrack} spotifyApi={spotifyApi} />
      {showPlayer && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <Player accessToken={accessToken} trackUri={playingTrack.uri} />
        </div>
      )}
    </main>
  );
}

export default Popular;