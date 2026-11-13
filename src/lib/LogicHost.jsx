import { Component } from 'react';

// Connects a Logic controller to React: owns the controller instance,
// forwards lifecycle calls, and renders `View` with { ...props, ...renderVals() }.
export default class LogicHost extends Component {
  constructor(props) {
    super(props);
    const { logic: LogicClass, view, ...rest } = props;
    this.logic = new LogicClass(rest);
    this.logic.__host = this;
    this.state = { tick: 0 };
  }

  applyLogicState(update, cb) {
    const prev = this.logic.state;
    const patch = typeof update === 'function' ? update(prev) : update;
    this.logic.state = { ...prev, ...patch };
    this.setState((s) => ({ tick: s.tick + 1 }), cb);
  }

  userProps() {
    const { logic, view, ...rest } = this.props;
    return rest;
  }

  componentDidMount() {
    this.logic.componentDidMount();
  }

  componentDidUpdate(prevProps) {
    this.logic.componentDidUpdate(prevProps);
  }

  componentWillUnmount() {
    this.logic.componentWillUnmount();
  }

  render() {
    const View = this.props.view;
    const props = this.userProps();
    this.logic.props = props;
    const v = { ...props, ...(this.logic.renderVals() || {}) };
    return (
      <div className="app-host">
        <View v={v} />
      </div>
    );
  }
}
