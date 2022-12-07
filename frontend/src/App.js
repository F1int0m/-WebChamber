import './style/App.css';
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
import People from "./content/pages/private/chamber/People";

import {
    ROOT_URL,
    CHAMBER_ROOT_URL,
    CHAMBER_CHALLENGES_URL,
    CHAMBER_COLLABORATIONS_URL,
    CHAMBER_TOPS_URL,
    FAVOURITES_URL,
    SETTINGS_URL,
    PROFILE_URL,
    LOGIN_URL,
    NOT_FOUND_URL
} from './env'

function App() {
    // TODO: поставить приватность через isAuth, вытащить навигацию в отдельный файл
    //       const isAuth = useSelector(state => state.is_auth)
  return (
    <div className="App">
        <Routes>
            <Route path={ROOT_URL} element={<MainHeader />}>
                <Route path={FAVOURITES_URL} element={<Favourites />}/>
                <Route path={SETTINGS_URL} element={<Settings />}/>
                <Route path={PROFILE_URL} element={<Profile />}/>
            </Route>
            <Route path={CHAMBER_ROOT_URL} element={<ChamberHeader />}>
                <Route path={CHAMBER_CHALLENGES_URL} element={<Challenges />}/>
                <Route path={CHAMBER_COLLABORATIONS_URL} element={<Collaborations />}/>
                <Route path={CHAMBER_TOPS_URL} element={<Tops />}/>
                <Route path={'/content/people'} element={<People />}/>
            </Route>
            <Route path={LOGIN_URL} element={<Login />}/>
            <Route path={NOT_FOUND_URL} element={<NotFound />}/>
        </Routes>
    </div>
  );
}

export default App;
