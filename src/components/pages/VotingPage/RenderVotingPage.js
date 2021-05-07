import React, { useState } from 'react';
import { VotingForm, EmojiPicker, SubmissionViewer } from '../../common';

const RenderVotingPage = props => {
  const [subEmojis1, setSubEmojis1] = useState('');
  const [subEmojis2, setSubEmojis2] = useState('');

  return (
    <div className="voting-container">
      <div className="submissions">
        <div className="submission content-box">
          <SubmissionViewer src={props.votes.Submission1.ImgURL} />
        </div>
        <div className="submission content-box">
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
