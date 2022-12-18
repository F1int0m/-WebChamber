import './view/style/App.css';
import {Routes, Route} from "react-router-dom";

import MainHeader from "./view/components/navigation/MainHeader";
import NotFound from "./view/pages/system/NotFound";
import Favourites from "./view/pages/private/Favourites";
import Settings from "./view/pages/private/Settings";
import Profile from "./view/pages/private/Profile";
import Login from "./view/pages/public/Login";

import {
    ROOT_URL,
    CHAMBER_URL,
    FAVOURITES_URL,
    SETTINGS_URL,
    PROFILE_PAGE,
    CHALLENGES_URL,
    LOGIN_URL,
    NOT_FOUND_URL
} from './system/env'
import ContentFeed from "./view/components/Content/ContentFeed/ContentFeed";
import {profileCasualPosts, profileChallengesPosts} from "./system/fakeData";
import People from "./view/pages/private/chamber/People";
import Chamber from "./view/pages/private/Chamber";

function App() {
    // TODO: поставить приватность через isAuth, вытащить навигацию в отдельный файл
    //       const isAuth = useSelector(state => state.is_auth)

    const isMyProfile = true;
  return (
    <div className="App">
        <Routes>
            <Route path={ROOT_URL} element={<MainHeader />}>
                <Route path={FAVOURITES_URL} element={<Favourites />}/>
                <Route path={SETTINGS_URL} element={<Settings />}/>
                <Route path={PROFILE_PAGE.URL} element={<Profile />}>
                    <Route path={PROFILE_PAGE.CHALLENGES.URL} element={
                        <ContentFeed pageType={PROFILE_PAGE.CHALLENGES.TYPE} data={profileChallengesPosts}/>
                    }/>
                    {isMyProfile ?
                        <Route path={PROFILE_PAGE.CASUAL.URL} element={
                            <ContentFeed pageType={PROFILE_PAGE.CASUAL.TYPE.ME} data={profileCasualPosts}/>
                        }/>
                        :
                        <Route path={PROFILE_PAGE.CASUAL.URL} element={
                            <ContentFeed pageType={PROFILE_PAGE.CASUAL.TYPE.NOT_ME} data={profileCasualPosts}/>
                        }/>
                    }

                </Route>
                <Route path={CHAMBER_URL} element={<Chamber />}>
                    <Route path={CHALLENGES_URL} element={
                        <ContentFeed pageType={'challenges-chamber'} data={profileCasualPosts}/>
                    }/>
                    <Route path={'casual'} element={
                        <ContentFeed pageType={'casual-chamber'} data={profileCasualPosts}/>
                    }/>
                    <Route path={'people'} element={
                        <People />
                    }/>
                </Route>
            </Route>
            <Route path={LOGIN_URL} element={<Login />}/>
            <Route path={NOT_FOUND_URL} element={<NotFound />}/>
        </Routes>
    </div>
  );
}

export default App;
