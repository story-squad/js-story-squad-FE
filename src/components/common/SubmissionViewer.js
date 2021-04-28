import React, { useState } from 'react';
import zoomIcon from '../../assets/icons/zoom-icon.svg';

const SubmissionViewer = ({ src }) => {
  const [showModal, setShowModal] = useState(true);

  return (
    <div className="submission-viewer">
      <button
        className="submission-button"
        onClick={() => setShowModal(true)}
        style={{ backgroundImage: `url(${src})` }}
      ></button>
      <div className="magnify-icon bg-aqua">
        <img src={zoomIcon} alt="magnifying glass icon" />
      </div>
    </div>
  );
};

export default SubmissionViewer;
