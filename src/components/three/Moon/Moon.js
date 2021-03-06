// @flow

import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import { Clock } from 'three';
import injectSheet from 'react-jss';
import classnames from 'classnames';
import createMoon from './MoonThree';

const styles = {
  root: {
    position: 'fixed',
    bottom: '0px',
    left: '0px',
    right: '0px',
    top: '0px'
  },
  done: {
    pointerEvents: 'none'
  }
};

type Props = {
  classes: Object,
  endCameraAnimate: Function,
  isCameraAnimateEnd: boolean
};

type State = {
  done: boolean,
  cameraX: number,
  cameraY: number,
  cameraZ: number,
  primaryLightX: number,
  primaryLightY: number,
  primaryLightZ: number
};

class Moon extends Component<Props, State> {
  state = {
    done: false,
    cameraX: 0,
    cameraY: 0,
    cameraZ: 1000,
    primaryLightX: -1,
    primaryLightY: 0,
    primaryLightZ: 0
  };

  animate = window.requestAnimationFrame.bind(window);

  element: ?HTMLDivElement;
  moon: Object;
  theta: number;
  clock: Object;

  componentWillMount() {
    this.theta = 0;
    this.clock = new Clock();
  }

  componentDidMount() {
    if (this.element) {
      this.moon = createMoon(this.element);
      this.moon.init();
      this.moon.animate();
      this.clock.start();
      this.startAnimation();
      // setTimeout(this.cameraAnimation, 2000); // 两秒后开始摄像机动画
      this.cameraAnimation();
    }
  }

  handlePrimaryLightPosition = (
    primaryLightX: number,
    primaryLightY: number,
    primaryLightZ: number
  ) => {
    this.setState({ primaryLightX, primaryLightY, primaryLightZ });
  };

  handleCameraPosition = (
    cameraX: number,
    cameraY: number,
    cameraZ: number
  ) => {
    this.setState({ cameraX, cameraY, cameraZ });
  };

  startAnimation = () => {
    let delta = this.clock.getDelta();
    const dTheta = delta * Math.PI; // 每秒转动角度 θ 为 PI， 即两秒转一周
    this.theta = this.theta >= Math.PI * 2 ? 0 : this.theta + dTheta;
    this.animate = this.theta >= Math.PI * 2 ? null : this.animate;
    const x = Math.sin(this.theta);
    const z = Math.cos(this.theta);
    this.setState({
      primaryLightX: x,
      primaryLightZ: z
    });
    this.animate && this.animate(this.startAnimation);
  };

  cameraAnimation = () => {
    this.moon && this.moon.cleanBackground();
    this.setState({
      cameraY: 66,
      cameraZ: 360,
      primaryLightX: 0,
      primaryLightZ: 1,
      done: true
    });
  };

  render() {
    const { classes } = this.props;
    const { primaryLightX, primaryLightY, primaryLightZ } = this.state;
    const { cameraX, cameraY, cameraZ } = this.state;
    const moon = this.moon && this.moon;
    const classNames = classnames({
      [classes.root]: true,
      [classes.done]: this.state.done
    });

    moon &&
      moon.setPrimaryLightPosition(primaryLightX, primaryLightY, primaryLightZ);

    moon && moon.setCameraPosition(cameraX, cameraY, cameraZ);

    return (
      <Motion
        style={{
          cameraX: spring(this.state.cameraX, { stiffness: 20, damping: 12 }),
          cameraY: spring(this.state.cameraY, { stiffness: 20, damping: 12 }),
          cameraZ: spring(this.state.cameraZ, { stiffness: 20, damping: 12 })
        }}
      >
        {({
          cameraX,
          cameraY,
          cameraZ,
          primaryLightX,
          primaryLightY,
          primaryLightZ
        }) => {
          moon && moon.setCameraPosition(cameraX, cameraY, cameraZ);
          if (!this.props.isCameraAnimateEnd) {
            if (cameraZ <= 365) {
              this.props.endCameraAnimate();
            }
          }
          return <div className={classNames} ref={e => (this.element = e)} />;
        }}
      </Motion>
    );
  }
}

export default injectSheet(styles)(Moon);
