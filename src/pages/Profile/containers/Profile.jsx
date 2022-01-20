import React, { useContext, useEffect, useState } from 'react';
import s from './Profile.module.scss';
import { Loader } from '../../../shared/Loader/Loader';
import { getUserPosts, getUserPublic } from '../../../services/UserService';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import { getAuth } from '@firebase/auth';
import { Info } from '../components/Info/Info';
import { Posts } from '../components/Posts/Posts';
import { NotificationsContext } from '../../../context/context';
import { errors } from '../../../global/errors';

export function Profile() {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({ state: 'init', value: null });
  const [posts, setPosts] = useState({ state: 'init', value: null });
  const { addNotification } = useContext(NotificationsContext);

  const auth = getAuth();
  const { id } = useParams();
  useEffect(() => {
    let isAlive = true;
    async function fetchData() {
      try {
        setUserInfo({ state: 'fetching', value: null });
        const info = await getUserPublic(id);
        if (!isAlive) {
          return;
        }
        if (!info) {
          addNotification({
            type: 'error',
            message: 'Профиль удалён или ещё не создан',
          });
          history.push('/home');
          return;
        }
        setUserInfo({ state: 'success', value: info });
      } catch (err) {
        if (!isAlive) {
          return;
        }
        console.error(err);
        setUserInfo({ state: 'failure', value: null });
        addNotification({
          type: 'error',
          message: 'Произошла ошибка при загрузке профиля, попробуйте позже',
        });
      }
    }
    fetchData();
    return () => {
      isAlive = false;
    };
  }, [addNotification, history, auth, id]);
  useEffect(() => {
    async function fetchData() {
      setPosts({ state: 'fetching', value: null });
      try {
        const userPosts = await getUserPosts(userInfo.value.id);
        setPosts({ state: 'success', value: userPosts });
      } catch (err) {
        setPosts({ state: 'failure', value: null });
        console.error(err);
        addNotification({
          type: 'error',
          message: errors(
            err.code,
            'Произошла ошибка при загрузке постов, попробуйте позже'
          ),
        });
      }
    }
    if (posts.state === 'init' && userInfo.state === 'success') {
      fetchData();
    }
  }, [userInfo, addNotification, posts]);
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
