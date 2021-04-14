import React, { useEffect } from 'react';
import { Header } from '../../common';
import { useOktaAuth } from '@okta/okta-react/dist/OktaContext';
import { getChildTeam } from '../../../api';
import { connect } from 'react-redux';
import { child } from '../../../state/actions';
import RenderChild from './RenderChild';

const RenderJoinTheSquad = props => {
  const { authState } = useOktaAuth();

  useEffect(() => {
    getChildTeam(authState, props.child.id).then(res => {
      props.setMemberId(res[props.child.id]);
      props.setTeamSubmissions(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState]);

  return (
    <>
      <Header title="JOIN THE SQUAD" displayMenu={true} />
      <div className="JoinSquadContainer">
        <RenderChild
          child={props.team.child1}
          childNum={1}
          bubbleStyle={'right'}
        />
        <RenderChild
          child={props.team.child2}
          childNum={2}
          bubbleStyle={'left'}
        />
      </div>
    </>
  );
};

export default connect(
  state => ({
    team: state.team,
    child: state.child,
  }),
  {
    setMemberId: child.setMemberId,
  }
)(RenderJoinTheSquad);
