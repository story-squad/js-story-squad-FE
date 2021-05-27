import { useSpring } from 'react-spring';
import useMedia from '../AnimationMediaHelper/useMedia.js';

const useEnlargeCenterToTopRight = ref => {
  const desktopScreen = useMedia('(min-width:1440px)');
  const tabletScreen = useMedia('(max-width:1024px)');

  const spring = useSpring({
    delay: 8000,
    config: { mass: 10, tension: 500, friction: 150 },
    from: {
      opacity: 0,
      transform: 'translate3d(0%, 0%, 0px) scale(1)',
      position: 'absolute',
    },
    to: [
      {
        opacity: 1,
        transform: desktopScreen
          ? 'translate3d(150%, 0%, 0px) scale(4)'
          : tabletScreen
          ? 'translate3d(0%, 400%, 0px) scale(3)'
          : 'translate3d(0%, 0%, 0px) scale(4)',
      },
      {
        opacity: 1,
        transform: desktopScreen
          ? 'translate3d(150%, 0%, 0px) scale(4)'
          : tabletScreen
          ? 'translate3d(0%, 400%, 0px) scale(3)'
          : 'translate3d(0%, 0%, 0px) scale(4)',
      },
      {
        opacity: 1,
        transform: desktopScreen
          ? 'translate3d(300%, 0%, 0px) scale(4)'
          : tabletScreen
          ? 'translate3d(0%, 400%, 0px) scale(3)'
          : 'translate3d(0%, 0%, 0px) scale(4)',
      },
      {
        opacity: 1,
        transform: desktopScreen
          ? 'translate3d(500%, -250%, 0px) scale(1.5)'
          : tabletScreen
          ? 'translate3d(-475%, 200%, 0px) scale(1.5)'
          : 'translate3d(-550%, -250%, 0px) scale(1.5)',
      },
    ],
    ref: ref,
  });
  return spring;
};

export default useEnlargeCenterToTopRight;
