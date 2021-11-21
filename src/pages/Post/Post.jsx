import React, { useEffect, useState } from 'react';
import s from './Post.module.scss';
import { Loader } from '../../shared/Loader/Loader';
import { getAllPosts, getPost, getUserPublic } from '../../services/DbService';
import { dateFromMs, timeFromMs } from '../../utils/time';
import { Link } from 'react-router-dom';
import { Redirect, useHistory, useParams, useRouteMatch } from 'react-router';
import { removeFromStorage } from '../../services/StorageService';

export function Post() {
  const history = useHistory();
  const [loading, setLoading] = React.useState(true);
  const [postData, setPostData] = React.useState({});
  const [author, setAuthor] = React.useState({});
  const [edit, setEdit] = React.useState(false);
  let { id } = useParams();

  useEffect(async () => {
    const post = await getPost(id);
    if (post) {
      setPostData(post);
      setAuthor(await getUserPublic(post.author));
      setLoading(false);
      console.log(postData);
    } else {
      history.push('/posts');
      setPostData(false);
    }
  }, []);
  const { title, subtitle, content, images, uid, createdAt } = postData;
  const date = dateFromMs(createdAt);
  const time = timeFromMs(createdAt);

  return (
    <div className={s.post}>
      <div className={s.mainBackground}></div>
      <div className={s.container}>
        {loading ? (
          <Loader />
        ) : (
          <div className={s.outer}>
            <button className={s.edit}>
              {edit ? 'Сохранить изменения' : 'Изменить'}
            </button>
            <div className={s.main}>
              <div className={s.info}>
                <Link to={`/profile/${author.uid}`} className={s.creator}>
                  {author.username}
                </Link>
                <div className={s.createdAt}>
                  {date} в {time}
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
                    <img className={s.image} src={image} />
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
