import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useHistory } from 'react-router-dom';

import { postVotes, updateChildData } from '../../../api';
import VotingSubmission from './VotingSubmission';

const VotingForm = props => {
  const { push } = useHistory();
  const { authState } = useOktaAuth();
  const { subEmojis1, subEmojis2 } = props.subEmojis;
  const [value, setValue] = useState();

  const handleSubmit = () => {
    const body = {
      Vote: value,
      MemberID: props.child.memberId,
      FaceoffID: props.faceoffToVote.ID,
      VotesCasted: props.faceoffToVote.VotesCasted + 1,
      subEmojis1,
      subEmojis2,
    };

    const child = {
      Name: props.child.name,
      ParentID: props.child.parentId,
      CohortID: props.child.cohortId,
      GradeLevel: props.child.gradeLevel,
      VotesRemaining: props.child.VotesRemaining - 1,
    };

    updateChildData(authState, child, props.child.id);
    postVotes(authState, body).then(res => {
      push('/child/match-up');
    });
  };

  return (
    <>
      <div className="submissions grid grid-2-col grid-small">
        <VotingSubmission
          submissionId={props.faceoffToVote.SubmissionID1}
          selectedValue={value}
          setSelectedValue={setValue}
          imgSrc={props.faceoffToVote.Submission1.ImgURL}
          submissionType={props.faceoffToVote.Type}
        />
        <VotingSubmission
          submissionId={props.faceoffToVote.SubmissionID2}
          selectedValue={value}
          setSelectedValue={setValue}
          imgSrc={props.faceoffToVote.Submission2.ImgURL}
          submissionType={props.faceoffToVote.Type}
        />
      </div>
      <div className="center-content margin-bottom-4">
        <button
          onClick={handleSubmit}
          className="min-width"
          disabled={value === undefined}
        >
          Vote
        </button>
      </div>
    </>
  );
};

export default VotingForm;
