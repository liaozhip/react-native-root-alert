import React from 'react';
import { AppState } from 'react-native';
import type RootSiblingsManager from 'react-native-root-siblings';
import RootSiblings from 'react-native-root-siblings';
import AlertContainer, { AlertContainerProps } from './AlertContainer';

type AlertProps = {
  timeout?: 'infinite' | number;
} & AlertContainerProps;

const alerts: Array<RootSiblingsManager> = [];
const timers: Array<NodeJS.Timeout> = [];

class Alert {
  static show(
    message?: string | AlertProps,
    options: AlertProps = {}
  ): RootSiblingsManager {
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
        timeout: 3000,
      },
      ...options,
    };

    if (typeof options.onHide === 'function') {
      const oldOnHide = options.onHide;
      options.onHide = () => {
        oldOnHide();
        this._clear();
      };
    } else {
      options.onHide = this._clear;
    }

    const rootSiblings: RootSiblingsManager = new RootSiblings(
      <AlertContainer {...options} />
    );

    alerts.push(rootSiblings);

    if (typeof options.timeout === 'number') {
      const timer = setTimeout(() => {
        timers.splice(timers.indexOf(timer), 1);
        AppState.currentState === 'background' || this.hide(rootSiblings);
      }, options.timeout);
      timers.push(timer);
    }

    return rootSiblings;
  }

  static _clear() {
    if (AppState.currentState === 'background') {
      timers.forEach((timer) => {
        clearTimeout(timer);
      });
    }
  }

  static hide(rootSiblings: RootSiblingsManager) {
    const index = alerts.indexOf(rootSiblings);
    const alert = alerts[index];
    if (alert instanceof RootSiblings) {
      alert.destroy();
      alerts.splice(index, 1);
    }
  }
}

export default Alert;
