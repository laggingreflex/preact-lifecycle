
Given an app with a parent component updating child with some props:

```js
class Parent extends Component {
  componentDidMount() {
    setInterval(() => {
      const time = new Date();
      console.log(`set new time:`, time);
      this.setState({ time })
    }, 1000);
  }
  render() {
    return h(Child, { time: this.state.time });
  }
}

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
```

It fires the `componentDidUpdate` with the latest `time` but `componentWillUpdate` with a *previous* one...

```
set new time: Mon Jun 26 2017 09:32:24  //    time set by parent
will Update : Mon Jun 26 2017 09:32:23  // <- child's componentWillUpdate is 1 sec behind
did Update  : Mon Jun 26 2017 09:32:24  //    child's componentDidUpdate is correct (latest)
```

Shouldn't it be like this?:

```
set new time: Mon Jun 26 2017 09:32:24  //    time set by parent
will Update : Mon Jun 26 2017 09:32:24  // <- child's componentWillUpdate same as the other two
did Update  : Mon Jun 26 2017 09:32:24  //    child's componentDidUpdate is correct (latest)
```

