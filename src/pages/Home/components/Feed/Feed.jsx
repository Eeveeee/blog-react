import React from 'react';
import s from './Feed.module.scss';
import { Post } from '../Post/Post';

export function Feed({ posts, onPostClick }) {
  return (
    <div className={s.feed}>
      {posts.map((post) => (
        <Post
          onPostClick={onPostClick}
          data={post}
          key={post.postId + Date.now()}
        />
      ))}
    </div>
  );
}
