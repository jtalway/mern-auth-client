import React from 'react';
import Layout from './core/Layout';

const App = () => {
  return (
    <Layout>
      <div className="col-md-6 offset-md-3 text-center">
        <h1 className="p-5"> ReactJS Node.js MongoDB Authentication Boilerplate</h1>
        <h2> MERN Stack</h2>
        <hr />
        <p className="lead">
          MERN stack login register system with account activation, forgot password,
          reset password, login with facebook and google as well as private and protected
          routes for authenticated user and users with the role of admin.
        </p>
        <hr />
        <h6>GitHub links</h6>
        <p>
        <a className="nav-link" href="https://github.com/jtalway/mern-auth-client">Client</a>
        <a className="nav-link" href="https://github.com/jtalway/mern-auth-api">API</a>
        </p>
      </div>
    </Layout>
  );
};

export default App;
