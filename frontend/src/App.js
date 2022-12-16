import './view/style/App.css';
import {Routes, Route} from "react-router-dom";

import MainHeader from "./view/components/navigation/MainHeader";
import Challenges from "./view/pages/private/chamber/Challenges";
import NotFound from "./view/pages/system/NotFound";
import Collaborations from "./view/pages/private/chamber/Collaborations";
import Tops from "./view/pages/private/chamber/Tops";
import Favourites from "./view/pages/private/Favourites";
import Settings from "./view/pages/private/Settings";
import Profile from "./view/pages/private/Profile";
import ChamberHeader from "./view/components/navigation/ChamberHeader";
import Login from "./view/pages/public/Login";

import {
    ROOT_URL,
    CHAMBER_URL,
    FAVOURITES_URL,
    SETTINGS_URL,
    PROFILE_URL,
    CHALLENGES_URL,
    CASUAL_URL,
    COLLABORATIONS_URL,
    TOPS_URL,
    LOGIN_URL,
    NOT_FOUND_URL
} from './system/env'
import Content from "./view/components/Content/Content";
import {profileCasualPosts, profileChallengesPosts} from "./view/components/ProfileBox/data";

function App() {
    // TODO: поставить приватность через isAuth, вытащить навигацию в отдельный файл
    //       const isAuth = useSelector(state => state.is_auth)
  return (
    <div className="App">
        <Routes>
            <Route path={ROOT_URL} element={<MainHeader />}>
                <Route path={FAVOURITES_URL} element={<Favourites />}/>
                <Route path={SETTINGS_URL} element={<Settings />}/>
                <Route path={PROFILE_URL} element={<Profile />}>
                    <Route path={CHALLENGES_URL} element={<Content type={'challenges-profile'} data={profileChallengesPosts}/>}/>
                    <Route path={CASUAL_URL} element={<Content type={'casual-profile-me'} data={profileCasualPosts}/>}/>
                </Route>
                <Route path={CHAMBER_URL} element={<ChamberHeader />}>
                    <Route path={CHALLENGES_URL} element={<Challenges />}/>
                    <Route path={COLLABORATIONS_URL} element={<Collaborations />}/>
                    <Route path={TOPS_URL} element={<Tops />}/>
                </Route>
            </Route>
            <Route path={LOGIN_URL} element={<Login />}/>
            <Route path={NOT_FOUND_URL} element={<NotFound />}/>
        </Routes>
    </div>
  );
}

export default App;
