import { useSpring } from 'react-spring';

const useEnlargeVs = ref => {
  const spring = useSpring({
    delay: 9500,
    config: { mass: 10, tension: 4800, friction: 100 },
    from: {
      position: 'absolute',
      opacity: 0,
      transform: 'translate3d(0%, 600%, 0px) scale(5)',
    },
    to: [
      {
        opacity: 1,
        transform: 'translate3d(0%, 600%, 0px) scale(10)',
      },

      {
        config: { duration: 3600 },
        opacity: 1,
        transform: 'translate3d(0%, 600%, 0px) scale(10)',
      },
      {
        opacity: 0,
        transform: 'translate3d(0%, 600%, 0px) scale(7)',
      },
    ],
    ref: ref,
  });
  return spring;
};

export default useEnlargeVs;
