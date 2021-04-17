import React from 'react';
import { Row, Col } from 'antd';
import Avatar from './Avatar';
import SubmissionModal from './SubmissionModal';

const ChildRow = ({ child, childNum, points, updatePoints, bgVariable }) => {
  return (
    <Row className="portfolio-row d-flex h-100">
      <Col
        className="avatar-container d-flex justify-center align-center"
        span={4}
      >
        <Avatar avatarUrl={child.AvatarURL} />
      </Col>
      <Col
        className={`d-flex justify-space-evenly align-center background-${bgVariable} thick-outline h-100`}
        span={20}
      >
        <SubmissionModal
          updatePoints={updatePoints}
          imgUrl={child.ImgURL}
          points={points}
          // openModal={openModal}
          submissionType={'illustration'}
          childNum={childNum}
        />
        <SubmissionModal
          updatePoints={updatePoints}
          imgUrl={child.Pages[0].PageURL}
          points={points}
          // openModal={openModal}
          submissionType={'story'}
          childNum={childNum}
        />
      </Col>
    </Row>
  );
};

export default ChildRow;
