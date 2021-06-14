import React, { useState, useEffect, useMemo } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import RenderParentDashboard from './RenderParentDashboard';
import { connect } from 'react-redux';

function ParentDashboardContainer({ LoadingComponent, ...props }) {

  const [userInfo, setUserInfo] = useState(null);
  // augment "oktaAuth" to behave like "authService"
  const { authState, oktaAuth } = useOktaAuth();
  oktaAuth.getUser = oktaAuth.token.getUserInfo;
  oktaAuth.logout = oktaAuth.signOut;
  oktaAuth.isAuthenticated = authState.isAuthenticated;
  const authService = oktaAuth;
  // end augmentation

  // eslint-disable-next-line 
  const [memoAuthService] = useMemo(() => [authService], []); // memoize the augmented class

  useEffect(() => {
    let isSubscribed = memoAuthService.isAuthenticated;

    // ONBOARDING PHASE
    memoAuthService
      .getUser()
      .then(info => {
        if (isSubscribed) {
          setUserInfo(info);
          console.log('USER INFO', info);
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
        <RenderParentDashboard
          {...props}
          userInfo={userInfo}
          authService={memoAuthService}
        />
      )}
    </>
  );
}

export default connect(
  state => ({
    parent: state.parent,
  }),
  {}
)(ParentDashboardContainer);
