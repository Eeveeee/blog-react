import React from 'react';
import s from './Feed.module.scss';
import { Post } from '../Post/Post';

export function Feed({ posts }) {
  console.log(posts);
  return (
    <div className={s.feed}>
      {posts.map((post) => (
        <Post data={post} key={post.id} />
      ))}
    </div>
  );
}
