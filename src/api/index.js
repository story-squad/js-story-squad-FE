// istanbul ignore file
import axios from 'axios';

// Use mock data for development environment to make user-testing and FE dev easier
import {
  mockGetChildTasks,
  mockNewDrawingSub,
  mockNewWritingSub,
  mockGetChildTeam,
  mockSubmitPoints,
  mockGetChildSquad,
  mockGetFaceoffsForMatchup,
  mockGetChild,
  mockGetFaceoffsForVoting,
  mockUpdateChildData,
  mockPostVotes,
  mockGetProfileData,
  mockGetStory,
} from './mockApiData';

const sleep = time =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

const getExampleData = () => {
  return axios
    .get(`https://jsonplaceholder.typicode.com/photos?albumId=1`)
    .then(response => response.data);
};

const getAuthHeader = authState => {
  if (!authState.isAuthenticated) {
    throw new Error('Not authenticated');
  }
  // console.log("[IDTOKEN]", authState.idToken);
  return { Authorization: `Bearer ${authState.idToken.idToken}` };
};

const getDSData = (url, authState) => {
  // here's another way you can compose together your API calls.
  // Note the use of GetAuthHeader here is a little different than in the getProfileData call.
  const headers = getAuthHeader(authState);
  if (!url) {
    throw new Error('No URL provided');
  }
  return axios
    .get(url, { headers })
    .then(res => JSON.parse(res.data))
    .catch(err => err);
};

const apiAuthGet = (endpoint, authHeader) => {
  return axios.get(`${process.env.REACT_APP_API_URI}${endpoint}`, {
    headers: authHeader,
  });
};

const apiAuthPost = (endpoint, body, authHeader) => {
  return axios.post(`${process.env.REACT_APP_API_URI}${endpoint}`, body, {
    headers: authHeader,
  });
};

const apiAuthPut = (endpoint, body, authHeader) => {
  return axios.put(`${process.env.REACT_APP_API_URI}${endpoint}`, body, {
    headers: authHeader,
  });
};
const apiAuthDelete = (endpoint, authHeader) => {
  return axios.delete(`${process.env.REACT_APP_API_URI}${endpoint}`, {
    headers: authHeader,
  });
};

const getProfileData = authState => {
  if (process.env.REACT_APP_ENV === 'development') {
    return Promise.resolve(mockGetProfileData);
  } else {
    try {
      return apiAuthGet('/profiles', getAuthHeader(authState)).then(
        response => {
          console.log('getProfileData', response.data);
          return response.data;
        }
      );
    } catch (error) {
      return new Promise(() => {
        console.log(error);
        return [];
      });
    }
  }
};

// Get data for leaderboard
const getLeaderboard = authState => {
  try {
    return apiAuthGet('/leaderboard', getAuthHeader(authState)).then(
      response => {
        console.log('getLeaderboard', response);
        return response.data;
      }
    );
  } catch (err) {
    return new Promise(() => {
      console.log(err);
      return [];
    });
  }
};

// Parent API Calls

/**
 * @param {Object} authState necessary for API functionality
 * @param {number} childId id of the child needed for information
 * @return {Object} child information containing Name, PIN, IsDyslexic, CohortID, ParentID, AvatarID, and GradeLevelID
 */
const getChild = (authState, childId) => {
  if (process.env.REACT_APP_ENV === 'development') {
    return Promise.resolve(mockGetChild);
  } else {
    try {
      return apiAuthGet(`/child/${childId}`, getAuthHeader(authState)).then(
        response => {
          console.log('getChild', response.data);
          return response.data;
        }
      );
    } catch (error) {
      return new Promise(() => {
        console.log(error);
      });
    }
  }
};

/**
 * @param {Object} authState necessary for API functionality
 * @param {Object} body child data
 * @param {number} childId id of the child needed for information
 * @return {Object} child information containing Name, PIN, IsDyslexic, CohortID, ParentID, AvatarID, and GradeLevelID
 */
const updateChildData = (authState, body, childId) => {
  console.log(body);
  if (process.env.REACT_APP_ENV === 'development') {
    return mockUpdateChildData;
  } else {
    try {
      return apiAuthPut(
        `/child/${childId}`,
        body,
        getAuthHeader(authState)
      ).then(response => {
        console.log('updateChildData', response);
        return response;
      });
    } catch (error) {
      return new Promise(() => {
        console.log(error);
      });
    }
  }
};

