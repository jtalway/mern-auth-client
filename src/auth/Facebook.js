import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import axios from 'axios';

// destructure props
const Facebook = ({informParent = f => f}) => {
  const responseFacebook = (response) => {
    // request backend
    console.log(response.tokenId);
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/facebook-login`,
      data: {userID: response.userID, accessToken: response.accessToken}
    })
    // pass to auth helpers to save userinfo in localstorage and cookie
    .then(response => {
      console.log('FACEBOOK SIGN IN SUCCESS', response);
      // inform parent component
      informParent(response);
    })
    // catch errors
    .catch(error => {
      console.log('FACEBOOK SIGN IN ERROR', error.response);
    });
  };

  return (
    <div className="pb-3">
      <FacebookLogin
        appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
        autoLoad={false}
        callback={responseFacebook}
        render={renderProps => (
          <button onClick={renderProps.onClick} className="btn btn-primary btn-lg btn-block">
            <i className="fab fa-facebook pr-2"></i> Sign in with Facebook
          </button>
        )}
        disableMobileRedirect={true}
      />
    </div>
  )
};

export default Facebook;
