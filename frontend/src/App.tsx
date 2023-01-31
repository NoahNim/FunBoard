import './App.css';
import { Modal } from './components/Modal/modal';
import { useModal } from './features/modal/useModal';
import { LoginForm } from './components/auth/loginForm';
import { useRestoreQuery, useRestoreUserMutation } from './app/services/authApi';
import { useEffect } from 'react';
import { setUser } from './features/auth/userSlice';
import { useAppDispatch } from './app/store';
import { getCSRFCookie } from './app/hooks';

function App() {
  useRestoreQuery('/')
  const [restoreUser, {isLoading}] = useRestoreUserMutation()
  const dispatch = useAppDispatch()

  const getResoredUser = async () => {
    try {
      const storedUser = localStorage.getItem('user')
      const user = JSON.parse(storedUser)

      const res = await restoreUser(user).unwrap()
    } catch (error) {

    }
  }

  useEffect(() => {
    if (user !== undefined) {
      const userObj = 

      dispatch(setUser(userObj))
    }
  })

  return (
    <div className="App">
      <LoginForm />
    </div>
  );
}

export default App;
