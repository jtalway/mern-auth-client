import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import { authenticate, isAuth} from './helpers';
import { ToastContainer, toast } from 'react-toastify';
import Google from './Google';
import Facebook from './Facebook';
import 'react-toastify/dist/ReactToastify.min.css';

const Signin = ({ history }) => {
  const [values, setValues] = useState({
    email: 'jtalway@gmail.com',
    password: '',
    buttonText: 'Submit'
  });

  const { email, password, buttonText} = values;

  const handleChange = (name) => (event) => {
    // console.log(event.target.value);
    setValues({...values, [name]: event.target.value});
  };

  const informParent = response => {
    // use authenticate helper method
    authenticate(response, () => {
      // redirect based on role
      isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private');
    });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({...values, buttonText: 'Submitting'});
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/signin`,
      data: { email, password }
    })
    .then(response => {
      console.log('SIGNIN SUCCESS', response);
      // save the response (user, token) localstorage/cookie
      authenticate(response, () => {
        setValues({...values, name: '', email: '', password: '', buttonText: 'Submitted'});
        // toast.success(`Welcome back, ${response.data.user.name}!`);
        isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private');
      });
    })
    .catch(error => {
      console.log('SIGNIN ERROR', error.response.data)
      setValues({...values, buttonText: 'Submit'});
      toast.error(error.response.data.error);
    });
  };

  const signinForm = () => (
    <form>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input onChange={handleChange('email')} value={email} type="email" className="form-control"/>
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input onChange={handleChange('password')} value={password} type="password" className="form-control"/>
      </div>

      <div>
        <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
      </div>

      </form>
    );

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        {isAuth() ? <Redirect to="/" /> : null}
        <h1 className="p-5 text-center">Sign In</h1>
        <Google informParent={informParent}/>
        <Facebook informParent={informParent}/>
        {signinForm()}
        <br/>
        <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">Forgot Password</Link>
      </div>
    </Layout>
  );
};

export default Signin;
