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
      <Layout>
        <ParentDashPlaceholder />
        <div>
          <ChildCard />
        </div>
      </Layout>
    </>
  );
};

export default ParentDashboard;
