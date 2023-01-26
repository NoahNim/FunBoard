import './App.css';
import { Modal } from './components/Modal/modal';
import { useModal } from './features/modal/useModal';
import { LoginForm } from './components/auth/loginForm';

function App() {
  return (
    <div className="App">
      <LoginForm />
    </div>
  );
}

export default App;
