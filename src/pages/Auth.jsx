import { useState } from 'react'

export default function Auth() {
  const [mode, setMode] = useState('login')

  return (
    <div className="min-h-screen flex items-center justify-center p-6 text-white">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-3xl shadow-xl space-y-6">
        <h1 className="text-3xl font-bold text-center">
          {mode === 'login' ? 'Welcome Back' : 'Create Account'}
        </h1>

        {/* FORM */}
        <form className="space-y-4">
          {mode === 'signup' && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded-xl bg-white/10 border border-white/10 text-white"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-xl bg-white/10 border border-white/10 text-white"
          />

          <input
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
