
'use client';

import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/userSlice';
import { useRouter ,useSearchParams} from 'next/navigation';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (event:FormEvent) => {
    event.preventDefault();
    const userData = { email, password };
  
    // dispatch(setUser(userData));
    const newUser = { email, password };
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));


    router.push('/login');
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', marginTop:'200px',border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
  <h1 style={{ textAlign: 'center' }}>Signup</h1>
  <form onSubmit={handleSubmit}>
    <div style={{ marginBottom: '15px' }}>
      <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
      <input
        style={{ width: '100%', padding: '10px', fontSize: '16px',color:'black', borderRadius: '3px', border: '1px solid #ccc' }}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>
    <div style={{ marginBottom: '15px' }}>
      <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
      <input
        style={{ width: '100%', padding: '10px', fontSize: '16px',color:'black', borderRadius: '3px', border: '1px solid #ccc' }}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>
    <button style={{ width: '100%', padding: '10px ',marginBottom:'10px', fontSize: '16px', borderRadius: '3px', backgroundColor: ' rgb(155, 135, 21)', color: '#fff', border: 'none' }} type="submit">Submit</button>
    <p>Already have account?<a href={'/login'} style={{color:'  rgb(155, 135, 21)'}}>login</a></p>
  </form>
</div>

  );
};

export default Signup;
