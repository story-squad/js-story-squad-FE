import React, { useEffect, useState, useMemo } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import PointShare from './RenderPointShare';
import Render2 from './Render2';

const PointShareContainer = ({ LoadingComponent }) => {
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  // eslint-disable-next-line
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
      .catch(error => {
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
        <Render2 userInfo={userInfo} authService={authService} />
      )}
    </>
  );
};

export default PointShareContainer;
