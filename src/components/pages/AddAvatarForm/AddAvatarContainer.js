import React, { useState, useEffect, useMemo } from 'react';
import { useOktaAuth } from '@okta/okta-react';

import RenderAddAvatar from './RenderAddAvatar';

const AddAvatarContainer = ({ LoadingComponent }) => {
  // const { authState, authService } = useOktaAuth();
  // augment "oktaAuth" to behave like "authService"
  const { authState, oktaAuth } = useOktaAuth();
  oktaAuth.getUser = oktaAuth.token.getUserInfo;
  oktaAuth.logout = oktaAuth.signOut;
  oktaAuth.isAuthenticated = authState.isAuthenticated;
  const authService = oktaAuth;
  // end augmentation

  const [userInfo, setUserInfo] = useState(null);
  const [memoAuthService] = useMemo(() => [authService], []);

  useEffect(() => {
    let isSubscribed = true;

    memoAuthService
      .getUser()
      .then(info => {
        if (isSubscribed) {
          setUserInfo(info);
        }
      })
      .catch(err => {
        isSubscribed = false;
        return setUserInfo(null);
      });
    return () => (isSubscribed = false);
  }, [memoAuthService]);

  return (
    <>
      {authState.isAuthenticated && !userInfo && (
        <LoadingComponent message="Loading..." />
      )}
      {authState.isAuthenticated && userInfo && (
        <RenderAddAvatar userInfo={userInfo} authService={authService} />
      )}
    </>
  );
};

export default AddAvatarContainer;
