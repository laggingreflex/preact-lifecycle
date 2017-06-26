const { Component, h, render } = preact;

class Child extends Component {

  componentWillUpdate() {
    console.log(`will Update :`, this.props.time);
  }
  componentDidUpdate() {
    console.log(`did Update  :`, this.props.time);
  }
  render() {
    return this.props.time;
  }

}


class Parent extends Component {
  componentDidMount() {
    setInterval(() => {
      const time = new Date();
      console.log('-------------------');
      console.log(`set new time:`, time);
      this.setState({ time })
    }, 1000);
  }

  render() {
    return h(Child, { time: this.state && this.state.time });
  }

}

render(h(Parent), document.body);
