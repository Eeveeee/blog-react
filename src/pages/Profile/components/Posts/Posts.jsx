import React, { useEffect, useState } from 'react';
import s from './Posts.module.scss';
import { dateFromMs, timeFromMs } from '../../../../utils/time';
import { Post } from '../Post/Post';

export function Posts({ posts }) {
  return (
    <div className={s.posts}>
      {posts.map((post, idx) => (
        <Post key={idx} post={post} />
      ))}
    </div>
  );
}
