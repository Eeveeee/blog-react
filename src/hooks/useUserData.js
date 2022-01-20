import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { getUserPublic } from '../services/UserService';
import { useAuthState } from './useAuthState';
/**
 *
 * @returns {{
 * value:'fetching';
 * data:null
 * } | {
 * value:'success';
 * data:{}
 * } | {
 * value:'failure';
 * data:Error
 * }}
 *
 */
export function useUserData() {
  const [state, setState] = useState({ value: 'fetching', data: null });
  const auth = useAuthState();
  useEffect(() => {
    if (auth.state === 'auth') {
      async function fetchData() {
        const userData = await getUserPublic(auth.user.uid);
        return userData;
      }
      if (state.value === 'fetching') {
        fetchData()
          .then((res) => {
            if (res) {
              setState({ value: 'success', data: res });
              return;
            }
            setState({ value: 'failure', data: auth.user });
          })
          .catch((err) => {
            console.error(err);
            setState({ value: 'failure', data: false });
          });
      }
    }
  }, [auth, state]);
  useEffect(() => {
    if (auth.state === 'unauth') {
      setState({ value: 'fetching', data: null });
    }
  }, [auth]);
  return state;
}
