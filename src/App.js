import './styles/global.scss';
import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Home } from './pages/Home/containers/Home';
import { Add } from './pages/Add/containers/Add';
import { Login } from './pages/Login/containers/Login';
import { Header } from './shared/Header/Header';
import { Footer } from './shared/Footer/Footer';
import { onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { Notifications } from './shared/Notifications/containers/Notifications';
import { BrowserRouter as Router } from 'react-router-dom';
import { NotificationsContext } from './context/context';

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
const auth = getAuth();
auth.languageCode = 'ru';
const db = getDatabase(app);

function App(history) {
  const [isAuth, setAuth] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [notifications, setNotifications] = React.useState([]);
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     const uid = user.uid;
  //     setAuth(true);
  //     console.log(user);
  //     console.log('signed in');
  //   } else {
  //     console.log('signed out');
  //   }
  // });
  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        setNotifications,
      }}
    >
      <Router>
        <div className="App">
          <div className="global__container">
            {/* <Notifications /> */}
            <Header />
            <Switch>
              <Route exact history={history} path="/home" component={Home} />
              <Route exact history={history} path="/add" component={Add} />
              <Route exact history={history} path="/home" component={Home} />
              <Route exact history={history} path="/login" component={Login} />
              <Redirect from="/" to="home" />
            </Switch>
            <Footer />
          </div>
        </div>
      </Router>
    </NotificationsContext.Provider>
  );
}

export default App;
