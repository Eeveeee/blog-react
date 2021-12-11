import React, { useContext, useEffect, useState } from 'react';
import s from './Profile.module.scss';
import { Loader } from '../../../shared/Loader/Loader';
import { getUserPosts, getUserPublic } from '../../../services/UserService';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import { getAuth } from '@firebase/auth';
import { Info } from '../components/Info/Info';
import { Posts } from '../components/Posts/Posts';
import { NotificationsContext } from '../../../context/context';

export function Profile() {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({ state: 'init', value: null });
  const [posts, setPosts] = useState({ state: 'init', value: null });
  const { addNotification } = useContext(NotificationsContext);

  const auth = getAuth();
  const { id } = useParams();
  const isSelf = id === 'my';
  useEffect(() => {
    async function getSelfProfile() {
      const { email } = auth.currentUser;
      const userPublic = await getUserPublic(auth.currentUser.uid);
      return { ...userPublic, email };
    }
    async function fetchData() {
      try {
        if (isSelf && !auth.currentUser) {
          history.push('/home');
          return;
        }
        setUserInfo({ state: 'fetching', value: null });
        if (isSelf) {
          const info = await getSelfProfile();
          setUserInfo({ state: 'success', value: info });
        } else {
          const info = await getUserPublic(id);
          setUserInfo({ state: 'success', value: info });
        }
      } catch (err) {
        console.error(err);
        setUserInfo({ state: 'failure', value: null });
        addNotification({
          type: 'error',
          message: 'Произошла ошибка при загрузке профиля, попробуйте позже',
        });
      }
    }
    fetchData();
  }, [addNotification, history, auth.currentUser, id, isSelf]);

  useEffect(() => {
    async function fetchData() {
      if (!userInfo?.uid) {
        return;
      }
      try {
        setPosts({ state: 'fetching', value: null });
        const userPosts = await getUserPosts(userInfo.uid);
        setPosts({ state: 'success', value: userPosts });
      } catch (err) {
        setPosts({ state: 'failure', value: null });
        addNotification({
          type: 'error',
          message: 'Произошла ошибка при загрузке постов, попробуйте позже',
        });
      }
    }
    fetchData();
  }, [userInfo]);

  return (
    <div className={s.profile}>
      <div className={s.container}>
        {userInfo.state === 'success' && (
          <div className={s.outer}>
            <Info postsAmount={posts.value} user={userInfo.value} />
            {posts.state === 'success' &&
              (posts.value.length ? (
                <Posts posts={posts.value} />
              ) : (
                'Нет постов'
              ))}
            {posts.state === 'fetching' && <Loader />}
          </div>
        )}
        {userInfo.state === 'fetching' && <Loader />}
      </div>
    </div>
  );
}
