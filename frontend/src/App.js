import './App.css';
import {Routes, Route} from "react-router-dom";

import Layout from "./content/components/navigation/Layout";
import Challenges from "./content/pages/private/chamber/Challenges";
import TokenSetup from "./content/pages/system/TokenSetup";
import NotFound from "./content/pages/system/NotFound";
import Collaborations from "./content/pages/private/chamber/Collaborations";
import Tops from "./content/pages/private/chamber/Tops";
import Favourites from "./content/pages/private/Favourites";
import Settings from "./content/pages/private/Settings";
import Profile from "./content/pages/private/Profile";
import Chamber from "./content/components/navigation/Chamber";


function App() {
  return (
    <div className="App">
        <Routes>
            <Route path={'/'} element={<Layout />}>
                <Route path={'favourites'} element={<Favourites />}/>
                <Route path={'settings'} element={<Settings />}/>
                <Route path={'profile/me'} element={<Profile />}/>
                <Route path={'*'} element={<NotFound/>}/>
            </Route>
            <Route path={'content'} element={<Chamber />}>
                <Route path={'challenges'} element={<Challenges />}/>
                <Route path={'collaborations'} element={<Collaborations />}/>
                <Route path={'tops'} element={<Tops />}/>
            </Route>
        </Routes>
    </div>
  );
}

export default App;
