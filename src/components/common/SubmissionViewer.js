import React from 'react';
import zoomIcon from '../../assets/icons/zoom-icon.svg';
import lockIcon from '../../assets/icons/lock.svg';
import { CloseOutlined } from '@ant-design/icons';
import { toCapitalized } from '../../utils/helpers';

/* The SubmissionViewer component displays a preview of the submission image in a
 ** button that can be clicked to open a modal. The component has two views: normal
 ** and compact. The normal view can be used anywhere, whereas the compact view is meant
 ** to be used on the match-up page, and has extra styling and functionality
 **
 ** Props:
 ** src (string) - the img src
 ** compact (boolean) - display the component in compact view
 ** Compact view requires the following props:
 ** submissionType (string) - the text displayed of the submission type
 ** locked (boolean) - whether the submission is locked for viewing
 ** canVote (boolean) - whether the button 'Vote to unlock' is rendered and can be clicked
 ** handleVote (function) - the callback function used to start the voting process
 */

export const SubmissionViewer = ({
  src,
  compact = false,
  submissionType,
  locked = false,
  canVote = false,
  handleVote,
  onOpenSubmissionModal,
}) => {
  // remove cursor: not-allowed on background button when canVote === true
  const styleCursor = () => {
    return canVote ? { cursor: 'default' } : null;
  };

  return (
    <div className="submission-viewer-button-container">
      {/* large lock icon when user can't view or vote (compact view) */}
      {locked && !canVote && (
        <img className="disabled-lock-icon" src={lockIcon} alt="lock icon" />
      )}
      {/* vote button (compact view) */}
      {locked && canVote && (
        <button className="submission-viewer-vote" onClick={handleVote}>
          <img className="vote-lock-icon" src={lockIcon} alt="lock icon" />
          <span>Vote to unlock</span>
        </button>
      )}
      {/* submission viewer button (all views) */}
      <button
        className={`submission-viewer-button ${compact ? 'compact' : ''}`}
        style={styleCursor()}
        onClick={() => onOpenSubmissionModal(locked, src)}
        disabled={locked}
      >
        {/* submission preview img (all views) */}
        <div
          className="submission-img"
          style={{ backgroundImage: `url(${src})` }}
        ></div>
        {/* magnify icon (all views) */}
        <div className="magnify-icon">
          <img src={zoomIcon} alt="magnifying glass icon" />
          {/* submission type text (compact view) */}
          {compact && <p>{toCapitalized(submissionType)}</p>}
        </div>
      </button>
    </div>
  );
};

export const SubmissionModal = ({ isModalVisible, onClose, src }) => {
  return (
    <div
      className={`submission-modal-wrapper center-content-flex popup-animated ${
        isModalVisible && 'showing'
      }`}
    >
      <div className="submission-modal-wrapper__top-bar">
        <button className="close-btn" onClick={onClose}>
          Close
          <CloseOutlined />
        </button>
      </div>
      <div className="submission-modal-wrapper__content center-content-flex">
        <img src={src} alt="submission" />
      </div>
      <div className="submission-modal-wrapper__bottom-bar flex--column center-content-flex">
        <div>
          <h4 className="atma">How do you feel about this story?</h4>
          <h4 className="atma">Express it with emojis!</h4>
        </div>
        <div>
          <button className="flex align-center" onClick={onClose}>
            Back to voting
          </button>
        </div>
      </div>
    </div>
  );
};
