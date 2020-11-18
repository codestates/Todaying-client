import { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import LandingPage from './pages/LangdingPage/LandingPage';
import MainPage from './pages/MainPage/MainPage';
import MyPage from './pages/MyPage/MyPage';
import Nav from './components/Nav/Nav';

function App() {
  const [userInfo, setUserInfo] = useState({
    token: null,
    email: null,
    nickname: null,
  });
  const getLoginToken = (token) => {
    const { email, nickname } = jwt.decode(token);
    setUserInfo({ token, email, nickname });
  };

  const changeNickname = (nickname) => {
    setUserInfo({ ...userInfo, nickname });
  };

  const handleLogout = async () => {
    await setUserInfo({ ...userInfo, token: null });
  };

  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <LandingPage getLoginToken={getLoginToken} />
        </Route>
        <Route path="/main">
          {userInfo.token ? (
            <>
              <Nav handleLogout={handleLogout} />
              <MainPage token={userInfo.token} getLoginToken={getLoginToken} />
            </>
          ) : window.location.search ? (
            <>
              <Nav handleLogout={handleLogout} />
              <MainPage token={userInfo.token} getLoginToken={getLoginToken} />
            </>
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route path="/mypage">
          {userInfo ? (
            <>
              <Nav handleLogout={handleLogout} />
              <MyPage userInfo={userInfo} changeNickname={changeNickname} />
            </>
          ) : (
            <Redirect to="/" />
          )}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
