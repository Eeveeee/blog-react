import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { useEffect, useState } from 'react';
/**
 *
 * @returns {{
 * state:'init'|'unauth';
 * user:null
 * } | {
 * state:'auth';
 * user:import('firebase/auth').User
 * }}
 */
export function useAuthState() {
  const [authState, setAuthState] = useState({ state: 'init', user: null });
  useEffect(() => {
    const auth = getAuth();

    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthState({
          state: 'auth',
          user: user,
        });
      } else {
        setAuthState({
          state: 'unauth',
          user: null,
        });
      }
    });
  }, []);
  return authState;
}
