import React from 'react';
import VotingForm from './VotingForm';

const RenderVotingPage = props => {
  return (
    <div className="voting-container">
      {console.log(props)}
      <div className="shaped-shadow-container">
        <div className="content-box dark shaped center-content">
          <h2>Other players’ fates are in your hands!</h2>
          <p>
            Read through each story and vote for your favorite as the winner.
          </p>
        </div>
      </div>
      <VotingForm faceoffToVote={props.votes} child={props.child} />
    </div>
  );
};
export default RenderVotingPage;
