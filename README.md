# react-native-root-alert

An alert component based on react-native-root-siblings

## Installation

```sh
npm install react-native-root-alert
npm install react-native-root-siblings
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
- 弹窗显示时长：`infinite 默认`

`duration`
- 动画持续时长：`500 默认`

`position`
- 显示位置：`center`, `above 默认`, `top`, `bottom`, `underneath`

`textStyle`
- 文字样式：`style`

`iconStyle`
- 图标样式：`style`

`icon`
- 显示图标：`Component`

`type`
- 类型：`success`, `warning`, `error`, `loading 默认`

`animation`
- 动画类型：`translateX`, `translateY 默认`, `opacity`

`distance`
- 动画移动距离: `5 默认`

`containerStyle`
- 容器样式: `style`

`onShow`
- 监听显示: `Function`

`onHide`
- 监听隐藏: `Function`

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
