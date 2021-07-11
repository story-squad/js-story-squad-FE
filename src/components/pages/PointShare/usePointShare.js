import { useState, useMemo } from 'react';

const initialPoints = {
  childOne: { illustration: 10, story: 10 },
  childTwo: { illustration: 10, story: 10 },
};

const usePointShare = () => {
  // This state holds all of the given points, is used to calculate points remaining
  const [points, setPoints] = useState(initialPoints);
  const totalPoints = 100;

  // state handler, set up so children can be passed generalized props (i.e. childNum) and use them to update nested state
  const handleUpdatePoints = (childNum, type, payload) => {
    const diff = payload - points[childNum][type];

    // Antd InputNumber doesn't type check manual inputs to match min/max, etc, hence the following code.
    if (calculatePointsLeft() < diff || payload > 70 || payload < 10) {
      return;
    }
    setPoints({
      ...points,
      [childNum]: { ...points[childNum], [type]: payload },
    });
  };

  const pointsUsed = () => {
    return (
      points.childOne.illustration +
      points.childOne.story +
      points.childTwo.illustration +
      points.childTwo.story
    );
  };

  const calculatePointsLeft = () => {
    return totalPoints - pointsUsed();
  };
// eslint-disable-next-line
  const pointsLeft = useMemo(() => calculatePointsLeft(), [points]);

  return [pointsLeft, points, handleUpdatePoints];
};
export default usePointShare;