/**
 * @param {Object} authState necessary for API functionality
 * @param {Object} child object containing fields for Name, PIN, IsDyslexic, CohortID, ParentID, AvatarID, and GradeLevelID
 * @returns {number} child id for child that was just created
 */
const deleteChild = (authState, childId) => {
  try {
    return apiAuthDelete(`/child/${childId}`, getAuthHeader(authState)).then(
      response => {
        return response;
      }
    );
  } catch (error) {
    return new Promise(() => {
      console.log(error);
    });
  }
};

/**
 * @param {Object} authState necessary for API functionality
 * @param {Object} child object containing fields for Name, PIN, IsDyslexic, CohortID, ParentID, AvatarID, and GradeLevelID
 * @returns {number} child id for child that was just created
 */
const postNewChild = (authState, child) => {
  try {
    return apiAuthPost('/child', child, getAuthHeader(authState)).then(
      response => {
        console.log('postNewChild', response);
        return response.data;
      }
    );
  } catch (error) {
    return new Promise(() => {
      console.log(error);
      return [];
    });
  }
};

// Child API Calls

/**
 * @param {Object} authState necessary for API functionality
 * @param {number} cohortId the cohort id of the respective child
 * @returns {Promise} a promise that resolves to an object containing {DrawingPrompt, ID, Title, URL, and WritingPrompt}
 */
const getStory = (authState, cohortId) => {
  if (process.env.REACT_APP_ENV === 'development') {
    return Promise.resolve(mockGetStory);
  } else {
    try {
      return apiAuthGet(
        `/story?cohortId=${cohortId}`,
        getAuthHeader(authState)
      ).then(response => {
        console.log('getStory', response.data);
        return response.data;
      });
    } catch (error) {
      return new Promise(() => {
        console.log(error);
        return [];
      });
    }
  }
};

/**
 * Reads in gradelevels and avatars from the database to enforce referential integrity
 * @param {Object} authState necessary for API functionality
 * @returns {Promise} a promise that resolves to an array of [[avatars], [gradeLevels]]
 */
const getChildFormValues = async authState => {
  try {
    return Promise.all([
      apiAuthGet('/avatars', getAuthHeader(authState)),
      apiAuthGet('/gradelevels', getAuthHeader(authState)),
    ]).then(res => {
      console.log(
        'getChildFormValues',
        res.map(x => x.data)
      );
      return res.map(x => x.data);
    });
  } catch (err) {
    return new Promise(() => {
      console.log(err);
      return [];
    });
  }
};

/**
 * @param {Object} authState
 * @param {Object} body formData
 * @param {number} subId id of the full submission
 * @returns {array} an array of submission objects containing the image url, the checksum, and the page number
 */
const postNewWritingSub = async (authState, body, subId) => {
  if (process.env.REACT_APP_ENV === 'development') {
    return mockNewWritingSub;
  } else {
    try {
      return apiAuthPost(
        `/submit/write/${subId}`,
        body,
        getAuthHeader(authState)
      ).then(res => {
        console.log('postNewWritingSub', res.data);
        return res.data;
      });
    } catch (err) {
      console.log(err);
      return [];
    }
  }
};

/**
 * @param {Object} authState
 * @param {Object} body formData
 * @param {number} subId id of the full submission
 * @returns {Object} submission object containing the image url, and the checksum
 */
const postNewDrawingSub = async (authState, body, subId) => {
  if (process.env.REACT_APP_ENV === 'development') {
    return mockNewDrawingSub;
  } else {
    try {
      return apiAuthPost(
        `/submit/draw/${subId}`,
        body,
        getAuthHeader(authState)
      ).then(res => {
        console.log('postNewDrawingSub', res.data);
        return res.data;
      });
    } catch (err) {
      console.log(err);
      return [];
    }
  }
};

/**
 * Returns an object identifying whether or not a child has completed their submission tasks
 * Looks in DB for submission containing childId and storyID
 *    if said submission exists, returns all submission data (id, childId, storyId, hasRead, hasDrawn, hasWritten, etc.)
 * @param {Object} authState
 * @param {number} childid id of whatever child is performing the tasks
 * @param {number} storyid id of the story of the week
 * @returns {Object} Object of tasks and relevant id's
 */
