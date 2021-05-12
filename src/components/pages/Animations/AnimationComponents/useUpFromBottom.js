import { useSpring } from 'react-spring';

const useUpFromBottom = ref => {
  const spring = useSpring({
    delay: 14000,
    config: { mass: 100, tension: 10000, friction: 200 },
    from: {
      position: 'absolute',
      opacity: 0,
      transform: 'translate3d(-550%, 200%, 0px) scale(1)',
    },
    to: [
      {
        opacity: 1,
        transform: 'translate3d(0%, 0%, 0px) scale(2.25)',
      },
    ],
    ref: ref,
  });
  return spring;
};

export default useUpFromBottom;
