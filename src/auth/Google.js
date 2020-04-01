import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

// destructure props
const Google = ({informParent = f => f}) => {
  const responseGoogle = (response) => {
    // request backend
    console.log(response.tokenId);
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/google-login`,
      data: {idToken: response.tokenId}
    })
    // pass to auth helpers to save userinfo in localstorage and cookie
    .then(response => {
      console.log('GOOGLE SIGN IN SUCCESS', response);
      // inform parent component
      informParent(response);
    })
    // catch errors
    .catch(error => {
      console.log('GOOGLE SIGN IN ERROR', error.response);
    });
  };

  return (
    <div className="pb-3">
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        render={renderProps => (
          <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="btn btn-danger btn-lg btn-block">
            <i className="fab fa-google pr-2"></i> Sign in with Google
          </button>
        )}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  )
};

export default Google;
