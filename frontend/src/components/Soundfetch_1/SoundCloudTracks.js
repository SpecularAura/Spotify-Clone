import React, { useEffect, useState, useContext } from "react";
import songContext from "../../context/SongContext";
import Section from "./Section";

function Content() {
  const context = useContext(songContext);
  const {
    songs,
    setSongs,
  } = context;

  useEffect(() => {
    const formData = new FormData();
    formData.append("search_box", "Faded Alan");
    // TODO: Change to get recommendations instead of search from browser history
    fetch("/api/search", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setSongs(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <div className="overflow-y-auto h-screen">
      <div className="grid gap-y-8">
        <Section title="Recently played" more="/blabla" items={songs} />
        <Section title="Shows to try" more="/blabla" items={songs} />
        <Section title="Made For Tayfun Erbilen" more="/blabla" items={songs} />
      </div>
    </div>
  );
}

export default Content;
