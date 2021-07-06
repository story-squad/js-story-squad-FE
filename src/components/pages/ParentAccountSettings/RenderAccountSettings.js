import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { useOktaAuth } from '@okta/okta-react';
import bc from 'bcryptjs';
import { getProfileData } from '../../../api';
import PinInput from 'react-pin-input';
import AccountSettingsForm from './AccountSettingsForm';

function RenderAccountSettings() {
  const { authState } = useOktaAuth();
  const formRef = useRef(null);
  const [unlock, setUnlock] = useState(true);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState(null);
  const [userInfo, setUserInfo] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  //Grab the parents userInfo so we can validate their information (pin)
  useEffect(() => {
    getProfileData(authState).then(res => {
      res.map(user => {
        if (user.type == 'Parent') {
          setUserInfo(user);
        }
      });
    });
  }, [authState]);

  //These functions handle exiting the modal once it is activated

  const onFinish = () => {
    setUnlock(!unlock);
    setIsModalVisible(!isModalVisible);
  };

  const blurOnFourChars = e => {
    if (e.target.value.length === 4) {
      formRef.current.submit();
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // this function runs once the user has inputted the correct pin.
  //It toggles the opacity and disabled prop of the editFormsAndButtonsContainer
  // allowing the user to see that they can now access the elements to update their account

  let pin;

  return (
    <div className="accountSettingsContainer">
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        // afterClose={() => pin.clear()}
        centered="true"
        width="25vw"
        bodyStyle={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h4>Enter Pin</h4>
        <Form name="verify" onFinish={onFinish} initialValues="">
          <Form.Item
            name="pin"
            validateTrigger="onSubmit"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Incorrect PIN',
              },
              () => ({
                validator(rule, value) {
                  console.log(value, selected.PIN);
                  const x = value === selected.PIN;
                  if (x) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Incorrect PIN');
                },
              }),
            ]}
          >
            <Input
              autoFocus={true}
              type="password"
              className="pin"
              maxLength={4}
              onChange={blurOnFourChars}
              autoComplete="off"
              size="large"
              placeholder="0000"
            />
          </Form.Item>
          <p style={error ? null : { display: 'none' }}>Incorrect PIN!</p>
        </Form>
      </Modal>

      <div className="textAndButtonContainer">
        <div className="editText">
          <h3>Edit Account Settings</h3>
        </div>
        <div className="buttonArea">
          <div
            className="unlockButton"
            style={unlock ? null : { display: 'none' }}
          >
            <button
              className="lockUnlockButton"
              onClick={() => setIsModalVisible(true)}
              value="UNLOCK"
            >
              UNLOCK WITH PIN
            </button>
          </div>

          <div
            className="lockButton"
            style={unlock ? { display: 'none' } : null}
          >
            <button
              className="lockUnlockButton"
              onClick={() => setUnlock(!unlock)}
            >
              LOCK
            </button>
          </div>
        </div>
      </div>
      <div
        className="editFormsAndButtonsContainer"
        style={unlock ? { opacity: '.3' } : null}
      >
        <AccountSettingsForm disabled={unlock} />
      </div>
      <div className="settings-buttons-container">
        <button
          className="plainButton"
          style={unlock ? { opacity: '.3' } : null}
          disabled={unlock}
        >
          Edit Credit Card Info
        </button>
        <br />
        <button
          className="plainButton"
          style={unlock ? { opacity: '.3' } : null}
          disabled={unlock}
        >
          Edit Subscription Plan
        </button>
      </div>
    </div>
  );
}

export default RenderAccountSettings;
