import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state] = useState(false);
  const [user, setUser] = useState();



  const navigate=useNavigate()

  const login = async (email,pass) => {
    try {
        await signInWithEmailAndPassword(auth, email, pass);
        // localStorage.setItem("user", email);
        navigate('/chat')
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
    <AppContext.Provider value={{ user,state, login }}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppContext, AppProvider };