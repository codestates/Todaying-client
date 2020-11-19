import { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import LandingPage from './pages/LangdingPage/LandingPage';
import MainPage from './pages/MainPage/MainPage';
import MyPage from './pages/MyPage/MyPage';
import Nav from './components/Nav/Nav';
import Spinner from './components/Spinner/Spinner';

function App() {
  const [cardsData, setCardsData] = useState({});

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

  const handleLogout = () => {
    setUserInfo({ ...userInfo, token: null });
  };

  // Loading Spinner 상태관리
  const [spinIsOn, setSpinIsOn] = useState(false);
  const handleSpinner = () => {
    // 이 핸들스피너 함수를 서버 요청이 있는 모든 곳에 범용적으로 사용
    setSpinIsOn((prevState) => !prevState);
  };

  return (
    <div>
      <Spinner spinIsOn={spinIsOn} />
      <Switch>
        <Route path="/" exact>
          {window.location.search ? (
            <>
              <Nav handleLogout={handleLogout} />
              <MainPage
                token={userInfo.token}
                getLoginToken={getLoginToken}
                cardsData={cardsData}
                setCardsData={setCardsData}
                handleSpinner={handleSpinner}
              />
            </>
          ) : (
            <LandingPage
              getLoginToken={getLoginToken}
              handleSpinner={handleSpinner}
            />
          )}
        </Route>

        <Route path="/main">
          {userInfo.token ? (
            <>
              <Nav handleLogout={handleLogout} />
              <MainPage
                token={userInfo.token}
                getLoginToken={getLoginToken}
                cardsData={cardsData}
                setCardsData={setCardsData}
                handleSpinner={handleSpinner}
              />
            </>
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route path="/mypage">
          {userInfo.token ? (
            <>
              <Nav handleLogout={handleLogout} />
              <MyPage
                userInfo={userInfo}
                changeNickname={changeNickname}
                handleSpinner={handleSpinner}
              />
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
