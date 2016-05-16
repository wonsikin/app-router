// @license Copyright (C) 2015 Erik Ringsmuth - MIT license
!function(t,e){function a(t,a,i){var r=e.createEvent("CustomEvent");return r.initCustomEvent(t,!1,!0,a),i.dispatchEvent(r)}function i(e){var i=m.parseUrl(t.location.href,e.getAttribute("mode"));if(i.hash!==A.hash&&i.path===A.path&&i.search===A.search&&i.isHashPath===A.isHashPath)return g(i.hash),A=i,void 0;A=i;var n={path:i.path,state:t.history.state};if(a("state-change",n,e)){for(var s=e.firstElementChild;s;){if("APP-ROUTE"===s.tagName&&m.testRoute(s.getAttribute("path"),i.path,e.getAttribute("trailingSlash"),s.hasAttribute("regex")))return r(e,s,i),void 0;s=s.nextSibling}a("not-found",n,e)}}function r(e,i,r){if(i.hasAttribute("redirect"))return e.go(i.getAttribute("redirect"),{replace:!0}),void 0;if(i!==e.activeRoute||"noop"!==i.getAttribute("onUrlChange")){var o={path:r.path,route:i,oldRoute:e.activeRoute,state:t.history.state};a("activate-route-start",o,e)&&a("activate-route-start",o,i)&&(e.loadingRoute=i,i===e.activeRoute&&"updateModel"===i.getAttribute("onUrlChange")?n(e,i,r,o):i.hasAttribute("import")?s(e,i.getAttribute("import"),i,r,o):i.hasAttribute("element")?u(e,i.getAttribute("element"),i,r,o):i.firstElementChild&&"TEMPLATE"===i.firstElementChild.tagName&&(i.isInlineTemplate=!0,h(e,i.firstElementChild,i,r,o)))}}function n(t,e,i,r){var n=l(t,e,i,r);e.hasAttribute("template")||e.isInlineTemplate?c(e.lastElementChild.templateInstance.model,n):c(e.firstElementChild,n),a("activate-route-end",r,t),a("activate-route-end",r,r.route)}function s(t,a,i,r,n){function s(){u.loaded=!0,o(t,u,a,i,r,n)}var u;b.hasOwnProperty(a)?(u=b[a],u.loaded?o(t,u,a,i,r,n):u.addEventListener("load",s)):(u=e.createElement("link"),u.setAttribute("rel","import"),u.setAttribute("href",a),u.setAttribute("async","async"),u.addEventListener("load",s),u.loaded=!1,e.head.appendChild(u),b[a]=u)}function o(t,e,a,i,r,n){if(i.importLink=e,i===t.loadingRoute)if(i.hasAttribute("template")){var s,o=i.getAttribute("template");s=o?e.import.getElementById(o):e.import.querySelector("template"),h(t,s,i,r,n)}else u(t,i.getAttribute("element")||a.split("/").slice(-1)[0].split("?").slice(0,1)[0].replace(".html",""),i,r,n)}function u(t,a,i,r,n){var s=e.createElement(a),o=l(t,i,r,n);c(s,o),p(t,s,r,n)}function h(t,a,i,r,n){var s;if("createInstance"in a){var o=l(t,i,r,n);s=a.createInstance(o)}else s=e.importNode(a.content,!0);p(t,s,r,n)}function l(t,e,i,r){var n=m.routeArguments(e.getAttribute("path"),i.path,i.search,e.hasAttribute("regex"),"auto"===t.getAttribute("typecast"));return(e.hasAttribute("bindRouter")||t.hasAttribute("bindRouter"))&&(n.router=t),r.model=n,a("before-data-binding",r,t),a("before-data-binding",r,r.route),r.model}function c(t,e){for(var a in e)e.hasOwnProperty(a)&&(t[a]=e[a])}function p(t,e,i,r){d(t.previousRoute),t.previousRoute=t.activeRoute,t.activeRoute=t.loadingRoute,t.loadingRoute=null,t.previousRoute&&t.previousRoute.removeAttribute("active"),t.activeRoute.setAttribute("active","active"),t.hasAttribute("core-animated-pages")&&r.route!==r.oldRoute||d(t.previousRoute),t.activeRoute.appendChild(e),t.hasAttribute("core-animated-pages")&&(t.coreAnimatedPages.selected=t.activeRoute.getAttribute("path")),i.hash&&!t.hasAttribute("core-animated-pages")&&g(i.hash),a("activate-route-end",r,t),a("activate-route-end",r,r.route)}function d(t){if(t){var e=t.firstChild;for(t.isInlineTemplate&&(e=t.querySelector("template").nextSibling);e;){var a=e;e=e.nextSibling,t.removeChild(a)}}}function g(t){t&&setTimeout(function(){var a=e.querySelector("html /deep/ "+t)||e.querySelector('html /deep/ [name="'+t.substring(1)+'"]');a&&a.scrollIntoView&&a.scrollIntoView(!0)},0)}function v(t,e,a,i,r){var n=t[e],s=a[i];if("**"===n&&e===t.length-1)return!0;if("undefined"==typeof n||"undefined"==typeof s)return n===s;if(n===s||"*"===n||":"===n.charAt(0))return":"===n.charAt(0)&&"undefined"!=typeof r&&(r[n.substring(1)]=a[i]),v(t,e+1,a,i+1,r);if("**"===n)for(var o=i;o<a.length;o++)if(v(t,e+1,a,o,r))return!0;return!1}var m={},b={},f="ActiveXObject"in t,A={},E=Object.create(HTMLElement.prototype);E.util=m,e.registerElement("app-route",{prototype:Object.create(HTMLElement.prototype)}),E.attachedCallback=function(){"manual"!==this.getAttribute("init")&&this.init()},E.init=function(){var a=this;a.isInitialized||(a.isInitialized=!0,a.hasAttribute("trailingSlash")||a.setAttribute("trailingSlash","strict"),a.hasAttribute("mode")||a.setAttribute("mode","auto"),a.hasAttribute("typecast")||a.setAttribute("typecast","auto"),a.hasAttribute("core-animated-pages")&&(a.createShadowRoot(),a.coreAnimatedPages=e.createElement("core-animated-pages"),a.coreAnimatedPages.appendChild(e.createElement("content")),a.coreAnimatedPages.style.position="static",a.coreAnimatedPages.setAttribute("valueattr","path"),a.coreAnimatedPages.setAttribute("transitions",a.getAttribute("transitions")),a.shadowRoot.appendChild(a.coreAnimatedPages),a.coreAnimatedPages.addEventListener("core-animated-pages-transition-end",function(){a.previousRoute&&!a.previousRoute.hasAttribute("active")&&d(a.previousRoute)})),a.stateChangeHandler=i.bind(null,a),t.addEventListener("popstate",a.stateChangeHandler,!1),f&&t.addEventListener("hashchange",a.stateChangeHandler,!1),i(a))},E.detachedCallback=function(){t.removeEventListener("popstate",this.stateChangeHandler,!1),f&&t.removeEventListener("hashchange",this.stateChangeHandler,!1)},E.go=function(a,i){"pushstate"!==this.getAttribute("mode")&&(a="hashbang"===this.getAttribute("mode")?"#!"+a:"#"+a),i&&i.replace===!0?t.history.replaceState(null,null,a):t.history.pushState(null,null,a);try{var r=new PopStateEvent("popstate",{bubbles:!1,cancelable:!1,state:{}});"dispatchEvent_"in t?t.dispatchEvent_(r):t.dispatchEvent(r)}catch(n){var s=e.createEvent("CustomEvent");s.initCustomEvent("popstate",!1,!1,{state:{}}),t.dispatchEvent(s)}},m.parseUrl=function(t,a){var i={isHashPath:"hash"===a};if("function"==typeof URL){var r=new URL(t);i.path=r.pathname,i.hash=r.hash,i.search=r.search}else{var n=e.createElement("a");n.href=t,i.path=n.pathname,"/"!==i.path.charAt(0)&&(i.path="/"+i.path),i.hash=n.hash,i.search=n.search}if("pushstate"!==a&&("#/"===i.hash.substring(0,2)?(i.isHashPath=!0,i.path=i.hash.substring(1)):"#!/"===i.hash.substring(0,3)?(i.isHashPath=!0,i.path=i.hash.substring(2)):i.isHashPath&&(i.path=0===i.hash.length?"/":i.hash.substring(1)),i.isHashPath)){i.hash="";var s=i.path.indexOf("#");-1!==s&&(i.hash=i.path.substring(s),i.path=i.path.substring(0,s));var o=i.path.indexOf("?");-1!==o&&(i.search=i.path.substring(o),i.path=i.path.substring(0,o))}return i},m.testRoute=function(t,e,a,i){return"ignore"===a&&("/"===e.slice(-1)&&(e=e.slice(0,-1)),"/"!==t.slice(-1)||i||(t=t.slice(0,-1))),i?m.testRegExString(t,e):t===e||"*"===t?!0:("/"!==t.charAt(0)&&(t="/**/"+t),v(t.split("/"),1,e.split("/"),1))},m.routeArguments=function(t,e,a,i,r){var n={};i||("/"!==t.charAt(0)&&(t="/**/"+t),v(t.split("/"),1,e.split("/"),1,n));var s=a.substring(1).split("&");1===s.length&&""===s[0]&&(s=[]);for(var o=0;o<s.length;o++){var u=s[o],h=u.split("=");n[h[0]]=h.splice(1,h.length-1).join("=")}if(r)for(var l in n)n[l]=m.typecast(n[l]);return n},m.typecast=function(t){return"true"===t?!0:"false"===t?!1:isNaN(t)||""===t||"0"===t.charAt(0)?decodeURIComponent(t):+t},m.testRegExString=function(t,e){if("/"!==t.charAt(0))return!1;t=t.slice(1);var a="";if("/"===t.slice(-1))t=t.slice(0,-1);else{if("/i"!==t.slice(-2))return!1;t=t.slice(0,-2),a="i"}return new RegExp(t,a).test(e)},e.registerElement("app-router",{prototype:E})}(window,document);