// Base class for the site's controller (ported from the Claude Design runtime).
// State updates apply synchronously, so code can read `this.state` right after
// `setState`; the React host (LogicHost) then re-renders.
export class Logic {
  state = {};

  constructor(props) {
    this.props = props || {};
    this.__host = null;
  }

  setState(update, cb) {
    this.__host && this.__host.applyLogicState(update, cb);
  }

  forceUpdate() {
    this.__host && this.__host.forceUpdate();
  }

  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}

  /** Values the view renders with (merged over props). */
  renderVals() {
    return {};
  }
}
