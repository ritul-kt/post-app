"use client";

import {useRouter} from 'next/navigation';
import Link from 'next/link';
import styles from './styles.module.css';
import { useSelector ,useDispatch} from 'react-redux';
 import { RootState } from '@/store';
import {setUser} from '@/store/userSlice';

const HomePage = () => {
   const router = useRouter();
  const user = useSelector((state:RootState) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
   dispatch(setUser({ email: '', password: '' }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <ul>
        {user.email ? (
            <>
              <li>
                <p>Welcome, {user.email}</p>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/signup">Signup/Login</Link>
            </li>
          )}
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/post">Post</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;




