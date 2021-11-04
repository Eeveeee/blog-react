import React, { useEffect, useState } from 'react';
import s from './Post.module.scss';
import { Loader } from '../../shared/Loader/Loader';
import { getAllPosts, getPost } from '../../services/DbService';
import testImage1 from '../../assets/test/test1.jpg';
import testImage2 from '../../assets/test/test2.jpg';
import { dateFromMs, timeFromMs } from '../../utils/time';
import { Redirect, useHistory, useParams, useRouteMatch } from 'react-router';

export function Post() {
  const history = useHistory();
  const [loading, setLoading] = React.useState(true);
  const [postData, setPostData] = React.useState({});
  let { id } = useParams();
  useEffect(() => {
    getPost(id).then((post) => {
      if (post) {
        setPostData(post);
        setLoading(false);
        console.log(post);
      } else {
        history.push('/posts');
        setPostData(false);
      }
    });
  }, []);

  const { title, subtitle, content, images, creator, createdAt } = postData;
  console.log(images);
  const date = dateFromMs(createdAt);
  const time = timeFromMs(createdAt);
  return (
    <div className={s.post}>
      <div className={s.container}>
        {loading ? (
          <Loader />
        ) : (
          <div className={s.outer}>
            <div className={s.info}>
              <div className={s.creator}>{creator}</div>
              <div className={s.createdAt}>
                {date} в {time}
              </div>
            </div>
            <h1 className={s.title}>{title}</h1>
            <h2 className={s.subtitle}>{subtitle}</h2>
            <div className={s.content}>{content}</div>
            {images
              ? images.map((image, idx) => (
                  <a
                    target="_blank"
                    href={image}
                    key={idx}
                    className={s.imageWrapper}
                  >
                    <img className={s.image} src={image} />
                  </a>
                ))
              : null}
          </div>
        )}
      </div>
    </div>
  );
}
