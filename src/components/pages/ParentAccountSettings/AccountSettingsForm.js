import React from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';

function AccoountSettingsForm(props) {
  return (
    <div className="AccountSettingsFormContainer parent-styles">
      <div className="inputsContainerEmailPass">
        <div className="inputContainerEmailPass">
          <MailOutlined className="emailPassIcon" />
          <input
            placeholder="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;caroline@gmail.com"
            disabled="true"
          />
          <button>Change Email</button>
        </div>
        <div className="inputContainerEmailPass">
          <LockOutlined className="emailPassIcon" />
          <input
            placeholder="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• • • • • • • • • • • •"
            disabled="true"
          />
          <button>Change Password</button>
        </div>
      </div>
    </div>
  );
}

export default AccoountSettingsForm;
