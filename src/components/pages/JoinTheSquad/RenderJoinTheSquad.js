import React from 'react';
import { Header } from '../../common';
import RenderChild from './RenderChild';

const RenderJoinTheSquad = props => {
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

export default RenderJoinTheSquad;
