import React from 'react';
import { useHistory } from 'react-router';
import RenderChild from './RenderChild';

const RenderJoinTheSquad = props => {
  const { push } = useHistory();

  return (
    <div className="bg-dark full-page join-squad">
      <div className="content-box">
        <h2 className="text-light">Join Your Squad</h2>
        <RenderChild child={props.team.child1} childNum={1} />
        <RenderChild child={props.team.child2} childNum={2} />
      </div>
      <div className="center-content">
        <button onClick={() => push('/child/point-share')}>Let's play!</button>
      </div>
    </div>
  );
};

export default RenderJoinTheSquad;
