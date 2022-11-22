import './App.css';
import {Routes, Route} from "react-router-dom";

import MainHeader from "./content/components/navigation/MainHeader";
import Challenges from "./content/pages/private/chamber/Challenges";
import NotFound from "./content/pages/system/NotFound";
import Collaborations from "./content/pages/private/chamber/Collaborations";
import Tops from "./content/pages/private/chamber/Tops";
import Favourites from "./content/pages/private/Favourites";
import Settings from "./content/pages/private/Settings";
import Profile from "./content/pages/private/Profile";
import ChamberHeader from "./content/components/navigation/ChamberHeader";
import Login from "./content/pages/public/Login";


function App() {
  return (
    <div className="App">
        <Routes>
            <Route path={'/'} element={<MainHeader />}>
                <Route path={'favourites'} element={<Favourites />}/>
                <Route path={'settings'} element={<Settings />}/>
                <Route path={'profile/me'} element={<Profile />}/>
            </Route>
            <Route path={'content'} element={<ChamberHeader />}>
                <Route path={'challenges'} element={<Challenges />}/>
                <Route path={'collaborations'} element={<Collaborations />}/>
                <Route path={'tops'} element={<Tops />}/>
            </Route>
            <Route path={'login'} element={<Login />}/>
            <Route path={'*'} element={<NotFound />}/>
        </Routes>
    </div>
  );
}

export default App;
