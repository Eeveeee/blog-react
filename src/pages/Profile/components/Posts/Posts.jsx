import React from 'react';
import { Post } from '../Post/Post';
import s from './Posts.module.scss';

export function Posts({ posts }) {
  return (
    <div className={s.posts}>
      {posts.map((post, idx) => (
        <Post key={idx} post={post} />
      ))}
    </div>
  );
}
