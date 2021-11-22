import React, { useContext, useEffect } from 'react';
import s from './Home.module.scss';
import { Loader } from '../../../shared/Loader/Loader';
import { getAllPosts, getPost } from '../../../services/DbService';
import { Feed } from '../components/Feed/Feed';
import { useHistory } from 'react-router';
import { NotificationsContext } from '../../../context/context';

export function Home() {
  const history = useHistory();
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const { addNotification } = useContext(NotificationsContext);
  useEffect(() => {
    getAllPosts()
      .then((snapshot) => {
        if (snapshot.val()) {
          setPosts(Object.values(snapshot.val()));
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        addNotification({
          type: 'error',
          message:
            'Возникла ошибка при загрузке постов, повторите попытку позже',
        });
        setLoading(false);
      });
  }, []);

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
