import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ChangePassword.css'; // Continuăm să importăm acest fișier pentru stilurile specifice

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword !== confirmPassword) {
      toast.error('Parolele noi nu se potrivesc!');
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
        toast.error('Noua parolă trebuie să aibă cel puțin 6 caractere!');
        setLoading(false);
        return;
    }

    const user = auth.currentUser;
    if (!user) {
        toast.error('Utilizatorul nu este autentificat.');
        setLoading(false);
        return;
    }

    const credential = EmailAuthProvider.credential(user.email, oldPassword);

    try {
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      toast.success('Parola a fost schimbată cu succes!');
      setTimeout(() => navigate('/'), 2000); 
    } catch (error) {
        console.error('Eroare la schimbarea parolei:', error);
        if (error.code === 'auth/wrong-password') {
            toast.error('Parola veche este incorectă.');
        } else {
            toast.error('A apărut o eroare. Încearcă din nou.');
        }
    } finally {
      setLoading(false);
    }
  };

  return (
    // Am schimbat numele claselor pentru a refolosi stilurile de la Login
    <div className="login-page-container">
        <div className="login-container">
            <form onSubmit={handlePasswordChange} className="login-form">
                <h2>Schimbă Parola</h2>
                <div className="input-group">
                    <input 
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="Parola veche"
                        required
                    />
                </div>
                <div className="input-group">
                    <input 
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Parola nouă"
                        required
                    />
                </div>
                <div className="input-group">
                    <input 
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirmă parola nouă"
                        required
                    />
                </div>
                <div className="button-group">
                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? 'Se procesează...' : 'Schimbă Parola'}
                    </button>
                    <button type="button" className="auth-btn" onClick={() => navigate('/')}>
                        Anulează
                    </button>
                </div>
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

export default ChangePassword;
