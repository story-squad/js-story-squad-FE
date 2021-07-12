import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  getCohorts,
  getPostsForModeration,
  setSubmitStatus,
  setResults,
  setVoteSeq,
} from '../../../api/moderation';

import { Button, Select, Form, Row, Card, Col, Collapse } from 'antd';

const { Option } = Select;

const ModerationTools = () => {
  const [cohorts, setCohorts] = useState([]);
  const [posts, setPosts] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    getCohorts().then(res => {
      setCohorts(res);
      // console.log(res);
    });
  }, []);

  const getPosts = () => {
    const selected = form.getFieldValue('cohort');
    if (selected) {
      getPostsForModeration(selected).then(res => {
        setPosts(res);
        console.log(res);
      });
    }
  };

  const approve = id => {
    setSubmitStatus(id, 'APPROVED').then(res => {
      setPosts(posts => ({
        ...posts,
        [id]: {
          ...posts[id],
          status: 'APPROVED',
        },
      }));
    });
  };

  const reject = id => {
    setSubmitStatus(id, 'REJECTED').then(res => {
      setPosts(posts => ({
        ...posts,
        [id]: {
          ...posts[id],
          status: 'REJECTED',
        },
      }));
    });
  };

  //ERRLOG: no data in response
  // eslint-disable-next-line
  const voteSeq = () => {
    setVoteSeq().then(res => {
      console.log(res);
    });
  };

  // Moderator can begin the results stage
  // eslint-disable-next-line
  const results = () => {
    setResults().then(res => {
      console.log(res);
    });
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Form form={form} className="inline-form">
        {/* Developer game control panel */}
        {process.env.REACT_APP_ENV === 'development' && (
          <>
            <h2 className="moderator-title">
              Game Control (Development and User Testing)
            </h2>
            <h3>Navigation</h3>
            <nav>
              <Link
                to="/child/dashboard"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dashboard
              </Link>
              <br />
              <Link
                to="/child/mission-control"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mission Control (Read/Write/Draw)
              </Link>
              <br />
              <Link to="/child/join" target="_blank" rel="noopener noreferrer">
                Squad
              </Link>
              <br />
              <Link
                to="/child/match-up"
                target="_blank"
                rel="noopener noreferrer"
              >
                Matchup
              </Link>
            </nav>
          </>
        )}
        {/* END Developer game control panel */}
        <h2 className="posts-title">Posts for Moderation</h2>
        <Collapse style={{ width: '45%' }}>
          <Collapse.Panel header="Instructions" key="2">
            <p>
              After students add submissions, are displayed here for a moderator
              to read and approve or reject. Select a cohort to load
              submissions. (Need to finish some functionality, see notes in
              code).
            </p>
          </Collapse.Panel>
        </Collapse>
        <br />
        <Form.Item name="cohort">
          <Select
            style={{ width: '45%' }}
            placeholder="Select a Cohort"
            onChange={getPosts}
          >
            {cohorts.map(x => (
              <Option key={x.ID} value={x.ID}>
                Cohort {x.ID}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Row gutter={16}>
          {Object.keys(posts).map(x => {
            const cur = posts[x];
            if (
              !cur.status ||
              cur.status === 'CLEAR' ||
              cur.status === 'PENDING'
            )
              return (
                <Col span={6}>
                  <Card>
                    <Card.Meta
                      title={`Status: ${cur.status || 'PENDING'}`}
                      description={`Pages: ${Object.keys(cur.Pages).length}`}
                    />
                    Drawing: {<img alt="Student Drawing" src={cur.Image} />}
                    {/* Will need to update writing images displayed when student submits multiple pages of writing. I don't understand how backend is handling multiple pages yet.*/}
                    Writing: {<img alt="Student Writing" src={cur.Pages[0]} />}
                    {/* TODO: approve and reject need to also update backend somehow, not just redux store. */}
                    <Button onClick={() => approve(x)}>ACCEPT</Button>
                    <Button onClick={() => reject(x)}>REJECT</Button>
                  </Card>
                </Col>
              );
            else return <></>;
          })}
        </Row>
      </Form>
    </div>
  );
};

export default ModerationTools;
