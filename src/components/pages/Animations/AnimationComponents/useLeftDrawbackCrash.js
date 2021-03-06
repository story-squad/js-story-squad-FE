import { useSpring } from 'react-spring';
import useMedia from '../AnimationMediaHelper/useMedia.js';

const useLeftDrawbackCrash = ref => {
  const desktopScreen = useMedia('(min-width:1024px)');
  const tabletScreen = useMedia('(min-width:768px)');

  const spring = useSpring({
    delay: 13000,
    from: {
      opacity: 0,
      transform: desktopScreen
        ? 'translate3d(-600%, 0%, 0px) scale(2.25)'
        : tabletScreen
        ? 'translate3d(-350%, 18%, 0px) scale(2.25)'
        : 'translate3d(-5%, 23%, 0px) scale(1.5)',
    },
    to: [
      {
        opacity: 1,
        transform: desktopScreen
          ? 'translate3d(-600%, 0%, 0px) scale(2.25)'
          : tabletScreen
          ? 'translate3d(-350%, 0%, 0px) scale(2.25)'
          : 'translate3d(-300%, 23%, 0px) scale(1.5)',
      },
      {
        opacity: 0,
        transform: desktopScreen
          ? 'translate3d(0%, 0%, 0px) scale(2.25)'
          : tabletScreen
          ? 'translate3d(0%, 0%, 0px) scale(2.25)'
          : 'translate3d(0%, 23%, 0px) scale(1.5)',
      },
      {
        opacity: 0,
        transform: desktopScreen
          ? 'translate3d(0%, 0%, 0px) scale(2.25)'
          : tabletScreen
          ? 'translate3d(0%, 0%, 0px) scale(2.25)'
          : 'translate3d(0%, 23%, 0px) scale(1.5)',
      },
    ],
    ref: ref,
  });
  return spring;
};

export default useLeftDrawbackCrash;
