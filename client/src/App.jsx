import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './pages/LangdingPage/LandingPage';
import MainPage from './pages/MainPage/MainPage';
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
          {/* social login은 redirect로 바로 /main으로 보내주기 때문에 main 페이지에서 email, nickname을 설정해주도록 함 */}
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
