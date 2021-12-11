import React, { useContext, useEffect } from 'react';
import s from './Home.module.scss';
import { Loader } from '../../../shared/Loader/Loader';
import { getUserPosts } from '../../../services/UserService';
import { Feed } from '../components/Feed/Feed';
import { NotificationsContext } from '../../../context/context';
import { getPostsAmount } from '../../../services/PostsService';

export function Home() {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [postsAmount, setPostsAmount] = React.useState(15);
  const { addNotification } = useContext(NotificationsContext);
  useEffect(() => {
    getPostsAmount(postsAmount)
      .then((res) => {
        if (res.length) {
          setPosts(res);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        addNotification({
          type: 'error',
          message: 'Возникла ошибка загрузки постов, повторите попытку позже',
        });
        setLoading(false);
      });
  }, [addNotification, postsAmount]);

  return (
    <div className={s.home}>
      <div className={s.container}>
        {loading ? (
          <Loader />
        ) : posts.length ? (
          <Feed posts={posts} />
        ) : (
          'Посты ещё не созданы'
        )}
      </div>
    </div>
  );
}
