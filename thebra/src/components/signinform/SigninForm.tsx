import './style/signinform.scss'
export const SigninForm = () => {
    return (
        <div className='form_container'>
            <h1>Login</h1>
            <form >
                <div className='input_container'>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder='email'/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" />
                </div>
                </div>
      
                <div className='submit_container'>
                <button className='login_button' type="submit">Login</button>
                <button  className='newaccount_button'>create an account</button>
                     </div>
            </form>
        </div>
    )
}