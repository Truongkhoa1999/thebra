// utils

// style
import { useDispatch } from 'react-redux'
import { handleSignIn } from '../../util/login/handleSignIn'
import './style/signinform.scss'
import { AppDispatch } from '../../redux/store'
import { useNavigate } from 'react-router-dom'
export const SigninForm = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    
        const formElements = event.currentTarget as HTMLFormElement
        const { username, password } = formElements.elements as unknown as {
          username: { value: string }
          password: { value: string }
        }
      dispatch(handleSignIn(username.value, password.value, navigate)    ) 
      }
    return (
        <div className='form_container'>
            <h1>Login</h1>
            <form  onSubmit={handleSubmit}>
                <div className='input_container'>
                <div>
                    <label htmlFor="username">Email</label>
                    <input type="username" id="username" name="username" placeholder='username'/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder='password' />
                </div>
                </div>
      
                <div className='submit_container'>
                <button className=' button1 login_button' type="submit" >Login</button>
                <button onClick={() => {navigate("/signup")}}  className=' button1 newaccount_button'>create an account</button>
                     </div>
            </form>
        </div>
    )
}