import React, { useState, useEffect, useMemo } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { connect } from 'react-redux';

import { team, child } from '../../../state/actions';
import { getChildTeam } from '../../../api';

import RenderJoinTheSquad from './RenderJoinTheSquad';

const JoinTheSquadContainer = ({ LoadingComponent, setMemberId, setTeamSubmissions, ...props }) => {
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
      .catch(err => {
        isSubscribed = false;
        return setUserInfo(null);
      });
    return () => (isSubscribed = false);
  }, [memoAuthService]);

  /**
   *  Initializes state before rendering RenderJoinTheSquad component,
   *  this means images, necessary state, etc will all be pre-loaded
   */
  useEffect(() => {
    getChildTeam(authState, props.child.id).then(res => {
      setMemberId(res[props.child.id]);
      setTeamSubmissions(res);
    });
  }, [authState, setMemberId, setTeamSubmissions, props.child.id]);

  return (
    <>
      {authState.isAuthenticated && !userInfo && (
        <LoadingComponent message="Loading..." />
      )}
      {authState.isAuthenticated && userInfo && (
        <RenderJoinTheSquad
          {...props}
          userInfo={userInfo}
          authService={authService}
        />
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
    setTeamSubmissions: team.setTeamSubmissions,
    setMemberId: child.setMemberId,
  }
)(JoinTheSquadContainer);
