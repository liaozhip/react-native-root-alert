import * as React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Alert from 'react-native-alert';
import RootSiblingsManager, {
  RootSiblingParent,
} from 'react-native-root-siblings';

export default function App() {
  const alert = React.useRef<RootSiblingsManager>();

  function onPress() {
    alert.current = Alert.show('请求中...', {
      type: 'loading',
      // animation: 'translateY',
      // timeout: 5000,
    });
  }

  return (
    <RootSiblingParent>
      <TouchableOpacity style={styles.fadeIn} onPress={onPress}>
        <Text>点击显示</Text>
      </TouchableOpacity>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  fadeIn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
