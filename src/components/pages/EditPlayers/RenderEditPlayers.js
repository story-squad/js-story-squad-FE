import React from 'react';

import { Layout, Typography } from 'antd';

import ParentDashboardBack from '../../common/ParentDashboardBack';
import ChildForm from '../../common/ChildForm';

const { Title } = Typography;

const EditPlayers = props => {
  return (
    <Layout className="edit-players">
      <Layout className="content">
        <div className="top-section">
          <ParentDashboardBack />
          <Title className="title" level={2}>
            Edit Players
          </Title>
        </div>
        <Layout className="children">
          {props.parent.children.slice(0, 2).map(child => (
            <ChildForm {...props} key={child.ID} {...child} />
          ))}
        </Layout>
      </Layout>
    </Layout>
  );
};

export default EditPlayers;
