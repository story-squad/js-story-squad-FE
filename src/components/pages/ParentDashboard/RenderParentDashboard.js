import React from 'react';
import { Layout, Typography, Card } from 'antd';
import { Link } from 'react-router-dom';
import ParentDashPlaceholder from '../../common/ParentDashPlaceholder';
import { PlusCircleFilled } from '@ant-design/icons';
import ChildCard from '../../common/ChildCard';

const { Title } = Typography;

const ParentDashboard = props => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <ParentDashPlaceholder />

        <ChildCard />
      </div>
    </>
  );
};

export default ParentDashboard;
