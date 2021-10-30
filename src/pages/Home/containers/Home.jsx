import React, { useEffect } from 'react';
import s from './Home.module.scss';
import { Loader } from '../../../shared/Loader/Loader';
import { getAllPosts } from '../../../services/DbService';
import { Feed } from '../components/Feed/Feed';

export function Home() {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    getAllPosts()
      .then((snapshot) => {
        setPosts(Object.values(snapshot.val()));
        setLoading(false);
      })
      .catch((error) => {
        console.error(error, 'at getting posts');
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
