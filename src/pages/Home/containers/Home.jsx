import React, { useContext, useEffect } from 'react';
import s from './Home.module.scss';
import { Loader } from '../../../shared/Loader/Loader';
import { getUserPosts } from '../../../services/UserService';
import { Feed } from '../components/Feed/Feed';
import { NotificationsContext } from '../../../context/context';
import { getPostsAmount } from '../../../services/PostsService';

export function Home() {
  const [posts, setPosts] = React.useState({ state: 'fetching', value: null });
  const [postsAmount, setPostsAmount] = React.useState(15);
  const { addNotification } = useContext(NotificationsContext);
  useEffect(() => {
    let isAlive = true;
    getPostsAmount(postsAmount)
      .then((res) => {
        if (!isAlive) {
          return;
        }
        if (res.length) {
          setPosts({ state: 'success', value: res });
          return;
        }
        setPosts({ state: 'success', value: [] });
      })
      .catch((error) => {
        if (!isAlive) {
          return;
        }
        console.error(error);
        addNotification({
          type: 'error',
          message: 'Возникла ошибка загрузки постов, повторите попытку позже',
        });
        setPosts({ state: 'failure', value: null });
      });
    return () => {
      isAlive = false;
    };
  }, [addNotification, postsAmount]);
  return (
    <div className={s.home}>
      <div className={s.container}>
        {posts.state === 'fetching' ? (
          <Loader />
        ) : posts.state === 'success' && posts.value.length ? (
          <Feed posts={posts.value} />
        ) : (
          'Посты ещё не созданы'
        )}
      </div>
    </div>
  );
}
