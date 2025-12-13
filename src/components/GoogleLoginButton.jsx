import React from 'react'
import { supabase } from '../services/supabase'

export default function GoogleLoginButton() {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    })

    if (error) {
      console.error(error)
      alert('Erro ao iniciar login com Google: ' + error.message)
    }
  }

  return (
    <button 
      onClick={handleGoogleLogin}
      style={{
        background: '#fff',
        padding: '10px 16px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        fontSize: '16px'
      }}
    >
      <img 
        src="https://www.google.com/favicon.ico" 
        alt="Google" 
        style={{ width: 18, height: 18 }}
      />
      Entrar com Google
    </button>
  )
}
