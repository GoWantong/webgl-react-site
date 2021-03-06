import React, { Component } from 'react';
import injectSheet from 'react-jss';
import Beer from 'react-icons/lib/fa/beer';
import fadeTransition from '../HOC/fadeTransition';

import MoonControlSlider from './MoonControlSlider';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '50px',
    width: '25%',
    minWidth: '400px',
    fontWeight: 'bold',
    color: theme.text.hint
  },
  icon: {
    width: '100%',
    fontSize: '36px'
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    fontSize: '100px',
    color: theme.text.primary
  },
  activeSwitch: {
    width: '100%',
    color: theme.text.secondary
  },
  '@media (min-width: 1366px)': {
    root: {
      padding: '30px',
      minWidth: '300px'
    },
    icon: {
      fontSize: '25px'
    },
    title: {
      fontSize: '70px'
    }
  }
});

class MainHeader extends Component {
  render() {
    const { classes, ...others } = this.props;
    return (
      <div className={classes.root} {...others}>
        <div className={classes.icon}>
          <Beer /> DO GREAT THINGS.
        </div>
        <div className={classes.title}>
          <span>Enjoy</span>
          <span>the</span>
          <span>Life</span>
        </div>
        <MoonControlSlider />
        <span>about</span>
      </div>
    );
  }
}

// const styledMainHeader = injectSheet(styles)(MainHeader);
const animatedMainHeader = fadeTransition()(MainHeader);

export default injectSheet(styles)(animatedMainHeader);
// export default styledMainHeader;
