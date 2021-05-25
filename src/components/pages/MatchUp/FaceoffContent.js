import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import matchup_bolt from '../../../assets/images/match_up_images/matchup_bolt.svg';

import {
  EmojiFeedback,
  SubmissionViewer,
  ChildAvatar,
  InfoButton,
} from '../../common';
import FaceoffReveal from '../Animations/FaceoffReveal';

const FaceoffContent = props => {
  const [toggle, setToggle] = useState(false);

  const history = useHistory();

  const revealWinner = () => {
    setToggle(true);
    history.push('/scoreboard/#big-reveal', {
      dynamicInfo: props.content,
      backgroundColor: props.backgroundColor,
    });
  };

  return (
    <div className="faceoff content-box dark border-dark padding-0">
      <div className={`grid grid-3-col bg-${props.backgroundColor}`}>
        {props.content && (
          <FaceoffSubDisplay
            custom_date={props.custom_date}
            sub={props.content.Submission1}
            type={props.content.Type}
            feedback={props.content.Emojis1}
            votesNeededToUnlock={props.votesNeededToUnlock}
            mySquad="mySquad"
            handleVote={props.handleVote}
          />
        )}
        <img
          className="bolt-img"
          src={matchup_bolt}
          alt="lightning bolt"
          onClick={revealWinner}
        />
        {props.content && (
          <FaceoffSubDisplay
            custom_date={props.custom_date}
            sub={props.content.Submission2}
            type={props.content.Type}
            feedback={props.content.Emojis2}
            votesNeededToUnlock={props.votesNeededToUnlock}
            votesRemaining={props.votesRemaining}
            dayNeededToUnlock={props.dayNeededToUnlock}
            hourNeededToUnlock={props.hourNeededToUnlock}
            handleVote={props.handleVote}
          />
        )}
      </div>
      <div className="center-content center-content-flex points">
        {props.content && (
          <p className="text-light">
            {props.content.Points} points at stake
            <InfoButton setInfoModalVisible={props.setInfoModalVisible} />
          </p>
        )}
      </div>
      {toggle ? (
        <FaceoffReveal
          animationDynamicContent={props.content}
          setToggle={setToggle}
        />
      ) : null}
    </div>
  );
};

const FaceoffSubDisplay = ({ sub, type, feedback, handleVote, ...props }) => {
  const [locked, setLocked] = useState(true);
  const [canVote, setCanVote] = useState(false);

  const currentDate = props.custom_date ? props.custom_date : new Date();
  const currentDayOfTheWeek = currentDate.getDay();
  const currentHour = currentDate.getHours();

  useEffect(() => {
    if (props.mySquad) {
      setLocked(false);
    }
    if (
      props.votesNeededToUnlock &&
      props.votesNeededToUnlock >= props.votesRemaining &&
      !props.dayNeededToUnlock
    ) {
      setLocked(false);
    }
    if (
      props.votesNeededToUnlock &&
      props.votesNeededToUnlock >= props.votesRemaining &&
      currentDayOfTheWeek >= props.dayNeededToUnlock &&
      currentHour >= props.hourNeededToUnlock
    ) {
      setLocked(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // determine if the current opponent submission should be clicked to start vote
  useEffect(() => {
    if (props.votesNeededToUnlock + 1 === props.votesRemaining) {
      setCanVote(true);
    } else {
      setCanVote(false);
    }
  }, [props.votesRemaining, props.votesNeededToUnlock]);

  return (
    <div className="faceoff-sub">
      {feedback && feedback.Emoji && <EmojiFeedback emojis={feedback.Emoji} />}
      <ChildAvatar src={sub.AvatarURL} name={sub.Name} />
      <SubmissionViewer
        src={type === 'DRAWING' ? sub.ImgURL : sub.Pages[0].PageURL}
        submissionType={type}
        compact={true}
        locked={locked}
        canVote={canVote}
        handleVote={handleVote}
        modalButtonText={'Back to Matchup'}
      />
    </div>
  );
};

export default FaceoffContent;
