import { initializeApp } from 'firebase/app';
import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
  getDocs,
  collection,
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { NotificationsContext } from './context/context';
import firebaseConfig from './global/firebaseConfig';
import { Add } from './pages/Add/containers/Add';
import { Home } from './pages/Home/containers/Home';
import { Post } from './pages/Post/containers/Post';
import { Profile } from './pages/Profile/containers/Profile';
import { SignIn } from './pages/SignIn/containers/SignIn';
import { SignUp } from './pages/SignUp/containers/SignUp';
import { Footer } from './shared/Footer/Footer';
import { Header } from './shared/Header/containers/Header';
import { Notifications } from './shared/Notifications/containers/Notifications';
import s from './styles/global.module.scss';
import { useAuthState } from './hooks/useAuthState';
import { Loader } from './shared/Loader/Loader';
import { getPostsAmount } from './services/PostsService';

const app = initializeApp(firebaseConfig);

function App() {
  const history = useHistory();
  const [notifications, setNotifications] = React.useState([]);
  getPostsAmount(15);
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

  const auth = useAuthState();
  if (auth.state === 'auth') {
    return (
      <div className="App">
        <div className={s.globalContainer}>
          <NotificationsContext.Provider value={{ addNotification }}>
            <Notifications notifications={notifications} />
            <Header />
            <Switch>
              <Route exact history={history} path="/add" component={Add} />
              <Route
                exact
                history={history}
                path="/profile/:id"
                component={Profile}
              />
              <Route
                exact
                history={history}
                path="/posts/:id"
                component={Post}
              />
              <Route exact history={history} path="/home" component={Home} />
              <Redirect from="/" to="/home" />
            </Switch>
            <Footer />
          </NotificationsContext.Provider>
        </div>
      </div>
    );
  }
  if (auth.state === 'unauth') {
    return (
      <div className="App">
        <div className={s.globalContainer}>
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
              <Route
                exact
                history={history}
                path="/posts/:id"
                component={Post}
              />
              <Redirect from="/" to="/home" />
            </Switch>
            <Footer />
          </NotificationsContext.Provider>
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
