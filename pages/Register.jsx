import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { user, register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const validateForm = () => {
    const validationErrors = {};

    if (!fullName.trim()) {
      validationErrors.fullName = 'Full name is required.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      validationErrors.email = 'Enter a valid email address.';
    }

    if (password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters.';
    }

    if (confirmPassword !== password) {
      validationErrors.confirmPassword = 'Passwords must match.';
    }

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    setFormError('');

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    const result = await register({ name: fullName, email, password });
    setIsLoading(false);

    if (!result.success) {
      setFormError(result.message);
      return;
    }

    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-slate-900 border border-slate-800 p-10 rounded-3xl shadow-2xl shadow-slate-950/30">
        <div className="text-center">
          <h2 className="text-3xl font-serif font-bold text-white">Create your account</h2>
          <p className="mt-3 text-sm text-slate-400">
            Register to save your favorites and complete checkout faster.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="space-y-5">
            <div>
              <label htmlFor="full-name" className="block text-sm font-medium text-slate-300">
                Full Name
              </label>
              <input
                id="full-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-600"
                placeholder="John Doe"
              />
              {errors.fullName && <p className="mt-2 text-sm text-red-400">{errors.fullName}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-600"
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-600"
                placeholder="Enter password"
              />
              {errors.password && <p className="mt-2 text-sm text-red-400">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-300">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-600"
                placeholder="Re-enter password"
              />
              {errors.confirmPassword && <p className="mt-2 text-sm text-red-400">{errors.confirmPassword}</p>}
            </div>
          </div>

          {formError && <p className="text-sm text-red-400">{formError}</p>}

          <button
            type="submit"
            className="w-full rounded-2xl bg-slate-100 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 hover:bg-slate-200 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-slate-400">
          Already have account?{' '}
          <Link to="/login" className="font-semibold text-white hover:text-slate-200">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
