
'use client';

import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/userSlice';
import { useRouter,useSearchParams } from 'next/navigation';
import { useEffect } from 'react';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<{ email: string; password: string }[]>([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/post';

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    useEffect(() => {
        // Ensure this runs only on the client side
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        setUsers(storedUsers);
      }, []);
    

    const user = users.find((user: { email: string; password: string }) => user.email === email && user.password === password);
    //   console.log("users",users)
    if (user) {
      dispatch(setUser(user));
      router.push(redirect);
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', marginTop:'200px',border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
  <h1 style={{ textAlign: 'center' ,fontWeight:'bolder'}}>Login</h1>
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
    {error && <p style={{ color: 'red' }}>{error}</p>}
    <button style={{ width: '100%', padding: '10px ',marginBottom:'10px', fontSize: '16px', borderRadius: '3px', backgroundColor: '  rgb(155, 135, 21)', color: '#fff', border: 'none' }} type="submit">Submit</button>
    <p>New User?<a href="/signup" style={{color:' rgb(155, 135, 21)'}}>signup first</a></p>
  </form>
</div>

  );
};

export default Login;
