import React from 'react';
import { InputNumber } from 'antd';
import { SubmissionViewer } from '../../common';

// submission header text based on submission type
const submissionTypeText = submissionType => {
  return submissionType === 'story' ? 'story' : 'drawing';
};

const PointShareSubmission = ({
  openModal,
  imgUrl,
  points,
  updatePoints,
  childNum,
  submissionType,
}) => {
  return (
    <div className="point-share-submission">
      <p className="font-display text-light">
        {submissionTypeText(submissionType)}
      </p>
      <SubmissionViewer src={imgUrl} />
      <InputNumber
        value={points[childNum][submissionType]}
        type={'number'}
        max={70}
        min={10}
        step={5}
        onChange={value => updatePoints(childNum, submissionType, value)}
      />
    </div>
  );
};

export default PointShareSubmission;
