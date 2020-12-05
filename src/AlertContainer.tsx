import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {
  Text,
  Dimensions,
  StyleSheet,
  Animated,
  ActivityIndicator,
  View,
  TextStyle,
  ActivityIndicatorProps,
  FlexStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import animation from './animation';

const { width, height } = Dimensions.get('screen');

type Position = 'center' | 'above' | 'top' | 'bottom' | 'underneath';
type Type = 'success' | 'warning' | 'error' | 'loading';

type BasicProps = {
  visible?: boolean;
};

export interface AlertContainerProps {
  position?: Position;
  textStyle?: TextStyle;
  iconStyle?: ActivityIndicatorProps;
  icon?: ReactNode;
  duration?: number;
  message?: string;
  type?: Type;
  animation?: 'translateX' | 'translateY' | 'opacity';
  distance?: number;
  containerStyle?: FlexStyle;
  onShow?: () => void;
  onShown?: () => void;
  onHide?: () => void;
}

const position = {
  above: height / 4,
  top: height / 10,
  bottom: height / 1.2,
  underneath: height / 1.5,
};

const type = {
  warning: 'exclamation',
  success: 'check',
  error: 'close',
};

const AlertContainer: React.FC<AlertContainerProps & BasicProps> = (props) => {
  const { onShow, onShown, duration = 500, visible, onHide } = props;

  const fadeAnim = useRef<Animated.Value>(new Animated.Value(0)).current;
  const transformAnim = useRef<Animated.Value>(
    new Animated.Value(props.distance || 5)
  ).current;

  const transformAnimation = animation.transform(transformAnim, {
    duration: duration,
  });
  const fadeInAnimation = animation.fadeIn(fadeAnim, { duration: duration });

  const fadeInt = useCallback(() => {
    onShow && onShow();
    fadeInAnimation.start(({ finished }) => {
      if (finished) {
        onShown && onShown();
      }
    });
  }, [onShow, onShown, fadeInAnimation]);

  const parallel = useCallback(() => {
    onShow && onShow();
    Animated.parallel([transformAnimation, fadeInAnimation]).start(
      (finished) => {
        if (finished) {
          onShown && onShown();
        }
      }
    );
  }, [transformAnimation, fadeInAnimation, onShow, onShown]);

  useMemo(() => {
    if (visible) {
      props.animation === 'opacity' ? fadeInt() : parallel();
    }
  }, [fadeInt, visible, parallel, props.animation]);

  useEffect(() => {
    parallel();
    return () => {
      onHide && onHide();
    };
  });

  return (
    <View style={[styles.touch, props.position === 'center' && styles.center]}>
      <Animated.View
        style={[
          styles.container,
          props.containerStyle,
          props.position !== 'center' && {
            top: position[props.position!],
          },
          props.animation === 'opacity'
            ? {
                opacity: fadeAnim,
              }
            : {
                opacity: fadeAnim,
                transform: [{ [props.animation as string]: transformAnim }],
              },
        ]}
      >
        {props.icon ? (
          props.icon
        ) : props.type && props.type !== 'loading' ? (
          <Icon style={styles.iconStyle} name={type[props.type]} />
        ) : (
          <ActivityIndicator {...props.iconStyle} />
        )}
        {props.message ? (
          <Text style={[styles.text, props.textStyle]}>{props.message}</Text>
        ) : null}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    alignSelf: 'center',
    fontSize: 40,
    color: '#ffffff',
  },
  touch: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    top: 0,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  container: {
    width: width / 3,
    height: 80,
    borderRadius: 6,
    backgroundColor: 'rgba(0, 0, 0, .5)',
    justifyContent: 'center',
  },
  center: {
    justifyContent: 'center',
  },
});

export default React.memo(AlertContainer);
