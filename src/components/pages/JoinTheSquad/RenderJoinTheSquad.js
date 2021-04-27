import React from 'react';
import { useHistory } from 'react-router';
import RenderChild from './RenderChild';

const RenderJoinTheSquad = props => {
  const { push } = useHistory();

  return (
    <div className="bg-dark full-page">
      <div className="content-box dark border-light">
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
      <div className="center-content">
        <button onClick={() => push('/child/point-share')}>Let's play!</button>
      </div>
    </div>
  );
};

export default RenderJoinTheSquad;
