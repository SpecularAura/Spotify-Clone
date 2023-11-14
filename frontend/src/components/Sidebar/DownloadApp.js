import { Icon } from "../../Icons";
import { Link } from "react-router-dom";

function DownloadApp() {
  return (
    <Link
      to="#"
      className="h-10 flex flex-shrink-0 text-sm text-gray-500 font-semibold text-link hover:text-white gap-x-4 items-center px-6"
    >
      <Icon name="download" size={20} />
      Uygulamayı Yükle
    </Link>
  );
}

export default DownloadApp;
