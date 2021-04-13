// istanbul ignore file
import { apiAuthDelete, apiAuthGet, apiAuthPut } from './';

export const getCohorts = () => {
  try {
    return apiAuthGet('/mod/cohorts', null).then(res => res.data);
  } catch (err) {
    return [];
  }
};

export const getPostsForModeration = cohortId => {
  try {
    return apiAuthGet(`/mod/submissions?cohortId=${cohortId}`, null).then(
      res => res.data
    );
  } catch (err) {
    return {};
  }
};

export const setSubmitStatus = (id, Status) => {
  try {
    return apiAuthPut(`/mod/submissions/${id}`, { Status }, null).then(
      res => res.data
    );
  } catch (err) {
    return {};
  }
};

export const setClusters = () => {
  try {
    return apiAuthPut('/mod/clusters').then(res => {
      return res;
    });
  } catch (err) {
    console.log(err);
    return { err };
  }
};

export const setFaceoffs = () => {
  try {
    return apiAuthPut('/mod/faceoffs/').then(res => {
      return res;
    });
  } catch (err) {
    console.log(err);
    return { err };
  }
};

export const setVoteSeq = () => {
  try {
    return apiAuthPut('/mod/votesequence').then(res => {
      return res;
    });
  } catch (err) {
    console.log(err);
    return { err };
  }
};

export const setResults = () => {
  try {
    return apiAuthPut('/mod/results').then(res => {
      return res;
    });
  } catch (err) {
    console.log(err);
    return { err };
  }
};

export const resetTestUserSubs = childId => {
  try {
    return apiAuthPut(`/mod/reset/submission/${childId}`).then(res => {
      return res;
    });
  } catch (err) {
    console.log(err);
    return { err };
  }
};

export const generateTestUserSubs = childId => {
  try {
    return apiAuthPut(`/mod/generate/submission/${childId}`).then(res => {
      return res;
    });
  } catch (err) {
    console.log(err);
    return { err };
  }
};

export const getTableInfo = childId => {
  try {
    return apiAuthGet(`/mod/get-info/${childId}`).then(res => {
      return res;
    });
  } catch (err) {
    console.log(err);
    return { err };
  }
};

export const removeTestUserPoints = childId => {
  try {
    return apiAuthDelete(`/mod/reset/points/${childId}`).then(res => {
      return res;
    });
  } catch (err) {
    console.log(err);
    return { err };
  }
};
