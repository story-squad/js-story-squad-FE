import { useSpring } from 'react-spring';
import useMedia from '../AnimationMediaHelper/useMedia.js';

// This is the crash image component
const useEnlargeCenter = ref => {
  const desktopScreen = useMedia('(min-width:1440px)');
  const tabletScreen = useMedia('(min-width:1024px)');

  const spring = useSpring({
    delay: 13900,
    config: { mass: 100, tension: 10000, friction: 200 },
    from: {
      opacity: 0,
      transform: desktopScreen
        ? 'translate3d(0%, 50%, 0px) scale(1)'
        : tabletScreen
        ? 'translate3d(0%, -35%, 0px) scale(1)'
        : 'translate3d(0%, -35%, 0px) scale(1)',
    },
    to: [
      {
        opacity: 1,
        transform: desktopScreen
          ? 'translate3d(0%, 30%, 0px) scale(7)'
          : tabletScreen
          ? 'translate3d(0%, -35%, 0px) scale(6)'
          : 'translate3d(0%, 0%, 0px) scale(6)',
      },
      {
        opacity: 1,
        transform: desktopScreen
          ? 'translate3d(0%, 30%, 0px) scale(5)'
          : tabletScreen
          ? 'translate3d(0%, -35%, 0px) scale(5)'
          : 'translate3d(0%, 10000%, 0px) scale(8)',
      },
    ],
    ref: ref,
  });
  return spring;
};

export default useEnlargeCenter;
