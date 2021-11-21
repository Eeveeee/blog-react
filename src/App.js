import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { Add } from './pages/Add/containers/Add';
import { Home } from './pages/Home/containers/Home';
import { Post } from './pages/Post/Post';
import { Profile } from './pages/Profile/containers/Profile';
import { SignIn } from './pages/SignIn/containers/SignIn';
import { SignUp } from './pages/SignUp/containers/SignUp';
import { Footer } from './shared/Footer/Footer';
import { Header } from './shared/Header/containers/Header';
import { Notifications } from './shared/Notifications/containers/Notifications';
import './styles/global.scss';

const firebaseConfig = {
  apiKey: 'AIzaSyC3NG1hpGDzAdvOcZer1hhCK63DG08XVLI',
  authDomain: 'news-react-354ec.firebaseapp.com',
  databaseURL:
    'https://news-react-354ec-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'news-react-354ec',
  storageBucket: 'news-react-354ec.appspot.com',
  messagingSenderId: '721375876429',
  appId: '1:721375876429:web:3940d181bddc90877b9304',
  measurementId: 'G-FKGJ39DJZR',
};
const app = initializeApp(firebaseConfig);

function App() {
  const history = useHistory();
  const [loading, setLoading] = React.useState(true);
  const [notifications, setNotifications] = React.useState([]);
  const [isAuth, setIsAuth] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);
  const auth = getAuth();
  const storage = getStorage();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
        setCurrentUser(user);
      } else {
        setIsAuth(false);
        setCurrentUser(null);
      }
      setLoading(false);
    });
  }, []);

  if (!isAuth) {
    return (
      <div className="App">
        <div className="global__container">
          <Header currentUser={currentUser} />
          {!loading && (
            <Switch>
              <Route exact history={history} path="/home" component={Home} />
              <Route
                exact
                history={history}
                path="/signIn"
                component={SignIn}
              />
              <Route exact history={history} path="/signup">
                <SignUp setCurrentUser={setCurrentUser} />
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
          )}
          <Footer />
        </div>
      </div>
    );
  }
  return (
    <div className="App">
      <div className="global__container">
        <Header currentUser={currentUser} />
        {!loading && (
          <Switch>
            <Route exact history={history} path="/add" component={Add} />
            <Route
              exact
              history={history}
              path="/profile/:id"
              component={Profile}
            />
            <Route exact history={history} path="/posts/:id" component={Post} />
            <Route exact history={history} path="/home" component={Home} />
            <Redirect from="/" to="/home" />
          </Switch>
        )}
        <Footer />
      </div>
    </div>
  );
}

export default App;
