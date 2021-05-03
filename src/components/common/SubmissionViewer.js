import React, { useState } from 'react';
import zoomIcon from '../../assets/icons/zoom-icon.svg';
import lockIcon from '../../assets/icons/lock.svg';
import { toCapitalized } from '../../utils/helpers';

const SubmissionViewer = ({
  src,
  type,
  compact = false,
  locked = false,
  canVote = false,
}) => {
  const [showModal, setShowModal] = useState(true);

  const handleOnClick = () => {
    if (!locked) {
      setShowModal(true);
    }
  };

  return (
    <div className="submission-viewer-button-container">
      {locked && canVote && (
        <button className="submission-viewer-vote">
          <img className="vote-lock-icon" src={lockIcon} alt="lock icon" />
          <span>Vote to unlock</span>
        </button>
      )}
      <button
        className={`submission-viewer-button ${compact ? 'compact' : ''}`}
        onClick={handleOnClick}
        disabled={locked}
      >
        <div
          className="submission-img"
          style={{ backgroundImage: `url(${src})` }}
        ></div>
        <div className="magnify-icon bg-aqua">
          <img src={zoomIcon} alt="magnifying glass icon" />
          {compact && <p>{toCapitalized(type)}</p>}
        </div>
      </button>
    </div>
  );
};

export default SubmissionViewer;
