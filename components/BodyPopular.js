import { useSession } from "next-auth/react";
import Search from "./Search";
import { useState, useEffect } from "react";
import Poster from "../components/Poster";
import Track from "./Track";

function BodyPopular({ spotifyApi, chooseTrack }) {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [userPlaylist, setUserPlaylist] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  // Searching...
  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    spotifyApi.searchPlaylists(search).then((res) => {
      setSearchResults(
        res.body.playlists.items.map((track) => {
          return {
            id: track.id,
            // artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.images[0].url,
            popularity: track.popularity,
          };
        })
      );
    });
  }, [search, accessToken]);

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi
      .getMySavedAlbums({
        limit: 20,
        offset: 0,
      })
      .then((res) => {
        console.log('borrame',res.body)
        setUserPlaylist(
          res.body.items
            .map(track => track)
            .map((track) => {
              return {
                id: track.album.id,
                title: track.album.name,
                artist: track.album.artists[0].name,
                uri: track.album.uri,
                albumUrl: track.album.images[0].url,
              };
            })
        );
      });
  }, [accessToken]);

  return (
    <section className="bg-black ml-24 py-4 space-y-8 md:max-w-6xl flex-grow md:mr-2.5">
      <Search search={search} setSearch={setSearch} />
      <h2 className="text-white font-bold mb-3 ml-4">
        {searchResults.length === 0 ? "Saved Albums" : "Search Albums"}
      </h2>
      <div className="grid overflow-y-scroll scrollbar-hide h-full py-0 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 p-4">
        {searchResults.length === 0
          ? userPlaylist
              // .slice(0, 4)
              .map((track) => (
                <Poster
                  key={track.id}
                  track={track}
                  chooseTrack={chooseTrack}
                />
              ))
          : searchResults
              // .slice(0, 4)
              .map((track) => (
                <Poster
                  key={track.id}
                  track={track}
                  chooseTrack={chooseTrack}
                />
              ))}
      </div>

      {/* <div className="w-full pr-11">
          <h2 className="text-white font-bold mb-3">
            {searchResults.length === 0 ? "New Releases" : "Tracks"}
          </h2>
          <div className="space-y-3 border-2 border-[#262626] rounded-2xl p-3 bg-[#0D0D0D] overflow-y-scroll h-[1000px] md:h-96 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500 w-[768px]">
            {userPlaylist.slice(4, userPlaylist.length).map((track) => (
              <Track key={track.id} track={track} chooseTrack={chooseTrack} />
            ))}
          </div>
        </div> */}
    </section>
  );
}

export default BodyPopular;
