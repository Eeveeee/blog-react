import { getAuth } from '@firebase/auth';
import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { NotificationsContext } from '../../../context/context';
import errors from '../../../global/errors';
import {
  addPostComment,
  getCommentsAmount,
} from '../../../services/CommentsService';
import { Loader } from '../../../shared/Loader/Loader';
import { timestampToDate, timestampToTime } from '../../../utils/time';
import { CommentForm } from '../components/CommentForm/CommentForm';
import { Comments } from '../components/Comments/Comments';
import s from './Post.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { getPost } from '../../../services/PostsService';
import { getUserPublic } from '../../../services/UserService';

export function Post() {
  const auth = getAuth();
  const history = useHistory();
  const [postData, setPostData] = React.useState({
    state: 'fetching',
    value: null,
  });
  const [author, setAuthor] = React.useState(null);
  const { addNotification } = useContext(NotificationsContext);
  const { title, authorId, subtitle, content, images, createdAt } =
    postData.value || {};
  let { id } = useParams();
  useEffect(() => {
    async function fetchData() {
      const post = await getPost(id);
      if (post) {
        setAuthor(await getUserPublic(post.authorId));
        setPostData({ state: 'success', value: { ...post } });
      } else {
        history.push('/posts');
      }
    }
    fetchData().catch((err) => {
      setPostData({ state: 'failure', value: null });
      console.error(err);
      addNotification({
        type: 'error',
        message: 'Произошла ошибка загрузки поста',
      });
    });
  }, [addNotification, history, id]);

  return (
    <div className={s.post}>
      <div className={s.mainBackground}></div>
      <div className={s.container}>
        {postData.state === 'fetching' && <Loader />}
        {postData.state === 'success' && (
          <div className={s.outer}>
            <div className={s.postContent}>
              <button className={s.edit}>Изменить</button>
              <div className={s.main}>
                <div className={s.info}>
                  <Link to={`/profile/${authorId}`} className={s.creator}>
                    {author.username}
                  </Link>
                  <div className={s.createdAt}>
                    {timestampToDate(createdAt)} в {timestampToTime(createdAt)}
                  </div>
                </div>
                <h1 className={s.title}>{title}</h1>
                <h2 className={s.subtitle}>{subtitle}</h2>
              </div>

              <div className={s.content}>{content}</div>
              <div className={s.imagesContainer}>
                {images &&
                  images.map((image, idx) => (
                    <Link
                      key={idx}
                      target="_blank"
                      to={image}
                      className={s.imageWrapper}
                    >
                      <img alt="" className={s.image} src={image} />
                    </Link>
                  ))}
              </div>
            </div>
            <Comments postData={postData.value} />
          </div>
        )}
      </div>
    </div>
  );
}
