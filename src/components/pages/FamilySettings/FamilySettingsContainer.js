import React, { useState, useEffect, useMemo } from 'react';
import { useOktaAuth } from '@okta/okta-react';

import RenderFamilySettings from './RenderFamilySettings';

function FamilySettingsContainer({ LoadingComponent }) {
  // augment "oktaAuth" to behave like "authService"
  const { authState, oktaAuth } = useOktaAuth();
  oktaAuth.getUser = oktaAuth.token.getUserInfo;
  oktaAuth.logout = oktaAuth.signOut;
  oktaAuth.isAuthenticated = authState.isAuthenticated;
  const authService = oktaAuth;
  // end augmentation

  const [userInfo, setUserInfo] = useState(null);
  // eslint-disable-next-line
  const [memoAuthService] = useMemo(() => [authService], []);

  useEffect(() => {
    let isSubscribed = true;

    memoAuthService
      .getUser()
      .then(info => {
        // if user is authenticated we can use the authService to snag some user info.
        // isSubscribed is a boolean toggle that we're using to clean up our useEffect.
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
        <RenderFamilySettings userInfo={userInfo} authService={authService} />
      )}
    </>
  );
}

export default FamilySettingsContainer;
