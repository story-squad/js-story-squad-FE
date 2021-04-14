const mockGetChildTasks = {
  ID: 1,
  ChildID: 1,
  StoryID: 1,
  HasRead: false,
  HasWritten: false,
  HasDrawn: false,
  Complexity: 30,
  LowConfidence: false,
  Status: 'PENDING',
  CohortID: 1,
};

const mockNewDrawingSub = [
  {
    URL: 'http://someurl.com',
    checksum:
      '25ef9314704f5f68b7e04513c1ca13c9146328ee14a38e1d7c99789ab11fae31e1c0238425d58581b3ac4941884cd389b7bea3f8e658f533adc7cf934bb130f8',
  },
];

const mockNewWritingSub = [
  {
    URL: 'http://someurl.com',
    checksum:
      '25ef9314704f5f68b7e04513c1ca13c9146328ee14a38e1d7c99789ab11fae31e1c0238425d58581b3ac4941884cd389b7bea3f8e658f533adc7cf934bb130f8',
    PageNum: 1,
  },
];

module.exports = {
  mockGetChildTasks,
  mockNewWritingSub,
  mockNewDrawingSub,
};
