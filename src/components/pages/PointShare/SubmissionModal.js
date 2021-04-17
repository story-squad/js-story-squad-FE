import React from 'react';
import { InputNumber } from 'antd';

const SubmissionModal = ({
  openModal,
  imgUrl,
  points,
  updatePoints,
  childNum,
  submissionType,
}) => {
  return (
    <div className="submission-modal d-flex flex-col no-wrap align-center">
      <img
        className="submission cursor-pointer"
        src={imgUrl}
        alt="Submission"
        onClick={() => openModal([{ ImgURL: imgUrl }])}
      />
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

export default SubmissionModal;
