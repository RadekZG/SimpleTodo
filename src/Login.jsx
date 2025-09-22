import './style.css'
import { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import supabase from "./helper/supabaseClient";
import App from './App';
import { LoginForm } from './components/LoginForm';

export default function Login() {
    const [session, setSession] = useState(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
        })

        const {
        data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
        })

        return () => subscription.unsubscribe();
    }, [])

    if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <LoginForm onLogin={(sess) => setSession(sess)} />
      </div>
    );
  }

  return <App user={session.user} />;
}