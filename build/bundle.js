'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var PropTypes = _interopDefault(require('prop-types'));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function bindToSilo(ComponentToBind) {
  var WrapperFunction =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(WrapperFunction, _React$Component);

    function WrapperFunction() {
      var _this;

      _classCallCheck(this, WrapperFunction);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(WrapperFunction).call(this));
      _this.siloRender = _this.siloRender.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }

    _createClass(WrapperFunction, [{
      key: "componentWillMount",
      value: function componentWillMount() {
        var silo = this.context.silo;
        this.unsubscribe = silo.subscribe(this.siloRender, ComponentToBind.prototype.constructor.name + 'State');
      }
    }, {
      key: "render",
      value: function render() {
        var silo = this.context.silo;
        var newState = {};

        if (this.updatedState) {
          newState = this.updatedState;
        }

        return React.createElement(ComponentToBind, _extends({}, this.props, newState));
      }
    }, {
      key: "siloRender",
      value: function siloRender(updatedState) {
        this.previousUpdate = this.updatedState;
        this.updatedState = updatedState;
        this.forceUpdate();
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.unsubscribe();
      }
    }, {
      key: "render",
      value: function render() {
        var newState = {}; // this.updatedState is set when siloRender is run

        if (this.updatedState) {
          newState = this.updatedState;
        } // pass in dev written props and the siloState


        return React.createElement(ComponentToBind, _extends({}, this.props, newState));
      }
    }, {
      key: "siloRender",
      value: function siloRender(updatedState) {
        // wrapperfunction now has a variable called updatedState
        this.updatedState = updatedState; // part of react, calls render function

        this.forceUpdate();
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        // unsubscribe removes the relevant render function from the subscribers array
        this.unsubscribe();
      }
    }]);

    return WrapperFunction;
  }(React.Component); // looking for something called silo that is an object 


  WrapperFunction.contextTypes = {
    silo: PropTypes.object
  };
  return WrapperFunction;
}

function bindObjectToSilo(ComponentToBind, key, siloObject) {
  var WrapperFunction =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(WrapperFunction, _React$Component);

    function WrapperFunction() {
      var _this;

      _classCallCheck(this, WrapperFunction);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(WrapperFunction).call(this));
      _this.siloRender = _this.siloRender.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }

    _createClass(WrapperFunction, [{
      key: "componentWillMount",
      value: function componentWillMount() {
        this.unsubscribe = siloObject.keySubscribe(key, this.siloRender);
      }
    }, {
      key: "render",
      value: function render() {
        var newState = {};

        if (this.updatedState) {
          newState = this.updatedState;
        }

        return React.createElement(ComponentToBind, _extends({}, this.props, newState));
      }
    }, {
      key: "siloRender",
      value: function siloRender(updatedState) {
        this.updatedState = updatedState;
        this.forceUpdate();
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.unsubscribe();
      }
    }]);

    return WrapperFunction;
  }(React.Component); // dont need


  WrapperFunction.contextTypes = {
    silo: PropTypes.object
  };
  return WrapperFunction;
}

var ProviderComponent =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ProviderComponent, _React$Component);

  function ProviderComponent() {
    _classCallCheck(this, ProviderComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(ProviderComponent).apply(this, arguments));
  }

  _createClass(ProviderComponent, [{
    key: "getChildContext",
    // function definition provided by react, called by this.context
    value: function getChildContext() {
      return {
        silo: this.props.silo
      };
    }
  }, {
    key: "render",
    value: function render() {
      // this.props.children are any elements listed inside the component (like App)
      return React.createElement("div", null, " ", this.props.children, " ");
    }
  }]);

  return ProviderComponent;
}(React.Component); // we are telling it what we are going to provide


ProviderComponent.childContextTypes = {
  silo: PropTypes.object
};

var bindToSilo$1 = bindToSilo;
var bindObjectToSilo$1 = bindObjectToSilo;
var Provider = ProviderComponent;

