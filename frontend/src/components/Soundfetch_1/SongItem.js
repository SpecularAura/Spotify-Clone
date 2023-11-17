import { Icon } from "../../Icons";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import songContext from "../../context/SongContext";
import { songsdata } from "../BottomBar/audios";

function SongItem({ item }) {
  const context = useContext(songContext);
  const {
    songs,
    setSongs,
    isplaying,
    setisplaying,
    currentSong,
    setCurrentSong,
    ct,
    setCt,
  } = context;

  const updateCurrent = () => {
    setCurrentSong(songsdata[item.id - 1]);
  };

  return (
    <NavLink
      key={item.id}
      to="/"
      className={"bg-footer p-4 rounded hover:bg-active group"}
    >
      <div className="pt-[100%] relative mb-4">
        
        <img
          src={item.image}
          className={`absolute inset-0 object-cover w-full h-full `}
        />
        <button
          onClick={updateCurrent}
          className={`w-10 h-10 rounded-full bg-primary absolute group-hover:flex group-focus:flex bottom-2 right-2 items-center justify-center `}
        >
          <Icon size={16} name="play" />
        </button>
      </div>
      <h6 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-base font-semibold">
        {item.title}
      </h6>
      <p className="line-clamp-2 text-link text-sm mt-1">{item.description}</p>
    </NavLink>
  );
}

export default SongItem;
