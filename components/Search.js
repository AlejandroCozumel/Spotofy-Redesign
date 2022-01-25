import Dropdown from "./Dropdown";
import ActiveLink from "./ActiveLink";

function Search({ search, setSearch }) {
  return (
    <div className="max-w-[1150px] bg-[#1a1a1a] rounded-full border-2 border-[#333333] p-1.5 px-5 pr-8 flex items-center">
      <div className="h-4 w-4 rounded-full border-2 flex-shrink-0 animate-pulse" />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-[#1a1a1a] text-white border-none lg:w-full focus:ring-0 outline-none placeholder-[#fafafa] text-xs"
        placeholder="Search..."
      />
      <div className="flex items-center divide-dotted divide-x-4 divide-[#333] ml-auto">
        <div className="flex space-x-2 pr-5">
          <button className="tag">
            <ActiveLink href="/">Releases </ActiveLink>
          </button>
          <button className="tag">
            <ActiveLink href="/playlist">Playlists </ActiveLink>
          </button>
          <ActiveLink href="/albums">
            <button className="tag">
              <ActiveLink href="/albums">Albums</ActiveLink>
            </button>
          </ActiveLink>
        </div>

        <div className="flex items-center space-x-1.5 text-[#cecece] pl-4">
          <Dropdown />
        </div>
      </div>
    </div>
  );
}

export default Search;
