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
        setSession(session);
        });

        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange(async (_event, session) => {
          setSession(session);

          if (event === "PASSWORD_RECOVERY"){
            const newPassword = prompt("Enter your new password:");
            if (newPassword){
              const {error} = await supabase.auth.updateUser({ password: newPassword });
              if ( error ) alert(error.message);
              else alert("Password updated successfully!");
            };
          };
        });

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