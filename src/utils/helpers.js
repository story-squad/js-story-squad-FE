export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export const modalInstructions = {
  childDash: {
    header: 'Welcome to Story Squad',
    text: 'Accept the mission to start your adventure!',
  },
  missionControl1: {
    header: 'Your time to shine!',
    text:
      'Grab a sheet of paper and your drawing supplies. It’s time to get creative!',
  },
  missionControl2: {
    header: 'Write a side quest',
    text:
      'Grab your favorite pencil and some loose leaf sheets of paper.  Put on your storyteller hat and let your pencil fly!',
  },
  missionControl3: {
    header: 'Your story has been submitted, great job!',
    text:
      'Check back on Wednesday to join your squad, meet your partner, & share points.',
  },
  writingSub:
    'Once you finish writing your story, please take a picture of all your pages and upload them.\nTips: Take one photo per page. Find good Lighting and check your photo turns out clear. Make sure each page is straight and not cropped. After all pages are uploaded, click submit.',
  drawingSub:
    'Once you finish your drawing, please take a picture of all your pages and upload them.\nTips: Take one photo per page. Find good Lighting and check your photo turns out clear. Make sure each page is straight and not cropped. After all pages are uploaded, click submit.',
  submissionComplete: 'Your Story has been submitted',
  sharePointsSubmission: {
    header: 'Submitted Points',
    text: 'You submitted points. This text should be updated.',
  },
  matchUp:
    "Welcome to this week's matchup. Please vote 3 times to unlock matchup scores. You may continue voting up to 10 times.",
  pointsSharingInstructions: [
    "Now it's time to split up 100 points across your squad's portfolio of stories and drawings.  You must put a minimum of 10 points on each and the total among all 4 must add up to 100 points.",
    'As you read both stories and look at both drawings, think about which ones best reflect the characters, plot, and setting from the chapters you read. Share the most points with the ones you think are the best.',
  ],
};

export const getMissionControlText = step => {
  if (step === 'draw') {
    return modalInstructions.missionControl1;
  } else if (step === 'write') {
    return modalInstructions.missionControl2;
  } else if (step === 'done') {
    return modalInstructions.missionControl3;
  } else {
    return { header: '', text: '' };
  }
};

export const progressInfo = {
  welcome: 'Welcome to the Progress Page!',
  explanation:
    "Below you will see some graphs representing what we at Story Squad call our 'Squad Score'. What exactly is a Squad Score? We're glad you asked!",
  isTitle: 'What Squad Score IS:',
  is: [
    'Built just for use in the context of Story Squad, attempting to capture qualitative writing features in quantitative terms',
    'Based on text analysis we conduct automatically on every submitted story',
    'Made up of some factors based on real writing complexity measures (such as grammatical syntax, vocabulary word usage, word length, etc) and others geared specifically toward measures of creative writing',
    'Used to show a child’s “progress” and to group kids into their weekly squad with other children who had similar Squad Scores on their submissions that week',
  ],
  isNotTitle: 'What Squad Score is NOT:',
  isNot: [
    'Intended to be an indicator of your child’s writing ability',
    'Free from error -- while messy handwriting or spelling mistakes are not penalized, they can impact transcription accuracy, which in turn can cause variability in their Squad Score',
    'A replacement for a formal or school-based writing skills assessment',
  ],
  ending:
    "We provide you with these visualizations so you can be involved and engaged in your child's Story Squad experience. Feel free to check this page regularly, because we'll update it weekly with every new submission!",
};

export const toCapitalized = string => {
  return string
    .split('')
    .map((char, i) => {
      if (i === 0) {
        return char.toUpperCase();
      } else {
        return char.toLowerCase();
      }
    })
    .join('');
};

// get names and avatarURLs of users on each team
export const getTeamsFromFaceoffs = faceoffs => {
  const teams = { 1: [], 2: [] };
  faceoffs.forEach(faceoff => {
    if (!teams[1].some(team => team.Name === faceoff.Submission1.Name)) {
      teams[1].push({
        Name: faceoff.Submission1.Name,
        AvatarURL: faceoff.Submission1.AvatarURL,
      });
    }
  });
  faceoffs.forEach(faceoff => {
    if (!teams[2].some(team => team.Name === faceoff.Submission2.Name)) {
      teams[2].push({
        Name: faceoff.Submission2.Name,
        AvatarURL: faceoff.Submission2.AvatarURL,
      });
    }
  });
  return teams;
};

export const modalPush = (push, url) => {
  if (process.env.REACT_APP_ENV === 'development') {
    push(url);
  } else {
    push('/child/dashboard');
  }
};
