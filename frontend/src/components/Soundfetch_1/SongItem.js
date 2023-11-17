import { Icon } from "../../Icons";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import songContext from "../../context/SongContext";
import { songsdata } from "../BottomBar/audios";

function SongItem({ item }) {
  const context = useContext(songContext);
  const {
    songs,
    setCurrentSong
  } = context;

  const updateCurrent = () => {
    setCurrentSong(songs[songs.findIndex((el) => el.id == item.id)]);
  };

  return (
    <NavLink
      key={item.id}
      to="/"
      className={
        "bg-footer p-4 rounded transition-all duration-200 ease-in hover:bg-active group"
      }
    >
      <div className="pt-[100%] relative mb-4">
        <img
          src={item.image}
          className={`absolute inset-0 object-cover w-full h-full `}
        />
        <button
          onClick={updateCurrent}
          className={`w-11 h-11 transition-all duration-200 ease-in rounded-full text-black bg-primary opacity-0 absolute flex bottom-0 right-2 items-center justify-center group-hover:opacity-100 group-hover:bottom-2 hover:scale-110`}
        >
          <Icon size={20} name="play" isBlack={true} />
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
