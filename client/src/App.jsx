import { Route, Switch } from 'react-router-dom';
import LandingPage from './pages/LangdingPage/LandingPage';
import MyPage from './pages/MyPage/MyPage';
// 라우터를 사용하기 전에 테스트를 위해 App.jsx에서 MyPage 테스트

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/main">{/* <Main /> */}</Route>
        <Route path="/mypage">
          <MyPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
