import React from 'react';
import RenderChild from './RenderChild';

const RenderJoinTheSquad = props => {
  return (
    <div className="bg-dark full-page">
      <div className="content-box bg-dark border-light">
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
    </div>
  );
};

export default RenderJoinTheSquad;
