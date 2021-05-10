import React, { useState, useEffect } from 'react';
import { SubmissionViewer } from '../../common';

const VotingSubmission = ({
  submissionId,
  selectedValue,
  setSelectedValue,
  imgSrc,
  submissionType,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(submissionId === selectedValue);
  }, [submissionId, selectedValue]);

  return (
    <div
      className={`submission content-box center-content dark ${
        isSelected && 'selected'
      }`}
    >
      <p className="font-display">{submissionType} 2</p>
      <SubmissionViewer src={imgSrc} />
      <button
        className={`secondary full-width text-dark ${
          isSelected && 'font-display'
        }`}
        onClick={() => setSelectedValue(submissionId)}
      >
        {isSelected ? '✓ Selected' : 'Select'}
      </button>
    </div>
  );
};

export default VotingSubmission;
