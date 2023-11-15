import Sidebar from "./components/Sidebar";
import App1 from "./components/Soundfetch/App";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import SongState from "./context/SongState";
import BottomBar from "./components/BottomBar";
import SoundCloudTracks from "./components/Soundfetch_1/SoundCloudTracks";

function App() {
  return (
    <>
    <SongState>
    <Router>
			<div className="wrapper">
				<Sidebar/>
        {/* <App1/> */}
				{/* <Content/> */}
        <SoundCloudTracks/>
			</div>
			<BottomBar/>
		</Router>
      </SongState>
    </>
  );
}

export default App;
