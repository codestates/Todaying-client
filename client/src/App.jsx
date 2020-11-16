import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import LandingPage from './pages/LangdingPage/LandingPage';
import MyPage from './pages/MyPage/MyPage';

function App() {
  const [userInfo, setUserInfo] = useState({ email: '', nickname: '' });

  // getUserInfo 함수를 <Login> <SignUp>에 Props로 전달
  // 서버응답에 담겨오는 email, nickname을 최상단 App.jsx 컴포넌트로 끌어올림
  const getUserInfo = ({ email, nickname }) => {
    setUserInfo({ email, nickname });
  };

  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <LandingPage getUserInfo={getUserInfo} />
        </Route>
        <Route path="/main">
          <MainPage getUserInfo={getUserInfo} />
        </Route>
        <Route path="/mypage">
          <MyPage userInfo={userInfo} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
