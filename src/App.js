import { initializeApp } from 'firebase/app';
import React, { useEffect } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { NotificationsContext, UserContext } from './context/context';
import firebaseConfig from './global/firebaseConfig';
import { useAuthState } from './hooks/useAuthState';
import { Add } from './pages/Add/containers/Add';
import { Edit } from './pages/Edit/containers/Edit';
import { Home } from './pages/Home/containers/Home';
import { Post } from './pages/Post/containers/Post';
import { Profile } from './pages/Profile/containers/Profile';
import { ProfileSettings } from './pages/ProfileSettings/containers/ProfileSettings';
import { SignIn } from './pages/SignIn/containers/SignIn';
import { SignUp } from './pages/SignUp/containers/SignUp';
import { getUserPublic } from './services/UserService';
import { Footer } from './shared/Footer/Footer';
import { Header } from './shared/Header/containers/Header';
import { Loader } from './shared/Loader/Loader';
import { Notifications } from './shared/Notifications/containers/Notifications';
import s from './styles/global.module.scss';

const app = initializeApp(firebaseConfig);

function App() {
  const history = useHistory();
  const auth = useAuthState();
  const [notifications, setNotifications] = React.useState([]);
  const [user, setUser] = React.useState({ state: 'fetching', value: null });
  function addNotification({ type, message }, time = 5000) {
    const notificationObject = { type, message, createdAt: Date.now() };
    setNotifications((notifications) => {
      return [...notifications, notificationObject];
    });
    setTimeout(() => {
      setNotifications((notifications) =>
        notifications.filter(
          (notification) => notification !== notificationObject
        )
      );
    }, time);
  }
  useEffect(() => {
    async function fetchUser() {
      if (!auth.user) {
        setUser({ state: 'unauth', value: null });
        return;
      }
      getUserPublic(auth.user.uid)
        .then((data) => {
          if (data) {
            setUser({
              state: 'fullUser',
              value: { ...auth.user, ...data },
            });
            return;
          }
          setUser({ state: 'privateUser', value: auth.user });
        })
        .catch((err) => {
          console.error(err);
          if (auth.currentUser) {
            setUser({ state: 'privateUser', value: auth.user });
            return;
          }
          setUser({ state: 'unauth', value: null });
        });
    }
    if (auth.state !== 'init' && user.state === 'fetching') {
      fetchUser();
    }
  }, [auth, user]);
  if (auth.state === 'auth') {
    return (
      <div className="App">
        <div className={s.globalContainer}>
          <UserContext.Provider value={{ user, setUser }}>
            <NotificationsContext.Provider value={{ addNotification }}>
              <Notifications notifications={notifications} />
              <Header />
              <Switch>
                <Route exact history={history} path="/add" component={Add} />
                <Route
                  exact
                  history={history}
                  path="/profile/settings/"
                  component={ProfileSettings}
                />
                <Route
                  exact
                  history={history}
                  path="/profile/:id"
                  component={Profile}
                />
                <Route
                  exact
                  history={history}
                  path="/post/edit/:id"
                  component={Edit}
                />
                <Route history={history} path="/post/:id/" component={Post} />
                <Route exact history={history} path="/home" component={Home} />
                <Redirect from="/" to="/home" />
              </Switch>
              <Footer />
            </NotificationsContext.Provider>
          </UserContext.Provider>
        </div>
      </div>
    );
  }
  if (auth.state === 'unauth') {
    return (
      <div className="App">
        <div className={s.globalContainer}>
          <UserContext.Provider value={{ user, setUser }}>
            <NotificationsContext.Provider value={{ addNotification }}>
              <Notifications notifications={notifications} />
              <Header />
              <Switch>
                <Route exact history={history} path="/home" component={Home} />
                <Route
                  exact
                  history={history}
                  path="/signIn"
                  component={SignIn}
                />
                <Route exact history={history} path="/signup">
                  <SignUp />
                </Route>
                <Route
                  exact
                  history={history}
                  path="/profile/:id"
                  component={Profile}
                />
                <Route history={history} path="/post/:id/" component={Post} />
                <Redirect from="/" to="/home" />
              </Switch>
              <Footer />
            </NotificationsContext.Provider>
          </UserContext.Provider>
        </div>
      </div>
    );
  }
  return (
    <div className={s.loaderContainer}>
      <Loader />
    </div>
  );
}

export default App;
