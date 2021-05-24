import React from 'react';
import VotingForm from './VotingForm';

const RenderVotingPage = props => {
  return (
    <div className="voting-container">
      {console.log(props)}
      <div className="shaped-shadow-container">
        <div className="content-box dark shaped center-content">
          <h2>Vote for Your Favorite Story</h2>
          <p>
            Click the thumbnail to read each story and
            <br />
            react with emojis.
          </p>
        </div>
      </div>
      <VotingForm faceoffToVote={props.votes} child={props.child} />
    </div>
  );
};
export default RenderVotingPage;
