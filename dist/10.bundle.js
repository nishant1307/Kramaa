(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{1026:function(t,e,n){"use strict";n.r(e);var o=n(0),r=n.n(o),a=n(7),i=n.n(a),c=n(458),u=(n(457),n(63));function s(t){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function f(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function l(t){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function p(t,e){return(p=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function b(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}var y=function(t){function e(t){var n,o,r;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),o=this,(n=!(r=l(e).call(this,t))||"object"!==s(r)&&"function"!=typeof r?b(o):r).state={userList:[],organization:""},n.componentDidMount=n.componentDidMount.bind(b(b(n))),n}var n,a,y;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&p(t,e)}(e,o["Component"]),n=e,(a=[{key:"componentDidMount",value:function(){var t=this;i.a.post("/api/dashboard/userList",{clientToken:sessionStorage.getItem("clientToken")}).then(function(e){t.setState({userList:e.data.users})})}},{key:"render",value:function(){var t=this,e=this.state,n=e.userList,o=(e.organization,[{Header:"User ID",accessor:"uniqueId"},{Header:"First Name",accessor:"firstName"},{Header:"Last Name",accessor:"lastName"},{Header:"Email",accessor:"email"},{Header:"Action",Cell:function(e){var n=e.row;return r.a.createElement(u.a,{block:!0,onClick:function(e){return t.goToProject(n.uniqueId)},color:"primary"},"View")}}]);return r.a.createElement(c.a,{data:n,columns:o,onFetchData:this.fetchData,noDataText:"Not available",getTrProps:function(e,n){return n&&n.row?{onClick:function(e){t.setState({selected:n.index})}}:{}}})}}])&&f(n.prototype,a),y&&f(n,y),e}();e.default=y}}]);