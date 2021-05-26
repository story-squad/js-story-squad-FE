import { useSpring } from 'react-spring';
import useMedia from '../AnimationMediaHelper/useMedia';

const useGoBackButton = ref => {
  const desktopScreen = useMedia('(min-width:1440px)');
  const tabletScreen = useMedia('(max-width:1024px)');

  const spring = useSpring({
    from: {
      opacity: 0,
      transform: desktopScreen
        ? 'translate3d(0%, 475%, 0px) scale(1)'
        : tabletScreen
        ? 'translate3d(-300%, 2%, 0px) scale(1)'
        : 'translate3d(-620%, 2%, 0px) scale(1)',
      position: 'absolute',
    },
    to: {
      opacity: 1,
    },
    ref: ref,
  });
  return spring;
};

export default useGoBackButton;
