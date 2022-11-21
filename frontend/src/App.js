import './App.css';
import {Routes, Route, NavLink} from "react-router-dom";

import Layout from "./Layout";
import MainPage from "./MainPage";
import TokenSetup from "./tokenSetup";
import NotFound from "./NotFound";


function App() {
  return (
    <div className="App">
        <Routes>
            <Route path={'/'} element={<Layout />}>
                <Route index element={<MainPage/>}/>
                <Route path={'favourites'} element={<TokenSetup/>}/>
                <Route path={'settings'} element={<MainPage/>}/>
                <Route path={'profile'} element={<MainPage/>}/>
                <Route path={'*'} element={<NotFound/>}/>
            </Route>
        </Routes>
    </div>
  );
}

export default App;