const getChildTasks = async (authState, childid, storyid) => {
  if (process.env.REACT_APP_ENV === 'development') {
    return mockGetChildTasks;
  } else {
    try {
      return apiAuthGet(
        `/submission?childId=${childid}&storyId=${storyid}`,
        getAuthHeader(authState)
      ).then(response => {
        return response.data;
      });
    } catch (err) {
      return new Promise(() => {
        console.log(err);
        return [];
      });
    }
  }
};

/**
 * @param {Object} authState
 * @param {number} submissionId id of the full submission
 * @returns {Object} enpty object on success
 */
const markAsRead = async (authState, submissionId) => {
  try {
    return apiAuthPut(
      `/submit/read/${submissionId}`,
      {},
      getAuthHeader(authState)
    ).then(response => {
      console.log('markAsRead', response.data);
      return response.data;
    });
  } catch (err) {
    return new Promise(() => {
      console.log(err);
      return [];
    });
  }
};

/**
 * @param {*} authState
 * @param {number} submissionId ID for back-end to identify which submission to modify. Each submission has only one corresponding child.
 * @param {boolean} hasReadStatus boolean value to set the targeted submission's hasRead value to
 * @param {boolean} hasDrawnStatus boolean value to set the targeted submission's hasDrawn value to
 * @param {boolean} hasWrittenStatus boolean value to set the targeted submission's hasWritten value to
 * @returns {object} empty object on success
 */
const setAllTasks = (
  authState,
  submissionId,
  hasReadStatus,
  hasDrawnStatus,
  hasWrittenStatus
) => {
  apiAuthPut(
    `/dev/update-all/${submissionId}`,
    {
      hasRead: hasReadStatus,
      hasDrawn: hasDrawnStatus,
      hasWritten: hasWrittenStatus,
    },
    getAuthHeader(authState)
  )
    .then(response => {
      console.log('setAllTasks', response.data);
      return response.data;
    })
    .catch(err => {
      console.log(err);
      return [];
    });
};

// Gamification API Calls

/**
 * @param {Object} authState necessary for API functionality
 * @param {number} childId id of the child who is "teaming up"
 * @returns {Object} containing information on the child and their teammate
 */
const getChildTeam = async (authState, childId) => {
  if (process.env.REACT_APP_ENV === 'development') {
    return Promise.resolve(mockGetChildTeam);
  } else {
    try {
      return apiAuthGet(
        `/game/team?childId=${childId}`,
        getAuthHeader(authState)
      ).then(response => {
        console.log('getChildTeam', response.data);
        return response.data;
      });
    } catch (error) {
      return new Promise(() => {
        console.log(error);
        return [error];
      });
    }
  }
};

/**
 * @param {Object} authState necessary for API functionality
 * @param {Object} teamPoints these are the points assigned for each of the submissions
 * @returns {Array} with id reference to the vote
 */
const submitPoints = async (authState, teamPoints) => {
  if (process.env.REACT_APP_ENV === 'development') {
    console.log(mockSubmitPoints);
    return mockSubmitPoints;
  } else {
    try {
      return apiAuthPost(
        `/game/points`,
        teamPoints,
        getAuthHeader(authState)
      ).then(response => {
        console.log('submitPoints', response.data);
        return response.data;
      });
    } catch (error) {
      return new Promise(() => {
        console.log(error);
        return [];
      });
    }
  }
};

/**
 * @param {Object} authState  necessary for API functionality
 * @param {number} childId id of the child who is "squadding up"
 * @returns {number} squadId is returned
 */
const getChildSquad = async (authState, childId) => {
  if (process.env.REACT_APP_ENV === 'development') {
    return mockGetChildSquad;
  } else {
    try {
      return apiAuthGet(
        `/game/squad?childId=${childId}`,
        getAuthHeader(authState)
      ).then(response => {
        console.log('getChildSquad', response.data);
        return response.data;
      });
    } catch (error) {
      return new Promise(() => {
        console.log(error);
        return [];
      });
    }
  }
};

