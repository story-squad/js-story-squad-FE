import React from 'react';
import ParentDashboardBack from '../../common/ParentDashboardBack';
import { Collapse, Layout, Card, Row, Col } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import img1 from './img1.png';
const { Panel } = Collapse;

function RenderParentFaq(props) {
  return (
    <div>
      <Layout className="parent-dashboard">
        <div className='"site-card-border-less-wrapper"'>
          <div style={{ width: '66%', margin: '0 auto' }}>
            <ParentDashboardBack />
          </div>
          <Row className="card">
            <Col span={16} className="col-btn">
              <Row>
                <h4 style={{ color: '#878D93', fontWeight: '700' }}>
                  FREQUENTLY ASKED QUESTIONS
                </h4>
              </Row>
              <div className="btn-group">
                <Row>
                  <a href="#game-play">Game Play</a>
                  <a href="#child-profile-management">
                    Child Profile Management
                  </a>
                </Row>
                <Row>
                  <a href="#account-settings">Account Settings</a>
                  <a href="#tech-support">Technical Support</a>
                </Row>
              </div>
            </Col>
            <Col
              span={8}
              type="flex"
              style={{ alignItems: 'center' }}
              justify="center"
            >
              <img
                style={{ position: 'absolute', overflow: 'scroll' }}
                alt="example"
                src={img1}
              />
            </Col>
          </Row>
        </div>

        <div className="site-card-border-less-wrapper">
          <Card
            title="Game Play + Content"
            className="card"
            id="game-play"
            bordered={false}
          >
            <Collapse
              bordered={false}
              defaultActiveKey={['1']}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
            >
              <Panel
                header="Is Story Squad safe and appropriate for my children?"
                key="1"
                className="ant-card-body"
              >
                <p>
                  <span>
                    {' '}
                    <strong>Answer :</strong>
                  </span>{' '}
                  All the Lorem Ipsum generators on the Internet tend to repeat
                  predefined chunks as necessary.
                </p>
              </Panel>
              <Panel
                header="What type of content is available?"
                key="2"
                className="ant-card-body"
              >
                <p>
                  <span>
                    {' '}
                    <strong>Answer :</strong>
                  </span>{' '}
                  All the Lorem Ipsum generators on the Internet tend to repeat
                  predefined chunks as necessary.
                </p>
              </Panel>
              <Panel
                header="What's the weekly schedule for the game?"
                key="3"
                className="ant-card-body"
              >
                <p>
                  <span>
                    {' '}
                    <strong>Answer :</strong>
                  </span>{' '}
                  All the Lorem Ipsum generators on the Internet tend to repeat
                  predefined chunks as necessary.
                </p>
              </Panel>
              <Panel
                header="What happen if a phase ends and my child forgot to participate
                in time?"
                key="4"
                className="ant-card-body"
              >
                <p>
                  <span>
                    {' '}
                    <strong>Answer :</strong>
                  </span>{' '}
                  All the Lorem Ipsum generators on the Internet tend to repeat
                  predefined chunks as necessary.
                </p>
              </Panel>
              <Panel
                header="How are partners assigned and opposing teams selected?"
                key="5"
                className="ant-card-body"
              >
                <p>
                  <span>
                    {' '}
                    <strong>Answer :</strong>
                  </span>{' '}
                  All the Lorem Ipsum generators on the Internet tend to repeat
                  predefined chunks as necessary.
                </p>
              </Panel>
              <Panel
                header="What is Story Squad privacy policy?"
                key="6"
                className="ant-card-body"
              >
                <p>
                  <span>
                    {' '}
                    <strong>Answer :</strong>
                  </span>{' '}
                  All the Lorem Ipsum generators on the Internet tend to repeat
                  predefined chunks as necessary.
                </p>
              </Panel>
              <Panel
                header="How does the gallery and leaderboard work?"
                key="7"
                className="ant-card-body"
              >
                <p>
                  <span>
                    {' '}
                    <strong>Answer :</strong>
                  </span>{' '}
                  All the Lorem Ipsum generators on the Internet tend to repeat
                  predefined chunks as necessary.
                </p>
              </Panel>
              <Panel
                header="I'm a child's book author. How do I get my book on Story Squad?"
                key="8"
                className="ant-card-body"
              >
                <p>
                  <span>
                    {' '}
                    <strong>Answer :</strong>
                  </span>{' '}
                  All the Lorem Ipsum generators on the Internet tend to repeat
                  predefined chunks as necessary.
                </p>
              </Panel>
            </Collapse>
          </Card>
        </div>
        <div className="site-card-border-less-wrapper">
          <Card
            title="Child Profile Management"
            className="card"
            bordered={false}
            id="child-profile-management"
          >
            <Collapse
              bordered={false}
              defaultActiveKey={['1']}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
            >
              <Panel
                header="How do I add/edit my child's profile PIN?"
                key="1"
                className="ant-card-body"
              >
                <p>
                  <span>
                    {' '}
                    <strong>Answer :</strong>
                  </span>{' '}
                  All the Lorem Ipsum generators on the Internet tend to repeat
                  predefined chunks as necessary.
                </p>
              </Panel>
              <Panel
                header="How do I create my child's profile?"
                key="2"
                className="ant-card-body"
              >
                <p>
                  <span>
                    {' '}
                    <strong>Answer :</strong>
                  </span>{' '}
                  All the Lorem Ipsum generators on the Internet tend to repeat
                  predefined chunks as necessary.
                </p>
              </Panel>
              <Panel
                header="How do I change my child's avatar?"
                key="3"
                className="ant-card-body"
              >
                <p>
                  <span>
                    {' '}
                    <strong>Answer :</strong>
                  </span>{' '}
                  All the Lorem Ipsum generators on the Internet tend to repeat
                  predefined chunks as necessary.
                </p>
              </Panel>
              <Panel
                header="How do I change my child's profile name?"
                key="4"
                className="ant-card-body"
              >
                <p>
                  <span>
                    {' '}
                    <strong>Answer :</strong>
                  </span>{' '}
                  All the Lorem Ipsum generators on the Internet tend to repeat
                  predefined chunks as necessary.
                </p>
              </Panel>
              <Panel
                header="How do I delete my child's profile?"
                key="5"
                className="ant-card-body"
              >
                <p>
                  <span>
                    {' '}
                    <strong>Answer :</strong>
                  </span>{' '}
                  All the Lorem Ipsum generators on the Internet tend to repeat
                  predefined chunks as necessary.
                </p>
              </Panel>
              <Panel
                header="How do I receive updates on my child's progress?"
                key="6"
                className="ant-card-body"
              >
                <p>
                  <span>
                    {' '}
                    <strong>Answer :</strong>
                  </span>{' '}
                  All the Lorem Ipsum generators on the Internet tend to repeat
                  predefined chunks as necessary.
                </p>
              </Panel>
            </Collapse>
          </Card>
        </div>
        <div className="site-card-border-less-wrapper">
          <Card
            title="Account Settings"
            className="card"
            bordered={false}
            id="account-settings"
          >
            <Collapse
              bordered={false}
              defaultActiveKey={['1']}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
            >
              <Panel
                header="I forget my password. What should I do?"
                key="1"
                className="ant-card-body"
              >
                <p>
                  <span>
                    {' '}
                    <strong>Answer :</strong>
                  </span>{' '}
                  All the Lorem Ipsum generators on the Internet tend to repeat
                  predefined chunks as necessary.
                </p>
              </Panel>
              <Panel
                header="How do I update my parent email for my Story Squad
                subscription?"
                key="2"
                className="ant-card-body"
              >
                <p>
                  <span>
                    {' '}
                    <strong>Answer :</strong>
                  </span>{' '}
                  All the Lorem Ipsum generators on the Internet tend to repeat
                  predefined chunks as necessary.
                </p>
              </Panel>
            </Collapse>
          </Card>
        </div>
        <div className="site-card-border-less-wrapper">
          <Card
            title="Technical Support"
            className="card"
            bordered={false}
            id="tech-support"
          >
            <Collapse
              bordered={false}
              defaultActiveKey={['1']}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
            >
              <Panel
                header="I forgot my password. What should I do?"
                key="1"
                className="ant-card-body"
              >
                <p>
                  <span>
                    {' '}
                    <strong>Answer :</strong>
                  </span>{' '}
                  All the Lorem Ipsum generators on the Internet tend to repeat
                  predefined chunks as necessary.
                </p>
              </Panel>
              <Panel
                header="The Story Squard app isn't responding. What should I do?"
                key="2"
                className="ant-card-body"
              >
                <p>
                  <span>
                    {' '}
                    <strong>Answer :</strong>
                  </span>{' '}
                  All the Lorem Ipsum generators on the Internet tend to repeat
                  predefined chunks as necessary.
                </p>
              </Panel>
              <Panel
                header="What devices does Story Squard support?"
                key="3"
                className="ant-card-body"
              >
                <p>
                  <span>
                    {' '}
                    <strong>Answer :</strong>
                  </span>{' '}
                  All the Lorem Ipsum generators on the Internet tend to repeat
                  predefined chunks as necessary.
                </p>
              </Panel>
              <Panel
                header="Is an internet connection required to use Story Squard?"
                key="4"
                className="ant-card-body"
              >
                <p>
                  <span>
                    {' '}
                    <strong>Answer :</strong>
                  </span>{' '}
                  All the Lorem Ipsum generators on the Internet tend to repeat
                  predefined chunks as necessary.
                </p>
              </Panel>
              <Panel
                header="How do I add multiple devices?"
                key="5"
                className="ant-card-body"
              >
                <p>
                  <span>
                    {' '}
                    <strong>Answer :</strong>
                  </span>{' '}
                  All the Lorem Ipsum generators on the Internet tend to repeat
                  predefined chunks as necessary.
                </p>
              </Panel>
              <Panel
                header="Will my children's progress sync across all devices registered
                to their account?"
                key="6"
                className="ant-card-body"
              >
                <p>
                  <span>
                    {' '}
                    <strong>Answer :</strong>
                  </span>{' '}
                  All the Lorem Ipsum generators on the Internet tend to repeat
                  predefined chunks as necessary.
                </p>
              </Panel>
            </Collapse>
          </Card>
        </div>
      </Layout>
    </div>
  );
}

export default RenderParentFaq;
