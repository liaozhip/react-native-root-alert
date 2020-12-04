import React, { useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Text,
  Dimensions,
  StyleSheet,
  Animated,
  TouchableNativeFeedback,
} from 'react-native';

const { width, height } = Dimensions.get('screen');

type Position = 'center' | 'above' | 'top' | 'bottom' | 'underneath';

interface AlertProps {
  position?: Position;
}

const AlertContainer: React.FC<AlertProps> = (props) => {
  const fadeAnim = useRef<Animated.Value>(new Animated.Value(0)).current;
  // 动画状态
  const [_animating, set_Animating] = useState<boolean>(false);

  const fadeInt = () => {
    set_Animating(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(({ finished }) => {
      finished && set_Animating(false);
    });
  };

  const fadeOut = () => {
    set_Animating(true);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(({ finished }) => {
      finished && set_Animating(false);
    });
  };

  const onPressIn = (): void => {
    _animating ? fadeInt() : fadeOut();
  };

  return (
    <TouchableNativeFeedback onPressIn={onPressIn}>
      <Animated.View
        style={[
          styles.container,
          styles[props.position || 'above'],
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <Icon name="phone" />
        <Text>Alert</Text>
      </Animated.View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    alignSelf: 'center',
    alignItems: 'center',
    flex: 1,
  },
  center: {
    justifyContent: 'center',
  },
  above: {
    paddingVertical: height / 4,
  },
  top: {
    paddingVertical: height / 10,
  },
  bottom: {
    paddingVertical: height / 1.2,
  },
  underneath: {
    paddingVertical: height / 1.5,
  },
});

export default AlertContainer;
