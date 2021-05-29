import React from 'react';
import { Layout, Typography, Card } from 'antd';
import { Link } from 'react-router-dom';
import ParentDashPlaceholder from '../../common/ParentDashPlaceholder';
import { PlusCircleFilled } from '@ant-design/icons';

const { Title } = Typography;

const ParentDashboard = props => {
  return (
    <>
      <Layout className="newparent-dashboard">
        <ParentDashPlaceholder />
      </Layout>
    </>
  );
};

export default ParentDashboard;
