import { BrowserRouter as Router, Route} from "react-router-dom";
import { Routes } from "react-router-dom";
import Menu from "./Pages/Menu.js";
import Game from "./Pages/Game.js";
import HowToPlay from "./Pages/HowToPlay.js";
import ModifyDB from "./Pages/ModifyDB.js";

function App() {
  return (<>
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/game/original" element={<Game gameType="Original" />} />
        <Route path="/game/reduced" element={<Game gameType="Reduced" />} />
        <Route path="/game/lying" element={<Game gameType="Lying" />} />
        <Route path="/howtoplay" element={<HowToPlay />} />
        <Route path="/insert" element={<ModifyDB />} />
      </Routes>
    </Router>
  </>);
}

export default App;
