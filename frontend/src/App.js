import Sidebar from "./components/Sidebar";
import App1 from "./components/Soundfetch/App";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import SongState from "./context/SongState";
import BottomBar from "./components/BottomBar";

function App() {
  return (
    <>
      <SongState>
        <Router>
          <div className="wrapper">
            <Sidebar />
            {/* <Content/> */}
          </div>
          <BottomBar />
        </Router>
      </SongState>
    </>
  );
}

export default App;
