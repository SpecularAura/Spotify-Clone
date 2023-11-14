import React from "react";
import { Link } from "react-router-dom";

function Playlists() {
  return (
    <nav className="mx-6 mt-2 py-2 flex-auto border-t border-white border-opacity-20 overflow-auto">
      <ul>
        {new Array(10).fill(
          <li>
            <Link
              to="#"
              className="text-s text-link text-sm text-gray-500 hover:text-white flex h-8 items-center"
            >
              22. Çalma Listem
            </Link>
          </li>,
        )}
      </ul>
    </nav>
  );
}

export default Playlists;
