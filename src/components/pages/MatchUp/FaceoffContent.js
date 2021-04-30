import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import matchup_bolt from '../../../assets/images/match_up_images/matchup_bolt.svg';

import {
  SubmissionViewerModal,
  EmojiFeedback,
  SubmissionViewer,
} from '../../common';
import FaceoffReveal from '../Animations/FaceoffReveal';

const lock = 'https://labs28-b-storysquad.s3.amazonaws.com/lock.svg';

const FaceoffContent = props => {
  const [toggle, setToggle] = useState(false);

  const history = useHistory();

  const revealWinner = event => {
    setToggle(true);
    history.push('/scoreboard', {
      dynamicInfo: props.content,
      backgroundColor: props.backgroundColor,
    });
  };

  return (
    <div className="faceoff content-box dark border padding-0">
      <div className={`grid grid-3-col bg-${props.backgroundColor}`}>
        {props.content && (
          <FaceoffSubDisplay
            custom_date={props.custom_date}
            sub={props.content.Submission1}
            type={props.content.Type}
            feedback={props.content.Emojis1}
            votesNeededToUnlock={props.votesNeededToUnlock}
            mySquad="mySquad"
          />
        )}
        <img src={matchup_bolt} alt="lightning bolt" onClick={revealWinner} />
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
          />
        )}
      </div>
      {props.content && <div className="points">{props.content.Points}</div>}
      {toggle ? (
        <FaceoffReveal
          animationDynamicContent={props.content}
          setToggle={setToggle}
        />
      ) : null}
    </div>
  );
};

const FaceoffSubDisplay = ({ sub, type, feedback, ...props }) => {
  const [modalContent, setModalContent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [locked, setLocked] = useState(true);

  const currentDate = props.custom_date ? props.custom_date : new Date();
  const currentDayOfTheWeek = currentDate.getDay();
  const currentHour = currentDate.getHours();

  const openModal = content => {
    setModalContent(content);
    setShowModal(true);
  };

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

  return (
    <>
      {showModal && (
        <SubmissionViewerModal
          content={modalContent}
          showModal={showModal}
          closeModal={() => setShowModal(false)}
        />
      )}
      <div className="sub">
        <div className="child-info">
          {feedback && feedback.Emoji && (
            <EmojiFeedback emojis={feedback.Emoji} />
          )}
          <img src={sub.AvatarURL} alt="text" />
          <span className="name">{sub.Name}</span>
        </div>
        <SubmissionViewer
          src={type === 'DRAWING' ? sub.ImgURL : sub.Pages[0].PageURL}
          type={type}
          compact={true}
        />
        {/* <div className="submission-preview">
          {!locked ? (
            <img
              className="cursor-pointer"
              src={type === 'DRAWING' ? sub.ImgURL : sub.Pages[0].PageURL}
              alt="text"
              role="button"
              onClick={() =>
                openModal(
                  type === 'DRAWING' ? [{ ImgURL: sub.ImgURL }] : sub.Pages
                )
              }
            />
          ) : (
            <img src={lock} alt="locked" />
          )}
        </div> */}
      </div>
    </>
  );
};

export default FaceoffContent;
