import React from 'react';
import Avatar from './Avatar';
import PointShareSubmission from './PointShareSubmission';

const ChildRow = ({
  child,
  childNum,
  points,
  updatePoints,
  onOpenSubmissionModal,
}) => {
  return (
    <div className="point-share-child-row content-box dark">
      <div className="avatar-container">
        <Avatar avatarUrl={child.AvatarURL} />
        <p className="text-light font-display">{child.ChildName}</p>
      </div>
      <PointShareSubmission
        updatePoints={updatePoints}
        imgUrl={child.ImgURL}
        points={points}
        submissionType={'illustration'}
        childNum={childNum}
        onOpenSubmissionModal={onOpenSubmissionModal}
      />
      <PointShareSubmission
        updatePoints={updatePoints}
        imgUrl={child.Pages[0].PageURL}
        points={points}
        submissionType={'story'}
        childNum={childNum}
        onOpenSubmissionModal={onOpenSubmissionModal}
      />
    </div>
  );
};

export default ChildRow;
