import React, { useEffect, useState, useMemo } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import PointShare from './RenderPointShare';
import { team, child } from '../../../state/actions';
import { connect } from 'react-redux';
import { getChildTeam } from '../../../api/index';

const PointShareContainer = ({ LoadingComponent, ...props }) => {
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

  // this initializes state and passes it to the child component, to avoid errors while child/team data is being fetched
  useEffect(() => {
    getChildTeam(authState, props.child.id).then(res => {
      props.setMemberId(res[props.child.id]);
      props.setTeamSubmissions(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState]);

  return (
    <>
      {authState.isAuthenticated && !userInfo && (
        <LoadingComponent message="Loading..." />
      )}
      {authState.isAuthenticated && userInfo && props.child && props.team && (
        <PointShare {...props} userInfo={userInfo} authService={authService} />
      )}
    </>
  );
};

export default connect(
  state => ({
    child: state.child,
    team: state.team,
  }),
  {
    setMemberId: child.setMemberId,
    setTeamSubmissions: team.setTeamSubmissions,
  }
)(PointShareContainer);
