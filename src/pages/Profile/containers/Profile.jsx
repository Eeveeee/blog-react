import React, { useEffect, useState } from 'react';
import s from './Profile.module.scss';
import { Loader } from '../../../shared/Loader/Loader';
import { getUserPublic, getUserPosts } from '../../../services/DbService';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import { getAuth } from '@firebase/auth';
import { Info } from '../components/Info/Info';
import { Posts } from '../components/Posts/Posts';

export function Profile() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [posts, setPosts] = useState(null);

  const auth = getAuth();
  const { id } = useParams();
  const isSelf = id === 'my';
  async function getSelfProfile() {
    const { email } = auth.currentUser;
    const userPublic = await getUserPublic(auth.currentUser.uid);
    return { ...userPublic, email };
  }
  useEffect(async () => {
    try {
      if (isSelf && !auth.currentUser) {
        history.push('/home');
        return;
      }
      if (isSelf) {
        const info = await getSelfProfile();
        setUserInfo(info);
      } else {
        const info = await getUserPublic(id);
        setUserInfo(info);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(async () => {
    if (!userInfo?.uid) {
      return;
    }
    try {
      console.log(userInfo);
      setPosts(await getUserPosts(userInfo.uid));
      setLoadingPosts(false);
    } catch (err) {
      console.error(err);
    }
  }, [userInfo]);

  return (
    <div className={s.profile}>
      <div className={s.container}>
        {loading ? (
          <Loader />
        ) : (
          <div className={s.outer}>
            <Info user={userInfo} />
            {!loadingPosts ? (
              posts ? (
                <Posts posts={posts} />
              ) : (
                'Нет постов'
              )
            ) : (
              <Loader />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
