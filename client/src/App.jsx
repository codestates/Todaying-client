import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import jwt from 'jsonwebtoken';

import LandingPage from './pages/LangdingPage/LandingPage';
import MainPage from './pages/MainPage/MainPage';
import MyPage from './pages/MyPage/MyPage';

function App() {
  const [userInfo, setUserInfo] = useState({
    token: '',
    email: '',
    nickname: '',
  });

  const getLoginToken = ({ token }) => {
    // token 디코딩 -> get Email, nickname
    const { email, nickname } = jwt.decode(token);

    setUserInfo({ token, email, nickname });
  };

  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <LandingPage getLoginToken={getLoginToken} />
        </Route>
        <Route path="/main">
          <MainPage getLoginToken={getLoginToken} />
        </Route>
        <Route path="/mypage">
          <MyPage userInfo={userInfo} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
