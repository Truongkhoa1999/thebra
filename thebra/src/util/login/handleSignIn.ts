import { setToken, setWarning } from '../../redux/actions/getToken';

export const handleSignIn = (username: string, password: string, navigate: Function) => {
  return async (dispatch: any) => {
    try {
      const response = await fetch('https://thebrabe.onrender.com/api/v1/customers/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        }),
      });
      const data = await response.json();
      if (response.ok) {
        const { token } = data;
        dispatch(setToken(token));
        localStorage.setItem('jwt', token);
        navigate('/homepage');
      } else {
        console.log('Sign-in failed22:', data.message);
        dispatch(setWarning(true));
      }
    } catch (error) {
      console.log('Sign-in failed:', error);
      dispatch(setWarning(true));
    }
  };
};
