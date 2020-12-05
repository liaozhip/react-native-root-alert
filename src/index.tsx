import React from 'react';
import type RootSiblingsManager from 'react-native-root-siblings';
import RootSiblings from 'react-native-root-siblings';
import AlertContainer, { AlertContainerProps } from './AlertContainer';

type AlertProps = {
  timeout?: 'infinite' | number;
} & AlertContainerProps;

class Alert {
  static _timer: NodeJS.Timeout | null = null;
  static _alert: RootSiblingsManager | null;

  static show(
    message?: string | AlertProps,
    options: AlertProps = {}
  ): RootSiblingsManager {
    this._alert && this.hide(this._alert);
    if (typeof message === 'object') {
      options = message;
    } else {
      options.message = message;
    }
    options = {
      ...{
        visible: true,
        position: 'above',
        iconStyle: {
          size: 'small',
          color: '#ffffff',
        },
        animation: 'translateY',
        timeout: 'infinite',
      },
      ...options,
    };
    this._alert = new RootSiblings(<AlertContainer {...options} />);
    if (typeof options.timeout === 'number') {
      this._timer = setTimeout(() => {
        this.hide(this._alert!);
      }, options.timeout);
    }
    return this._alert;
  }

  static hide(_alert: RootSiblingsManager) {
    if (_alert instanceof RootSiblings) {
      _alert.destroy();
      this._timer && clearTimeout(this._timer);
    }
  }
}

export default Alert;
