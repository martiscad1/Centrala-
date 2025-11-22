import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Sun, Moon, Sparkles } from 'lucide-react'; // Am adăugat Sparkles
import { useDarkMode } from '../hooks/useDarkMode';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [theme, toggleTheme] = useDarkMode();
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Autentificare reușită!');
      navigate('/');
    } catch (error) {
      console.error("Eroare de autentificare:", error);
      let errorMessage = 'A apărut o eroare. Te rugăm să încerci din nou.';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-email') {
        errorMessage = 'Utilizatorul nu a fost găsit. Verifică adresa de email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Parolă incorectă. Te rugăm să încerci din nou.';
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
       <button onClick={toggleTheme} className="theme-toggle-btn-login">
        {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h2>Autentificare</h2>
          <div className="input-group">
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Adresă de email"
              required 
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Parolă"
              required 
            />
          </div>
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Se încarcă...' : 
              <>
                <Sparkles size={18} className="auth-btn-icon" />
                Intră în cont
              </>
            }
          </button>
        </form>
      </div>
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Login;
