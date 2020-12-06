# react-native-root-alert

An alert component based on react-native-root-siblings

## Installation

```sh
npm install react-native-root-siblings react-native-root-alert
# 或者
yarn add react-native-root-siblings react-native-root-alert
```

## Usage

```js
// 首先要将需要显示的页面包裹起来
import { RootSiblingParent } from 'react-native-root-siblings';

<RootSiblingParent>
  <App />
</RootSiblingParent>
```

```js
import Alert from "react-native-root-alert";

// ...

// show
const alert = Alert.show('请求中...', options);

// hide
Alert.hide(alert);
```

### options
`timeout`
- 类型：`number | 'infinite'`
- 弹窗显示时长：`默认 3000`。

`duration`
- 类型：`number`
- 动画持续时长：`默认 500`。

`position`
- 类型：`center | above | top | bottom | underneath`
- 显示位置：`默认 above`。

`textStyle`
- 类型：`style`
- 文字样式。

`iconStyle`
- 类型：`style`
- 图标样式。

`icon`
- 类型：`ReactNode`
- 图标。

`type`
- 类型：`success | warning | error | loading`
- 弹窗类型：`默认 loading`。

`animation`
- 类型：`translateX | translateY | opacity`
- 动画类型：`默认 translateY`。

`distance`
- 类型：`number`
- `animation`不为`opacity`时的动画移动距离: `默认 5`。

`containerStyle`
- 类型：`style`
- 弹窗容器的样式。

`onShow`
- 类型：`Function`
- 弹窗显示时触发。

`onHide`
- 类型：`Function`
- 弹窗消失时触发。

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
