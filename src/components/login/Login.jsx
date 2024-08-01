import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { auth, provider } from '../../config/firebase';
import Swal from 'sweetalert2';
import './Login.css';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [registroEmail, setRegistroEmail] = useState('');
  const [registroPass, setRegistroPass] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [ setUser] = useState(null);
  const navigate = useNavigate()

  const registro = async () => {
    try {
      await createUserWithEmailAndPassword(auth, registroEmail, registroPass);
      Swal.fire('Success', 'Registration successful!', 'success');
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPass);
      navigate('/chat')
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  // const logout = async () => {
  //   await signOut(auth);
  //   Swal.fire('Success', 'Logout successful!', 'success');
  // };

  const loginGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    

    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  const resetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, loginEmail);
      Swal.fire('Success', 'Password reset email sent!', 'success');
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="container">
      
          <h2>Regístrate</h2>
          <input type="email" placeholder="Email" value={registroEmail} onChange={({ target }) => setRegistroEmail(target.value)} />
          <input type="password" placeholder="Password" value={registroPass} onChange={({ target }) => setRegistroPass(target.value)} />
          <button className="btn btn-success" onClick={registro}>Create Account</button>

          <h2>Inicia Sesión</h2>
          <input type="email" placeholder="Email" value={loginEmail} onChange={({ target }) => setLoginEmail(target.value)} />
          <input type="password" placeholder="Password" value={loginPass} onChange={({ target }) => setLoginPass(target.value)} />
          <button className="btn btn-info" onClick={login}>Login</button>
          <p className="forgot-password" onClick={resetPassword}>Olvidaste tu cuenta?</p>

          <h2>Inicia sesión con Google</h2>
          <button className="btn btn-primary" onClick={loginGoogle}>Google</button>
        
      
    </div>
  );
};

export default Login