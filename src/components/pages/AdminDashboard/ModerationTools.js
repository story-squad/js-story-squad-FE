import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  getCohorts,
  getPostsForModeration,
  setSubmitStatus,
  setResults,
  setVoteSeq,
} from '../../../api/moderation';

import {
  resetTestUserSubs,
  generateTestUserSubs,
  getTableInfo,
} from '../../../api/moderation';

import { Button, Select, Form, Row, Card, Col, Collapse } from 'antd';

const { Option } = Select;

const ModerationTools = () => {
  const [cohorts, setCohorts] = useState([]);
  const [posts, setPosts] = useState({});
  const [form] = Form.useForm();
  const [tableInfo, setTableInfo] = useState({});

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
  const voteSeq = () => {
    setVoteSeq().then(res => {
      console.log(res);
    });
  };

  // Moderator can begin the results stage
  const results = () => {
    setResults().then(res => {
      console.log(res);
    });
  };

  // Get information about API tables
  const handleGetTableInfo = () => {
    getTableInfo(1).then(res => {
      setTableInfo(res.data);
      console.log(res.data);
    });
  };

  // Add read/write/draw submissions for test user
  const handleGenerateTestUserSubs = () => {
    generateTestUserSubs(1).then(res => {
      console.log(res.data);
    });
  };

  // Remove read/write/draw submissions for test user
  const handleResetTestUserSubs = () => {
    resetTestUserSubs(1).then(res => {
      console.log(res.data);
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
            <Collapse style={{ width: '45%' }} className="moderator-notes">
              <Collapse.Panel header="Notes & Instructions" key="1">
                <p>
                  Control for game flow and submission data for the test user
                  child account, labeled with (TEST USER) under the parent
                  account "llama001@maildrop.cc" Data for testing purposes is
                  included in knex seed files. Seed data should only need to be
                  run once in the development environment to allow for user
                  testing.
                </p>
              </Collapse.Panel>
            </Collapse>
            <br />
            <Form.Item className="moderator-form">
              <h3>Test User Data</h3>
              <table className="admin-table">
                <tr>
                  <th>Read?</th>
                  <th>Drawn?</th>
                  <th>Written?</th>
                  <th>Submitted Points?</th>
                </tr>
                <tr>
                  <td>
                    {tableInfo.hasRead !== undefined
                      ? String(tableInfo.hasRead)
                      : '?'}
                  </td>
                  <td>
                    {tableInfo.hasDrawn !== undefined
                      ? String(tableInfo.hasDrawn)
                      : '?'}
                  </td>
                  <td>
                    {tableInfo.hasWritten !== undefined
                      ? String(tableInfo.hasWritten)
                      : '?'}
                  </td>
                  <td>
                    {tableInfo.numPoints !== undefined
                      ? String(tableInfo.numPoints > 0)
                      : '?'}
                  </td>
                </tr>
              </table>
              <h3>Game Data</h3>
              <table className="admin-table">
                <tr>
                  <th>Drawings</th>
                  <th>Writings (pages)</th>
                  <th>Faceoffs</th>
                  <th>Teams</th>
                  <th>Votes</th>
                </tr>
                <tr>
                  <td>
                    {tableInfo.numDrawings !== undefined
                      ? tableInfo.numDrawings
                      : '?'}
                  </td>
                  <td>
                    {tableInfo.numWritings !== undefined
                      ? tableInfo.numWritings
                      : '?'}
                  </td>
                  <td>
                    {tableInfo.numFaceoffs !== undefined
                      ? tableInfo.numFaceoffs
                      : '?'}
                  </td>
                  <td>
                    {tableInfo.numTeams !== undefined
                      ? tableInfo.numTeams
                      : '?'}
                  </td>
                  <td>
                    {tableInfo.numVotes !== undefined
                      ? tableInfo.numVotes
                      : '?'}
                  </td>
                </tr>
              </table>
              <Button
                style={{ margin: '8px' }}
                type="default"
                onClick={handleGetTableInfo}
              >
                Refresh Data
              </Button>
              <h3>User Control</h3>
              <Button
                style={{ margin: '8px' }}
                type="default"
                onClick={handleResetTestUserSubs}
              >
                Remove Submissions
              </Button>
              <Button
                style={{ margin: '8px' }}
                type="default"
                onClick={handleGenerateTestUserSubs}
              >
                Generate Submissions
              </Button>
              <h3>Game Control</h3>
              <Button
                style={{ margin: '8px' }}
                type="default"
                onClick={voteSeq}
              >
                Generate Votes
              </Button>
              <Button
                style={{ margin: '8px' }}
                type="default"
                onClick={results}
              >
                Generate Results
              </Button>
            </Form.Item>
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