/**
 * @param {Object} authState necessary for API functionality
 * @param {number} squadId this will be received from 'getChildSquad' api call
 * @returns {Array} array of 4 objects (one for each child) containing information about their submissions
 */
const getFaceoffsForMatchup = async (authState, squadId, childId) => {
  if (process.env.REACT_APP_ENV === 'development') {
    return mockGetFaceoffsForMatchup;
  } else {
    try {
      return apiAuthGet(
        `/game/faceoffs/squads?squadId=${squadId}&childId=${childId}`,
        getAuthHeader(authState)
      ).then(response => {
        console.log('getFaceoffsForMatchup', response.data);
        return response.data;
      });
    } catch (error) {
      return new Promise(() => {
        console.log(error);
        return [];
      });
    }
  }
};

/**
 * @param {Object} authState necessary for API functionality
 * @param {number} squadId this will be received from 'getChildSquad' api call
 * @returns {Array} array of 4 objects (one for each child) containing information about their submissions
 */
const getFaceoffsForVoting = async (authState, squadId) => {
  if (process.env.REACT_APP_ENV === 'development') {
    return mockGetFaceoffsForVoting;
  } else {
    try {
      return apiAuthGet(
        `/game/faceoffs/squads/?squadId=${squadId}`,
        getAuthHeader(authState)
      ).then(response => {
        console.log('getFaceoffsForVoting', response.data);
        return response.data;
      });
    } catch (error) {
      return new Promise(() => {
        console.log(error);
        return [];
      });
    }
  }
};

/**
 * @param {Object} authState necessary for API functionality
 * @param {Object} voteInfo includes the Vote, the MemberID, and the FaceoffID
 * @returns {Array} with id reference to the vote
 */
const postVotes = async (authState, voteInfo) => {
  if (process.env.REACT_APP_ENV === 'development') {
    return mockPostVotes;
  } else {
    try {
      return apiAuthPost(
        `/game/votes`,
        voteInfo,
        getAuthHeader(authState)
      ).then(response => {
        console.log('postVotes', response.data);
        return response.data;
      });
    } catch (error) {
      return new Promise(() => {
        console.log(error);
        return [];
      });
    }
  }
};

/**
 * @param {Object} authState necessary for API functionality
 * @param {number} squadId id of the squad that the child is in
 * @param {number} memberId id of the team the child is on
 * @returns {Array} containing objects of the results of the faceoff
 */
const getGameVotes = async (authState, squadId, memberId) => {
  try {
    return apiAuthGet(
      `/game/votes?squadId=${squadId}&memberId=${memberId}`,
      getAuthHeader(authState)
    ).then(response => {
      console.log('getGameVotes', response.data);
      return response.data;
    });
  } catch (error) {
    return new Promise(() => {
      console.log(error);
      return [];
    });
  }
};

// Moderator API Calls

/**
 * @param {Object} authState necessary for API functionality
 * @param {File, Array} body can either be one file or an array of files to upload
 * @returns {Array} the newly created avatar(s)
 */
const postNewAvatar = async (authState, body) => {
  try {
    return apiAuthPost('/avatars', body, getAuthHeader(authState)).then(res => {
      console.log('postNewAvatar', res.data);
      return res.data;
    });
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getChildGraph = async (authState, ChildID) => {
  return apiAuthGet(`/parent/viz?childId=${ChildID}`, getAuthHeader(authState));
};

// TODO: delete if no longer needed
const reset = async authState => {
  console.log('Removing squads and matchups');
  return apiAuthPut(`/reset/reset/`, null);
};

export {
  sleep,
  getExampleData,
  getProfileData,
  getDSData,
  apiAuthGet,
  getLeaderboard,
  getStory,
  getAuthHeader,
  apiAuthPost,
  apiAuthPut,
  postNewChild,
  getChildFormValues,
  getChildTasks,
  updateChildData,
  postNewWritingSub,
  markAsRead,
  setAllTasks,
  postNewDrawingSub,
  getChild,
  postNewAvatar,
  getChildTeam,
  submitPoints,
  getChildSquad,
  getFaceoffsForMatchup,
  getFaceoffsForVoting,
  postVotes,
  getGameVotes,
  getChildGraph,
  deleteChild,
  reset,
};
