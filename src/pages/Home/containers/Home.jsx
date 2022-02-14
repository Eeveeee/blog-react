import React, { useContext, useEffect } from 'react';
import s from './Home.module.scss';
import { Loader } from '../../../shared/Loader/Loader';
import { getUserPosts } from '../../../services/UserService';
import { Feed } from '../components/Feed/Feed';
import { NotificationsContext } from '../../../context/context';
import { getPostsAmount } from '../../../services/PostsService';
import { settings } from '../../../settings';
import classNames from 'classnames';

export function Home() {
  const [posts, setPosts] = React.useState({ state: 'fetching', value: null });
  const [postsAmount, setPostsAmount] = React.useState(settings.postsToLoad);
  const [isShowMore, setIsShowMore] = React.useState(true);
  const { addNotification } = useContext(NotificationsContext);
  useEffect(() => {
    let isAlive = true;
    getPostsAmount(postsAmount)
      .then((res) => {
        if (!isAlive) {
          return;
        }
        if (res.length !== postsAmount) {
          setIsShowMore(false);
        } else {
          setIsShowMore(true);
        }
        if (res.length) {
          setPosts({ state: 'success', value: res });
          return;
        }
        setPosts({ state: 'success', value: null });
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
  function toggleShowMore() {
    setPosts((posts) => ({
      state: 'fetching',
      value: posts.value,
    }));
    setPostsAmount((postsAmount) => postsAmount + settings.postsToLoad);
  }
  return (
    <div className={classNames(s.home, 'pageContent')}>
      <div className="container">
        {posts.value ? (
          <div className={s.contentWrapper}>
            <Feed posts={posts.value} />
            {isShowMore && posts.state !== 'fetching' && (
              <button onClick={toggleShowMore} className={s.showMore}>
                Показать ещё
              </button>
            )}
          </div>
        ) : (
          posts.state !== 'fetching' && 'Посты ещё не созданы!'
        )}
        {posts.state === 'fetching' && (
          <div className={s.loaderContainer}>
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}
