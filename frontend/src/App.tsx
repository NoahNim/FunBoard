import './App.css';
import { useEffect } from 'react';
import { Modal } from './components/Modal/modal';
import { useModal } from './features/modal/useModal';
import { LoginForm } from './components/auth/loginForm';
import { getCSRFCookie } from './app/hooks';
import { store } from './app/store';
import { restoreUser } from './features/auth/userSlice';
import { api } from './app/services/authApi';
import { useAppDispatch } from './app/store';
import { LogoutButton } from './components/auth/logoutButton';

function App() {
  const dispatch = useAppDispatch();
  const authToken = getCSRFCookie('token');
  const storedUser = localStorage.getItem('user');

  useEffect(() => {
    if (authToken !== null && storedUser !== null) {
    const parsedUser = JSON.parse(storedUser);
    const res = store.dispatch(api.endpoints.restoreUser.initiate(parsedUser)).unwrap()
    res.then((res) => {
      const user = {user: res.user, token: res.token}
       dispatch(restoreUser(user))
      })
    }
  })


  return (
    <div className="App">
      <LoginForm />
      <LogoutButton />
    </div>
  );
}

export default App;
