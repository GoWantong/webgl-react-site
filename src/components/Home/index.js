import React, { Component } from 'react';
import injectSheet from 'react-jss';
import MainHeader from './MainHeader';
import Nav from './Nav';
import SubHeader from './SubHeader';
// import Moon from '../three/Moon/Moon';
// import Laptop from '../three/Laptop/Laptop';
import Ball from '../three/Ball/Ball';
// import Cube from '../three/Cube/Cube';

const styles = theme => ({
  root: {
    position: 'fixed',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    background: theme.background.default
  }
});

function Home(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <MainHeader />
      <Nav />
      <SubHeader />
      {/* <Moon /> */}
      {/* <Laptop /> */}
      <Ball />
      {/* <Cube /> */}
    </div>
  );
}

export default injectSheet(styles)(Home);
