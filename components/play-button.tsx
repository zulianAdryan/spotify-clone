import { FaPlay } from "react-icons/fa";

const PlayButton = () => {
  return (
    <button
      type="button"
      className="transition opacity-0 rounded-full flex items-center bg-sky-500 p-4 drop-shadow-md trasnlate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110"
      aria-label="play"
    >
      <FaPlay className="text-black" size={20} />
    </button>
  );
};

export default PlayButton;
