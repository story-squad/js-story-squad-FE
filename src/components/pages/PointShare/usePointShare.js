import { useState, useMemo, useEffect } from 'react';

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
    setPoints({
      ...points,
      [childNum]: { ...points[childNum], [type]: payload },
    });
  };

  const pointsUsed = () => {
    console.log(points.childOne.illustration);
    console.log(points);
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

  const pointsLeft = useMemo(() => calculatePointsLeft(), [points]);

  // useEffect(() => {
  //   calculatePointsLeft();
  // }, [points]);

  return [pointsLeft, points, handleUpdatePoints];
};
export default usePointShare;
