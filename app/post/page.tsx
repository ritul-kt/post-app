
'use client';

import React, { FormEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, deletePost } from '@/store/postSlice';
import{addCount,deleteCount}from '@/store/countSlice';
import { RootState } from '@/store';
import { calculatePostsPerWeekday } from '@/utils';
import { useRouter } from 'next/navigation';
import { PostData } from '@/postData';

const InputBox = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      dispatch(addPost(inputValue));
      dispatch(addCount({ posted_on:new Date().toDateString()}));
      setInputValue(''); 
    }
  };

  const handleDelete = (post: PostData) => {
    dispatch(deletePost(post.id));
    dispatch(deleteCount({posted_on:post.posted_on}))
  };

  const postList = useSelector((state: RootState) => state.post.posts);
  const reversedPosts = [...postList].reverse();
  const postsPerWeekday = useSelector((state:RootState)=>state.count.postsPerWeekday)

  useEffect(() => {
    if (!user.email) {
      router.push('/login?redirect=/post');
    }
  }, [user, router]);

  return (
    <div>
      <div
        style={{
          maxWidth: '1000px',
          margin: 'auto',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          boxShadow: '0 0 17px rgb(155, 135, 21)',
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <label
            style={{
              display: 'block',
              marginBottom: '5px',
              color: 'rgb(155, 135, 21)',
              fontWeight: 'bold',
            }}
          >
            Enter Your Post:
          </label>
          <input
            style={{ color: 'black', margin: '10px 0px', flex: '1 0 auto' }}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter your message..."
            required
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button type="submit" style={{ color: 'rgb(155, 135, 21)', fontWeight: 'bold' }}>
              Add Post
            </button>
          </div>
        </form>
      </div>

      <div style={{ display: 'flex', marginTop: '20px' }}>
        <div style={{ flex: 1 }}>
          <h2
            style={{
              textAlign: 'center',
              color: 'rgb(155, 135, 21)',
              marginTop: '20px',
              marginBottom:'20px',
              fontWeight: 'bold',
              fontSize: '20px',
            }}
          >
            Recent Posts
          </h2>
          <div style={{ maxWidth: '1000px', margin: 'auto' }}>
            {reversedPosts.slice(0, 1).map((post, index) => (
              <div
                key={index}
                style={{
                  padding: '20px',
                  marginBottom: '20px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  boxShadow: '0 0 17px rgb(155, 135, 21)',
                }}
              >
                <p>{post.text}</p>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  Posted on: {post.posted_on}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                  <button
                    onClick={() => handleDelete(post)}
                    style={{ color: 'rgb(155, 135, 21)' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
              {reversedPosts.slice(1).map((post, index) => (
                <div
                  key={index}
                  style={{
                    padding: '20px',
                    marginBottom: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    boxShadow: '0 0 17px rgb(155, 135, 21)',
                  }}
                >
                  <p>{post.text}</p>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    Posted on: {post.posted_on}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                    <button
                      onClick={() => handleDelete(post)}
                      style={{ color: 'rgb(155, 135, 21)' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <h1
            style={{
              textAlign: 'center',
              color: 'rgb(155, 135, 21)',
              marginTop: '20px',
              marginBottom: '20px',
              fontWeight: 'bold',
              fontSize: '20px',
            }}
          >
            Posts Per Weekday
          </h1>
          <ul>
            {Object.entries(postsPerWeekday).map(([weekday, count]) => (
              <li key={weekday} style={{ textAlign: 'center' }}>
                [{count}] {weekday}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InputBox;
