import { setToken, setWarning } from '../../redux/actions/getToken';
type userInputProps = {
    username: string,
    password: string,
    lastName: string
    firstName: string,
    phone: string,
    gmail: string,
}

export const handleSignUp = (userInput: userInputProps, navigate: Function) => {
    return async (dispatch: any) => {
        const { username, password, lastName, firstName, phone, gmail } = userInput

        try {
            const url="https://thebrabe.onrender.com/api/v1/customers/signup"

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                    lastName,
                    firstName,
                    phone,
                    gmail
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
