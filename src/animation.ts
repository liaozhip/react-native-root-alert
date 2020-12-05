import { Animated, Easing } from 'react-native';

type ExtendsType<T> = {
  [P in keyof T]?: T[P];
};

type TimingAnimationConfig = ExtendsType<Animated.TimingAnimationConfig>;

const transform = (
  transformAnim: Animated.Value,
  options?: TimingAnimationConfig
): Animated.CompositeAnimation => {
  return Animated.timing(transformAnim, {
    toValue: 0,
    easing: Easing.linear,
    useNativeDriver: true,
    ...options,
  });
};

const fadeIn = (
  fadeAnim: Animated.Value,
  options?: TimingAnimationConfig
): Animated.CompositeAnimation => {
  return Animated.timing(fadeAnim, {
    toValue: 1,
    easing: Easing.linear,
    useNativeDriver: true,
    ...options,
  });
};

export default {
  transform,
  fadeIn,
};