exports.bindToSilo = bindToSilo$1;
exports.bindObjectToSilo = bindObjectToSilo$1;
exports.Provider = Provider;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9yZWFjdEJpbmRpbmdzL2JpbmRUb1NpbG8uanMiLCIuLi9yZWFjdEJpbmRpbmdzL2JpbmRPYmplY3RUb1NpbG8uanMiLCIuLi9yZWFjdEJpbmRpbmdzL1Byb3ZpZGVyLmpzIiwiLi4vcmVhY3RCaW5kaW5ncy9yZWFjdEJpbmRpbmdzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnOyBcblxuZnVuY3Rpb24gYmluZFRvU2lsbyhDb21wb25lbnRUb0JpbmQpIHtcbiAgICBjbGFzcyBXcmFwcGVyRnVuY3Rpb24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLnNpbG9SZW5kZXIgPSB0aGlzLnNpbG9SZW5kZXIuYmluZCh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgICAgIGNvbnN0IHtzaWxvfSA9IHRoaXMuY29udGV4dDtcbiAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUgPSBzaWxvLnN1YnNjcmliZSh0aGlzLnNpbG9SZW5kZXIsIENvbXBvbmVudFRvQmluZC5wcm90b3R5cGUuY29uc3RydWN0b3IubmFtZSArICdTdGF0ZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVuZGVyKCkge1xuICAgICAgICAgICAgY29uc3Qge3NpbG99ID0gdGhpcy5jb250ZXh0O1xuICAgICAgICAgICAgbGV0IG5ld1N0YXRlID0ge307XG4gICAgICAgICAgICBpZih0aGlzLnVwZGF0ZWRTdGF0ZSkge1xuICAgICAgICAgICAgICAgIG5ld1N0YXRlID0gdGhpcy51cGRhdGVkU3RhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gKDxDb21wb25lbnRUb0JpbmQgey4uLnRoaXMucHJvcHN9IHsuLi5uZXdTdGF0ZX0vPilcbiAgICAgICAgfVxuXG4gICAgICAgIHNpbG9SZW5kZXIodXBkYXRlZFN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzVXBkYXRlID0gdGhpcy51cGRhdGVkU3RhdGU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZWRTdGF0ZSA9IHVwZGF0ZWRTdGF0ZTtcbiAgICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICBsZXQgbmV3U3RhdGUgPSB7fTtcbiAgICAgIC8vIHRoaXMudXBkYXRlZFN0YXRlIGlzIHNldCB3aGVuIHNpbG9SZW5kZXIgaXMgcnVuXG4gICAgICBpZiAodGhpcy51cGRhdGVkU3RhdGUpIHtcbiAgICAgICAgICBuZXdTdGF0ZSA9IHRoaXMudXBkYXRlZFN0YXRlO1xuICAgICAgfVxuICAgICAgLy8gcGFzcyBpbiBkZXYgd3JpdHRlbiBwcm9wcyBhbmQgdGhlIHNpbG9TdGF0ZVxuICAgICAgcmV0dXJuICg8Q29tcG9uZW50VG9CaW5kIHsuLi50aGlzLnByb3BzfSB7Li4ubmV3U3RhdGV9Lz4pXG4gICAgfVxuXG4gICAgc2lsb1JlbmRlcih1cGRhdGVkU3RhdGUpIHtcbiAgICAgIC8vIHdyYXBwZXJmdW5jdGlvbiBub3cgaGFzIGEgdmFyaWFibGUgY2FsbGVkIHVwZGF0ZWRTdGF0ZVxuICAgICAgdGhpcy51cGRhdGVkU3RhdGUgPSB1cGRhdGVkU3RhdGU7XG4gICAgICAvLyBwYXJ0IG9mIHJlYWN0LCBjYWxscyByZW5kZXIgZnVuY3Rpb25cbiAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgIC8vIHVuc3Vic2NyaWJlIHJlbW92ZXMgdGhlIHJlbGV2YW50IHJlbmRlciBmdW5jdGlvbiBmcm9tIHRoZSBzdWJzY3JpYmVycyBhcnJheVxuICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGxvb2tpbmcgZm9yIHNvbWV0aGluZyBjYWxsZWQgc2lsbyB0aGF0IGlzIGFuIG9iamVjdCBcbiAgV3JhcHBlckZ1bmN0aW9uLmNvbnRleHRUeXBlcyA9IHtcbiAgICAgIHNpbG86IFByb3BUeXBlcy5vYmplY3RcbiAgfVxuXG4gIHJldHVybiBXcmFwcGVyRnVuY3Rpb247XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJpbmRUb1NpbG87IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbi8vIHNpbG9PYmplY3QgaXMgcGFzc2VkIGluIHRvIGhhdmUgYWNjZXNzIHRvIGtleVN1YnNjcmliZSBmdW5jdGlvblxuZnVuY3Rpb24gYmluZE9iamVjdFRvU2lsbyhDb21wb25lbnRUb0JpbmQsIGtleSwgc2lsb09iamVjdCkge1xuICBjbGFzcyBXcmFwcGVyRnVuY3Rpb24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHRoaXMuc2lsb1JlbmRlciA9IHRoaXMuc2lsb1JlbmRlci5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmUgPSBzaWxvT2JqZWN0LmtleVN1YnNjcmliZShrZXksIHRoaXMuc2lsb1JlbmRlcik7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgbGV0IG5ld1N0YXRlID0ge307XG4gICAgICBpZiAodGhpcy51cGRhdGVkU3RhdGUpIHtcbiAgICAgICAgICBuZXdTdGF0ZSA9IHRoaXMudXBkYXRlZFN0YXRlO1xuICAgICAgfVxuICAgICAgcmV0dXJuICg8Q29tcG9uZW50VG9CaW5kIHsuLi50aGlzLnByb3BzfSB7Li4ubmV3U3RhdGV9Lz4pXG4gICAgfVxuXG4gICAgc2lsb1JlbmRlcih1cGRhdGVkU3RhdGUpIHtcbiAgICAgIHRoaXMudXBkYXRlZFN0YXRlID0gdXBkYXRlZFN0YXRlO1xuICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGRvbnQgbmVlZFxuICBXcmFwcGVyRnVuY3Rpb24uY29udGV4dFR5cGVzID0ge1xuICAgICAgc2lsbzogUHJvcFR5cGVzLm9iamVjdFxuICB9XG5cbiAgcmV0dXJuIFdyYXBwZXJGdW5jdGlvbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmluZE9iamVjdFRvU2lsbzsiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY2xhc3MgUHJvdmlkZXJDb21wb25lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIC8vIGZ1bmN0aW9uIGRlZmluaXRpb24gcHJvdmlkZWQgYnkgcmVhY3QsIGNhbGxlZCBieSB0aGlzLmNvbnRleHRcbiAgICBnZXRDaGlsZENvbnRleHQoKSB7XG4gICAgICAgIHJldHVybiB7c2lsbzogdGhpcy5wcm9wcy5zaWxvfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHsgICAgICBcbiAgICAgIC8vIHRoaXMucHJvcHMuY2hpbGRyZW4gYXJlIGFueSBlbGVtZW50cyBsaXN0ZWQgaW5zaWRlIHRoZSBjb21wb25lbnQgKGxpa2UgQXBwKVxuICAgICAgICByZXR1cm4gKDxkaXY+IHt0aGlzLnByb3BzLmNoaWxkcmVufSA8L2Rpdj4pXG4gICAgfVxufVxuXG4vLyB3ZSBhcmUgdGVsbGluZyBpdCB3aGF0IHdlIGFyZSBnb2luZyB0byBwcm92aWRlXG5Qcm92aWRlckNvbXBvbmVudC5jaGlsZENvbnRleHRUeXBlcyA9IHtcbiAgICBzaWxvOiBQcm9wVHlwZXMub2JqZWN0XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb3ZpZGVyQ29tcG9uZW50OyIsImltcG9ydCBiaW5kSW1wb3J0IGZyb20gJy4vYmluZFRvU2lsbyc7XG5pbXBvcnQgb2JqZWN0QmluZEltcG9ydCBmcm9tICcuL2JpbmRPYmplY3RUb1NpbG8uanMnO1xuaW1wb3J0IFByb3ZpZGVySW1wb3J0IGZyb20gJy4vUHJvdmlkZXIuanMnO1xuXG5leHBvcnQgY29uc3QgYmluZFRvU2lsbyA9IGJpbmRJbXBvcnQ7XG5leHBvcnQgY29uc3QgYmluZE9iamVjdFRvU2lsbyA9IG9iamVjdEJpbmRJbXBvcnQ7XG5leHBvcnQgY29uc3QgUHJvdmlkZXIgPSBQcm92aWRlckltcG9ydDsiXSwibmFtZXMiOlsiYmluZFRvU2lsbyIsIkNvbXBvbmVudFRvQmluZCIsIldyYXBwZXJGdW5jdGlvbiIsInNpbG9SZW5kZXIiLCJiaW5kIiwic2lsbyIsImNvbnRleHQiLCJ1bnN1YnNjcmliZSIsInN1YnNjcmliZSIsInByb3RvdHlwZSIsImNvbnN0cnVjdG9yIiwibmFtZSIsIm5ld1N0YXRlIiwidXBkYXRlZFN0YXRlIiwicHJvcHMiLCJwcmV2aW91c1VwZGF0ZSIsImZvcmNlVXBkYXRlIiwiUmVhY3QiLCJDb21wb25lbnQiLCJjb250ZXh0VHlwZXMiLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJiaW5kT2JqZWN0VG9TaWxvIiwia2V5Iiwic2lsb09iamVjdCIsImtleVN1YnNjcmliZSIsIlByb3ZpZGVyQ29tcG9uZW50IiwiY2hpbGRyZW4iLCJjaGlsZENvbnRleHRUeXBlcyIsImJpbmRJbXBvcnQiLCJvYmplY3RCaW5kSW1wb3J0IiwiUHJvdmlkZXIiLCJQcm92aWRlckltcG9ydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
