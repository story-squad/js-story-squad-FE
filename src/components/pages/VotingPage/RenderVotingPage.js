import React, { useState } from 'react';
import { VotingForm, EmojiPicker, SubmissionViewer } from '../../common';

const RenderVotingPage = props => {
  const [subEmojis1, setSubEmojis1] = useState('');
  const [subEmojis2, setSubEmojis2] = useState('');

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
      <div className="submissions grid grid-2-col grid-small">
        <div className="submission content-box center-content dark">
          <p className="font-display">{props.votes.Type} 1</p>
          <SubmissionViewer src={props.votes.Submission1.ImgURL} />
        </div>
        <div className="submission content-box center-content dark">
          <p className="font-display">{props.votes.Type} 2</p>
          <SubmissionViewer src={props.votes.Submission2.ImgURL} />
        </div>
      </div>
      <VotingForm
        faceoffToVote={props.votes}
        child={props.child}
        subEmojis={{ subEmojis1, subEmojis2 }}
      />
      {/* <EmojiPicker getChildState={setSubEmojis1} />
      <EmojiPicker getChildState={setSubEmojis2} /> */}
    </div>
  );
};
export default RenderVotingPage;
