import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './pages/LangdingPage/LandingPage';
import MyPage from './pages/MyPage/MyPage';
// 라우터를 사용하기 전에 테스트를 위해 App.jsx에서 MyPage 테스트

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
        <Route
          path="/"
          exact
          render={() => <LandingPage getUserInfo={getUserInfo} />}
        />
        <Route path="/main">{/* <Main /> */}</Route>
        <Route path="/mypage">
          <MyPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
