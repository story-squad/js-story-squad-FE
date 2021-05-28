import { SmileFilled } from '@ant-design/icons';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

function ChildLoadingComponent(props) {
  const { message } = props;

  return (
    <div className="child-loader center-content">
      <Spin indicator={<SmileFilled className="spinner" spin />} size="large" />
      <span>{message}</span>
    </div>
  );
}

export default ChildLoadingComponent;

ChildLoadingComponent.propTypes = {
  message: PropTypes.string.isRequired,
};
