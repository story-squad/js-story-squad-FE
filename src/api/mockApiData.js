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

const mockGetChildTeam = {
  1: {
    ChildID: 1,
    MemberID: 1,
    SubmissionID: 1,
    ImgURL: 'https://picsum.photos/id/201/400',
    ChildName: 'Bettie',
    AvatarURL: 'https://labs28-b-storysquad.s3.amazonaws.com/hero-9.svg',
    Pages: [
      {
        PageURL: 'https://picsum.photos/id/1/400',
        PageNum: 1,
      },
      {
        PageURL: 'https://picsum.photos/id/101/400',
        PageNum: 2,
      },
    ],
  },
  2: {
    ChildID: 2,
    MemberID: 2,
    SubmissionID: 2,
    ImgURL: 'https://picsum.photos/id/202/400',
    ChildName: 'Krystel',
    AvatarURL: 'https://labs28-b-storysquad.s3.amazonaws.com/hero-5.svg',
    Pages: [
      {
        PageURL: 'https://picsum.photos/id/2/400',
        PageNum: 1,
      },
      {
        PageURL: 'https://picsum.photos/id/102/400',
        PageNum: 2,
      },
    ],
  },
  name: 'Team 1',
};

const mockSubmitPoints = [21, 22];

const mockGetChildSquad = {
  ID: 1,
  MemberID: 1,
};

const mockGetFaceoffsForMatchup = [
  {
    ID: 1,
    Points: 170,
    Type: 'WRITING',
    SubmissionID1: 1,
    SubmissionID2: 3,
    SquadID: 1,
    Winner: null,
    Date: '2021-04-12T19:01:46.884Z',
    VotesCasted: 0,
    Emojis1: {
      Emoji: '',
    },
    Submission1: {
      ID: 1,
      Name: 'Bettie (Cohort1)',
      ImgURL: 'https://picsum.photos/id/201/400',
      AvatarURL: 'https://labs28-b-storysquad.s3.amazonaws.com/hero-9.svg',
      Pages: [
        {
          PageNum: 1,
          PageURL: 'https://picsum.photos/id/1/400',
        },
        {
          PageNum: 2,
          PageURL: 'https://picsum.photos/id/101/400',
        },
      ],
    },
    Submission2: {
      ID: 3,
      Name: 'Tavares (Cohort1)',
      ImgURL: 'https://picsum.photos/id/203/400',
      AvatarURL: 'https://labs28-b-storysquad.s3.amazonaws.com/hero-1.svg',
      Pages: [
        {
          PageNum: 1,
          PageURL: 'https://picsum.photos/id/3/400',
        },
        {
          PageNum: 2,
          PageURL: 'https://picsum.photos/id/103/400',
        },
      ],
    },
  },
  {
    ID: 3,
    Points: 85,
    Type: 'DRAWING',
    SubmissionID1: 1,
    SubmissionID2: 3,
    SquadID: 1,
    Winner: null,
    Date: '2021-04-12T19:01:46.884Z',
    VotesCasted: 0,
    Emojis1: {
      Emoji: '',
    },
    Submission1: {
      ID: 1,
      Name: 'Bettie (Cohort1)',
      ImgURL: 'https://picsum.photos/id/201/400',
      AvatarURL: 'https://labs28-b-storysquad.s3.amazonaws.com/hero-9.svg',
      Pages: [
        {
          PageNum: 1,
          PageURL: 'https://picsum.photos/id/1/400',
        },
        {
          PageNum: 2,
          PageURL: 'https://picsum.photos/id/101/400',
        },
      ],
    },
    Submission2: {
      ID: 3,
      Name: 'Tavares (Cohort1)',
      ImgURL: 'https://picsum.photos/id/203/400',
      AvatarURL: 'https://labs28-b-storysquad.s3.amazonaws.com/hero-1.svg',
      Pages: [
        {
          PageNum: 1,
          PageURL: 'https://picsum.photos/id/3/400',
        },
        {
          PageNum: 2,
          PageURL: 'https://picsum.photos/id/103/400',
        },
      ],
    },
  },
  {
    ID: 4,
    Points: 80,
    Type: 'DRAWING',
    SubmissionID1: 2,
    SubmissionID2: 4,
    SquadID: 1,
    Winner: null,
    Date: '2021-04-12T19:01:46.884Z',
    VotesCasted: 0,
    Submission1: {
      ID: 2,
      Name: 'Krystel (Cohort1)',
      ImgURL: 'https://picsum.photos/id/202/400',
      AvatarURL: 'https://labs28-b-storysquad.s3.amazonaws.com/hero-5.svg',
      Pages: [
        {
          PageNum: 1,
          PageURL: 'https://picsum.photos/id/2/400',
        },
        {
          PageNum: 2,
          PageURL: 'https://picsum.photos/id/102/400',
        },
      ],
    },
    Submission2: {
      ID: 4,
      Name: 'Myrna (Cohort1)',
      ImgURL: 'https://picsum.photos/id/204/400',
      AvatarURL: 'https://labs28-b-storysquad.s3.amazonaws.com/hero-8.svg',
      Pages: [
        {
          PageNum: 1,
          PageURL: 'https://picsum.photos/id/4/400',
        },
        {
          PageNum: 2,
          PageURL: 'https://picsum.photos/id/104/400',
        },
      ],
    },
  },
  {
    ID: 2,
    Points: 65,
    Type: 'WRITING',
    SubmissionID1: 2,
    SubmissionID2: 4,
    SquadID: 1,
    Winner: null,
    Date: '2021-04-12T19:01:46.884Z',
    VotesCasted: 0,
    Submission1: {
      ID: 2,
      Name: 'Krystel (Cohort1)',
      ImgURL: 'https://picsum.photos/id/202/400',
      AvatarURL: 'https://labs28-b-storysquad.s3.amazonaws.com/hero-5.svg',
      Pages: [
        {
          PageNum: 1,
          PageURL: 'https://picsum.photos/id/2/400',
        },
        {
          PageNum: 2,
          PageURL: 'https://picsum.photos/id/102/400',
        },
      ],
    },
    Submission2: {
      ID: 4,
      Name: 'Myrna (Cohort1)',
      ImgURL: 'https://picsum.photos/id/204/400',
      AvatarURL: 'https://labs28-b-storysquad.s3.amazonaws.com/hero-8.svg',
      Pages: [
        {
          PageNum: 1,
          PageURL: 'https://picsum.photos/id/4/400',
        },
        {
          PageNum: 2,
          PageURL: 'https://picsum.photos/id/104/400',
        },
      ],
    },
  },
];

module.exports = {
  mockGetChildTasks,
  mockNewWritingSub,
  mockNewDrawingSub,
  mockGetChildTeam,
  mockSubmitPoints,
  mockGetChildSquad,
  mockGetFaceoffsForMatchup,
};
