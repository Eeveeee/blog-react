import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { initializeApp } from 'firebase/app';
import React, { useEffect } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { NotificationsContext, UserContext } from './context/context';
import { errors } from './global/errors';
import firebaseConfig from './global/firebaseConfig';
import { useAuthState } from './hooks/useAuthState';
import { Add } from './pages/Add/containers/Add';
import { Edit } from './pages/Edit/containers/Edit';
import { Error } from './pages/Error/Error';
import { Home } from './pages/Home/containers/Home';
import { Post } from './pages/Post/containers/Post';
import { Profile } from './pages/Profile/containers/Profile';
import { ProfileSettings } from './pages/ProfileSettings/containers/ProfileSettings';
import { SignIn } from './pages/SignIn/containers/SignIn';
import { SignUp } from './pages/SignUp/containers/SignUp';
import { getUserPublic, subscribeToPublic } from './services/UserService';
import { Footer } from './shared/Footer/Footer';
import { Header } from './shared/Header/containers/Header';
import { Loader } from './shared/Loader/Loader';
import { Notifications } from './shared/Notifications/containers/Notifications';
import './styles/common.scss';
const app = initializeApp(firebaseConfig);
const appName = 'Prosto';
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
    if (auth.user) {
      const unsub = subscribeToPublic(
        auth.user.uid,
        (data) => {
          setUser({
            state: 'fullUser',
            value: { email: auth.user.email, ...data },
          });
        },
        (err) => {
          console.error(err);
        }
      );
      return () => {
        unsub();
      };
    }
  }, [auth]);

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
              value: { email: auth.user.email, ...data },
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
        <div className="globalContainer">
          <UserContext.Provider value={{ user, setUser }}>
            <NotificationsContext.Provider value={{ addNotification }}>
              <Notifications notifications={notifications} />
              <Header />
              <div className="pageContent">
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
                  <Route
                    exact
                    history={history}
                    path="/home"
                    component={Home}
                  />
                  <Route history={history} path="*" component={Error} />
                  <Redirect from="/" to="/home" />
                </Switch>
              </div>
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
        <div className="globalContainer">
          <UserContext.Provider value={{ user, setUser }}>
            <NotificationsContext.Provider value={{ addNotification }}>
              <Notifications notifications={notifications} />
              <Header />
              <div className="pageContent">
                <Switch>
                  <Route
                    exact
                    history={history}
                    path="/home"
                    component={Home}
                  />
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
              </div>
              <Footer />
            </NotificationsContext.Provider>
          </UserContext.Provider>
        </div>
      </div>
    );
  }
  return (
    <div className="loaderContainer">
      <Loader />
    </div>
  );
}

export default App;
