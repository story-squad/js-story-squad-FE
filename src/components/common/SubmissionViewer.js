import React, { useState } from 'react';
import zoomIcon from '../../assets/icons/zoom-icon.svg';

const SubmissionViewer = ({ src }) => {
  const [showModal, setShowModal] = useState(true);

  return (
    <button className="submission-viewer" onClick={() => setShowModal(true)}>
      <div
        className="submission-img"
        style={{ backgroundImage: `url(${src})` }}
      ></div>
      <div className="magnify-icon bg-aqua">
        <img src={zoomIcon} alt="magnifying glass icon" />
      </div>
    </button>
  );
};

export default SubmissionViewer;
