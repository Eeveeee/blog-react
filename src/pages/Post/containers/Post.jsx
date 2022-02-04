import { getAuth } from '@firebase/auth';
import classNames from 'classnames';
import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { NotificationsContext } from '../../../context/context';
import { deletePost, getPost } from '../../../services/PostsService';
import { getUserPublic } from '../../../services/UserService';
import { Loader } from '../../../shared/Loader/Loader';
import { timestampToDate, timestampToTime } from '../../../utils/time';
import { Comments } from '../components/Comments/Comments';
import s from './Post.module.scss';

export function Post() {
  const auth = getAuth();
  const history = useHistory();
  const [postData, setPostData] = React.useState({
    state: 'fetching',
    value: null,
  });
  const [author, setAuthor] = React.useState(null);
  const { addNotification } = useContext(NotificationsContext);
  const {
    previewImage,
    title,
    authorId,
    subtitle,
    content,
    images,
    createdAt,
    id,
  } = postData.value || {};
  const queryId = useParams().id;
  useEffect(() => {
    let isAlive = true;
    async function fetchData() {
      const post = await getPost(queryId);
      if (!isAlive) {
        return;
      }
      if (post) {
        history.replace(`/post/${post.id}/${post.transliteration}`);
        setAuthor(await getUserPublic(post.authorId));
        setPostData({
          state: 'success',
          value: { ...post },
        });
      } else {
        history.push('/home');
        return;
      }
    }
    if (postData.state === 'fetching') {
      fetchData().catch((err) => {
        if (!isAlive) {
          return;
        }
        setPostData({ state: 'failure', value: null });
        console.error(err);
        addNotification({
          type: 'error',
          message: 'Произошла ошибка загрузки поста',
        });
      });
    }
    return () => {
      isAlive = false;
    };
  }, [addNotification, history, queryId, postData]);
  function handlePostDelete() {
    const res = window.confirm('Уверены ли вы, что хотите удалить пост?');
    if (!res) return;
    deletePost(postData.value.id)
      .then(() => {
        addNotification({
          type: 'success',
          message: 'Пост успешно удалён',
        });
      })
      .catch((err) => {
        console.error(err);
        addNotification({
          type: 'error',
          message: 'Произошла ошибка удаления поста',
        });
        history.push('/home');
      });
  }
  return (
    <div className={s.post}>
      {postData.state === 'fetching' && <Loader />}
      {postData.state === 'success' && (
        <div className={s.wrapper}>
          <div className={classNames(s.main, { [s.default]: !previewImage })}>
            {authorId === auth.currentUser?.uid && (
              <div className={s.managePost}>
                <button onClick={handlePostDelete} className={s.remove}>
                  Удалить
                </button>
                <Link to={`/post/edit/${id}`} className={s.edit}>
                  Изменить
                </Link>
              </div>
            )}
            {previewImage && (
              <div
                style={{
                  backgroundImage: `url(${previewImage})`,
                }}
                className={s.mainBackground}
              >
                <div className={s.mainBackgroundFilter}></div>
              </div>
            )}
            <div className={classNames(s.container, s.mainContainer)}>
              <div className={s.info}>
                {author ? (
                  <Link to={`/profile/${authorId}`} className={s.creator}>
                    {author.username}
                  </Link>
                ) : (
                  <span to={`/profile/${authorId}`} className={s.creator}>
                    Пользователь удалён
                  </span>
                )}
                <div className={s.createdAt}>
                  {timestampToDate(createdAt)} в {timestampToTime(createdAt)}
                </div>
              </div>
              <h1 className={s.title}>{title}</h1>
              <h2 className={s.subtitle}>{subtitle}</h2>
            </div>
          </div>

          <div className={s.container}>
            <div className={s.content}>{content}</div>
            <div className={s.imagesContainer}>
              {images &&
                images.map((image, idx) => (
                  <div key={idx} className={s.imageWrapper}>
                    <a
                      key={idx}
                      rel="noreferrer nofollow"
                      target="_blank"
                      href={image}
                      className={s.link}
                    >
                      <img alt="" className={s.image} src={image} />
                    </a>
                  </div>
                ))}
            </div>
            <Comments postData={postData.value} />
          </div>
        </div>
      )}
    </div>
  );
}
