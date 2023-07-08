import { useDispatch } from 'react-redux';
import './style/signupform.scss';
import { AppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { handleSignUp } from '../../util/signup/handleSignup';

export const SignupForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElements = event.currentTarget.elements as HTMLFormControlsCollection & {
      username: { value: string };
      password: { value: string };
      lastName: { value: string };
      firstName: { value: string };
      phone: { value: string };
      gmail: { value: string };
    };

    const { username, password, lastName, firstName, phone, gmail } = formElements;

    const newUser = {
      username: username.value,
      password: password.value,
      lastName: lastName.value,
      firstName: firstName.value,
      phone: phone.value,
      gmail: gmail.value,
    };
    dispatch(handleSignUp(newUser, navigate)    ) 

  };

  return (
    <div className='form_container'>
      <h1>Create an Account</h1>
      <form onSubmit={handleSubmit}>
        <div className='input_container'>
          <div>
            <label htmlFor='username'>Username</label>
            <input type='text' id='username' name='username' placeholder='Username' required />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' name='password' placeholder='Password' required />
          </div>
          <div>
            <label htmlFor='lastName'>Last Name</label>
            <input type='text' id='lastName' name='lastName' placeholder='Last Name' required />
          </div>
          <div>
            <label htmlFor='firstName'>First Name</label>
            <input type='text' id='firstName' name='firstName' placeholder='First Name' required />
          </div>
          <div>
            <label htmlFor='phone'>Phone</label>
            <input type='tel' id='phone' name='phone' placeholder='Phone' required />
          </div>
          <div>
            <label htmlFor='gmail'>Gmail</label>
            <input type='email' id='gmail' name='gmail' placeholder='Gmail' required />
          </div>
        </div>

        <div className='submit_container'>
          <button className='button2 signup_button' type='submit'>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};
