import React, { useState } from 'react';
import zoomIcon from '../../assets/icons/zoom-icon.svg';
import { toCapitalized } from '../../utils/helpers';

const SubmissionViewer = ({ src, type, compact = false }) => {
  const [showModal, setShowModal] = useState(true);

  return (
    <button
      className={`submission-viewer ${compact ? 'compact' : ''}`}
      onClick={() => setShowModal(true)}
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
  );
};

export default SubmissionViewer;
