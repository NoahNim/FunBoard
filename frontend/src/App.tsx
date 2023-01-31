import './App.css';
import { Modal } from './components/Modal/modal';
import { useModal } from './features/modal/useModal';
import { LoginForm } from './components/auth/loginForm';
import { useRestoreQuery, useRestoreUserMutation } from './app/services/authApi';
import { useEffect } from 'react';
import { restoreUser } from './features/auth/userSlice';
import { useAppDispatch } from './app/store';
import { getCSRFCookie } from './app/hooks';

function App() {
  useRestoreQuery('/')
  const [restoreUser, {isLoading}] = useRestoreUserMutation()
  const dispatch = useAppDispatch()

  const getRestoredUser = async () => {
    try {
      const storedUser = localStorage.getItem('user')
      if (storedUser !== null) {
        const user = JSON.parse(storedUser)

        const res = await restoreUser(user).unwrap()
        const resUser = {user: res.user}
        // dispatch(restoreUser(resUser))
      }

    } catch (error) {

    }
  }


  return (
    <div className="App">
      <LoginForm />
    </div>
  );
}

export default App;
