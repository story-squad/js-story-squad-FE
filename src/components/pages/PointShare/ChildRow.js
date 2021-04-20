import React from 'react';
import { Row, Col } from 'antd';
import Avatar from './Avatar';
import SubmissionModal from './SubmissionModal';

const ChildRow = ({
  child,
  childNum,
  points,
  updatePoints,
  bgVariable,
  openModal,
}) => {
  return (
    <Row className="portfolio-row h-100 w-100 d-flex">
      <Col
        className="avatar-container w-100 h-100 d-flex justify-center align-center"
        xl={4}
        lg={4}
        md={24}
        sm={24}
        xs={24}
      >
        <Avatar avatarUrl={child.AvatarURL} />
      </Col>
      <Col
        lg={20}
        md={24}
        className={`background-${bgVariable} submissions-row d-flex justify-center align-center w-100`}
      >
        <Row className="d-flex justify-space-around align-center w-100">
          <Col
            lg={12}
            md={12}
            sm={24}
            xs={24}
            className="d-flex justify-center align-centers"
          >
            <SubmissionModal
              updatePoints={updatePoints}
              imgUrl={child.ImgURL}
              points={points}
              openModal={openModal}
              submissionType={'illustration'}
              childNum={childNum}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <SubmissionModal
              updatePoints={updatePoints}
              imgUrl={child.Pages[0].PageURL}
              points={points}
              openModal={openModal}
              submissionType={'story'}
              childNum={childNum}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ChildRow;
