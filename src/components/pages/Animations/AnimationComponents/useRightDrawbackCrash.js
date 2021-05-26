import { useSpring } from 'react-spring';
import useMedia from '../AnimationMediaHelper/useMedia.js';

const useRightDrawbackCrash = ref => {
  const desktopScreen = useMedia('(min-width:1440px)');
  const tabletScreen = useMedia('(min-width:1024px)');

  const spring = useSpring({
    delay: 13000,
    from: {
      opacity: 0,
      transform: desktopScreen
        ? 'translate3d(4000%, 0%, 0px) scale(2.25)'
        : tabletScreen
        ? 'translate3d(-5%, 18%, 0px) scale(1.5)'
        : 'translate3d(-5%, 23%, 0px) scale(1.5)',
    },
    to: [
      {
        opacity: 1,
        transform: desktopScreen
          ? 'translate3d(4000%, 0%, 0px) scale(2.25)'
          : tabletScreen
          ? 'translate3d(-300%, 18%, 0px) scale(1.5)'
          : 'translate3d(-300%, 23%, 0px) scale(1.5)',
      },
      {
        opacity: 0,
        transform: desktopScreen
          ? 'translate3d(0%, 0%, 0px) scale(2.25)'
          : tabletScreen
          ? 'translate3d(0%, 18%, 0px) scale(1.5)'
          : 'translate3d(0%, 23%, 0px) scale(1.5)',
      },
      {
        opacity: 0,
        transform: desktopScreen
          ? 'translate3d(0%, 0%, 0px) scale(2.25)'
          : tabletScreen
          ? 'translate3d(0%, 18%, 0px) scale(1.5)'
          : 'translate3d(0%, 23%, 0px) scale(1.5)',
      },
    ],
    ref: ref,
  });
  return spring;
};

export default useRightDrawbackCrash;
