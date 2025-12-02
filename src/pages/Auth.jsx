import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Auth() {
  const [mode, setMode] = useState('login')
  const { login, register } = useAuth()

  return (
    <div className="min-h-screen flex items-center justify-center p-6 text-white">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-3xl shadow-xl space-y-6">
        <h1 className="text-3xl font-bold text-center">
          {mode === 'login' ? 'Welcome Back' : 'Create Account'}
        </h1>

        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault()

            const email = e.target.email.value
            const password = e.target.password.value
            const name = e.target.name?.value

            try {
              if (mode === 'login') {
                await login({ email, password })
              } else {
                await register({ name, email, password })
              }
              window.location.href = '/'
            } catch (err) {
              alert('Authentication failed')
            }
          }}
        >
          {mode === 'signup' && (
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded-xl bg-white/10 border border-white/10 text-white"
            />
          )}

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-xl bg-white/10 border border-white/10 text-white"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-xl bg-white/10 border border-white/10 text-white"
          />

          <button
            type="submit"
            className="w-full p-3 rounded-xl bg-[#A020F0]/80 hover:bg-[#A020F0] transition text-white font-semibold"
          >
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>

        {/* TOGGLE */}
        <p className="text-center text-white/80">
          {mode === 'login' ? (
            <span>
              Don't have an account?{' '}
              <button
                className="text-[#A020F0] font-semibold"
                onClick={() => setMode('signup')}
              >
                Sign Up
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button
                className="text-[#A020F0] font-semibold"
                onClick={() => setMode('login')}
              >
                Login
              </button>
            </span>
          )}
        </p>
      </div>
    </div>
  )
}
