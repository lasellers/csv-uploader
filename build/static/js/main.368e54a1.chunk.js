(this["webpackJsonpcsv-uploader"]=this["webpackJsonpcsv-uploader"]||[]).push([[0],{42:function(e,t,a){},50:function(e,t,a){e.exports=a(66)},59:function(e,t,a){},60:function(e,t,a){},64:function(e,t,a){},65:function(e,t,a){},66:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(14),c=a.n(r);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var s=a(49),o=a(21),u=a(25),i={isLoggedIn:!1,user:{}},m=Object(o.b)({user:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_USER":var a=t.payload,n=a.user,l=a.isLoggedIn;return Object(u.a)(Object(u.a)({},e),{},{user:n,isLoggedIn:l});case"REMOVE_USER":var r=t.payload,c=r.user,s=r.isLoggedIn;return Object(u.a)(Object(u.a)({},e),{},{user:c,isLoggedIn:s});default:return e}}}),d=Object(o.c)(m,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()),E=(a(59),a(6)),g=(a(60),a(61),a(24)),b=a(9),p=a(12),h=a(5),v=a(15),f=a(16),j=a(19),O=a(18),S=function(e){Object(j.a)(a,e);var t=Object(O.a)(a);function a(){return Object(v.a)(this,a),t.apply(this,arguments)}return Object(f.a)(a,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("h1",null,"Home"),l.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin faucibus magna quis tellus vestibulum blandit. Ut dignissim diam vitae turpis mattis porttitor. Suspendisse condimentum aliquet lectus, at molestie justo semper eu. Quisque vehicula velit nec dui blandit vestibulum. Mauris dignissim sem dolor, quis scelerisque arcu suscipit ac. Fusce vitae lorem ante. Phasellus id dui risus. Phasellus molestie congue sem, eu hendrerit sapien placerat in. Aenean justo ex, sodales vitae egestas eu, tempus porttitor eros. Integer nec sodales ante. Pellentesque rhoncus ex ac rhoncus tempus. Praesent tincidunt nulla at leo scelerisque luctus. Fusce aliquam lectus nec imperdiet efficitur. Etiam sodales, libero id ornare aliquam, magna nunc ornare risus, eget aliquam dui libero a ante."))}}]),a}(l.a.Component);function L(e){var t=Object(n.useState)(null),a=Object(E.a)(t,2),r=a[0],c=a[1];return Object(n.useEffect)((function(){fetch(P+"/user/"+e.user.id).then((function(e){return e.json()})).then((function(e){null!==e&&(null!==r&&e.id===r.id||c(e))}),(function(e){}))})),null===r||0===Object.entries(r).length?l.a.createElement("div",null,l.a.createElement("h1",null,"User"),l.a.createElement("p",null,"None.")):l.a.createElement(l.a.Fragment,null,l.a.createElement("h1",null,"User"),l.a.createElement("div",{className:"container-fluid"},l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-md-6"},"#"),l.a.createElement("div",{className:"col-md-6"},r.id)),l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-md-6"},"Name"),l.a.createElement("div",{className:"col-md-6"},r.name)),l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-md-6"},"Email"),l.a.createElement("div",{className:"col-md-6"},r.email)),l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-md-6"},"Created"),l.a.createElement("div",{className:"col-md-6"},r.createdAt)),l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-md-6"},"Updated"),l.a.createElement("div",{className:"col-md-6"},r.updatedAt))))}var N=function(e){Object(j.a)(a,e);var t=Object(O.a)(a);function a(e){var n;return Object(v.a)(this,a),(n=t.call(this,e)).state={error:"",users:[],user:{}},n}return Object(f.a)(a,[{key:"componentDidMount",value:function(){var e=this;fetch(P+"/users").then((function(e){return e.json()})).then((function(t){console.log("result",t),e.setState({users:t})}),(function(t){console.log("error",t),e.setState({error:t})}))}},{key:"setUser",value:function(e){console.log("************** setUser user",e),this.setState({user:e})}},{key:"render",value:function(){var e=this,t=this.state,a=t.error,n=t.users,r=t.user;return!1===d.getState().user.isLoggedIn?l.a.createElement(h.a,{to:"/"}):0===n.length?l.a.createElement("div",null,l.a.createElement("h1",null,"Users"),l.a.createElement("p",null,"None.")):l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-6"},l.a.createElement("h1",null,"Users"),l.a.createElement("table",{className:"table table-striped"},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"id"),l.a.createElement("th",null,"Name"),l.a.createElement("th",null,"Email"))),l.a.createElement("tbody",null,n.map((function(t){return l.a.createElement("tr",{key:t.id,onClick:function(){return e.setUser(t)}},l.a.createElement("td",null,t.id),l.a.createElement("td",null,t.name),l.a.createElement("td",null,t.email))}))))),l.a.createElement("div",{className:"col-6"},l.a.createElement(L,{user:r}))),a.toLocaleString())}}]),a}(n.Component),y=a(69),w=a(68);a(42);function I(){var e=Object(n.useState)(""),t=Object(E.a)(e,2),a=t[0],r=t[1],c=Object(n.useState)(""),s=Object(E.a)(c,2),o=s[0],u=s[1],i=Object(n.useState)(null),m=Object(E.a)(i,2),g=m[0],b=m[1],p=Object(n.useState)(!1),v=Object(E.a)(p,2),f=v[0],j=v[1];return d.subscribe((function(){var e=d.getState().user;console.log("!!!!!!!!!!! AddMessage store subscribe",e),b(e.user)})),f?l.a.createElement(h.a,{to:"/messages"}):l.a.createElement("div",{className:"AddMessage"},l.a.createElement("form",{onSubmit:function(e){console.log("handleSubmit"),e.preventDefault();var t={method:"POST",redirect:"follow",headers:{"Content-Type":"application/json"}};console.log(t),console.log(g),fetch(P+"/message?title=".concat(a,"&message=").concat(o,"&userId=").concat(g.id),t).then((function(e){return e.json()})).then((function(e){console.log("add message result ",e),j(!0)}),(function(e){console.error(e)}))}},l.a.createElement(y.a.Group,{controlId:"name"},l.a.createElement(y.a.Label,null,"Title"),l.a.createElement(y.a.Control,{autoFocus:!0,type:"title",value:a,onChange:function(e){return r(e.target.value)}})),l.a.createElement(y.a.Group,{controlId:"email"},l.a.createElement(y.a.Label,null,"Message"),l.a.createElement(y.a.Control,{as:"textarea",rows:"5",autoFocus:!0,type:"message",value:o,onChange:function(e){return u(e.target.value)}})),l.a.createElement(w.a,{block:!0,disabled:!(o.length>0),type:"submit"},"Add Message"),l.a.createElement("div",null,"From: ",g.name)))}var k=function(e){Object(j.a)(a,e);var t=Object(O.a)(a);function a(e){var n;return Object(v.a)(this,a),(n=t.call(this,e)).state={error:"",isLoaded:!1,messages:[]},n}return Object(f.a)(a,[{key:"componentDidMount",value:function(){var e=this;fetch(P+"/messages").then((function(e){return e.json()})).then((function(t){e.setState({isLoaded:!0,messages:t})}),(function(t){e.setState({isLoaded:!0,error:t})}))}},{key:"render",value:function(){var e=this.state,t=e.error,a=e.isLoaded,n=e.messages;return!1===d.getState().user.isLoggedIn?l.a.createElement(h.a,{to:"/"}):a?l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-6"},l.a.createElement("h1",null,"Messages"),l.a.createElement("table",{className:"table table-striped"},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"id"),l.a.createElement("th",null,"Title"),l.a.createElement("th",null,"Message"),l.a.createElement("th",null,"UserId"),l.a.createElement("th",null,"RepliedTo"))),l.a.createElement("tbody",null,n.map((function(e){return l.a.createElement("tr",{key:e.id},l.a.createElement("td",null,e.id),l.a.createElement("td",null,e.title),l.a.createElement("td",null,e.message),l.a.createElement("td",null,e.userId),l.a.createElement("td",null,e.repliedTo))}))))),l.a.createElement("div",{className:"col-6"},l.a.createElement(I,null))),t.toLocaleString()):l.a.createElement("div",null,l.a.createElement("h1",null,"Messages"),l.a.createElement("p",null,"None."))}}]),a}(l.a.Component),C=function(e){return{type:"ADD_USER",payload:{user:e,isLoggedIn:!0}}};a(64);function q(){var e=Object(n.useState)(""),t=Object(E.a)(e,2),a=t[0],r=t[1],c=Object(n.useState)(""),s=Object(E.a)(c,2),o=s[0],u=s[1],i=Object(n.useState)(!1),m=Object(E.a)(i,2),g=m[0],b=m[1];return d.subscribe((function(){var e=d.getState().user;b(e.isLoggedIn)})),g?l.a.createElement(h.a,{to:"/messages"}):!0===d.getState().user.isLoggedIn?l.a.createElement(h.a,{to:"/"}):l.a.createElement("div",{className:"Login"},l.a.createElement("form",{onSubmit:function(e){e.preventDefault(),fetch(P+"/login?username=".concat(a,"&password=").concat(o),{method:"POST",redirect:"follow",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){d.dispatch(C(e))}),(function(e){console.error(e)}))}},l.a.createElement(y.a.Group,{controlId:"email"},l.a.createElement(y.a.Label,null,"Email"),l.a.createElement(y.a.Control,{autoFocus:!0,type:"email",value:a,onChange:function(e){return r(e.target.value)}})),l.a.createElement(y.a.Group,{controlId:"password"},l.a.createElement(y.a.Label,null,"Password"),l.a.createElement(y.a.Control,{value:o,onChange:function(e){return u(e.target.value)},type:"password"})),l.a.createElement(w.a,{block:!0,disabled:!(a.length>0&&o.length>0),type:"submit"},"Login")))}a(65);function U(){var e=Object(n.useState)(""),t=Object(E.a)(e,2),a=t[0],r=t[1],c=Object(n.useState)(!1),s=Object(E.a)(c,2),o=s[0],u=s[1];return d.subscribe((function(){var e=d.getState().user;r(e.email),u(e.isLoggedIn)})),o?!1===d.getState().user.isLoggedIn?l.a.createElement(h.a,{to:"/"}):l.a.createElement("div",{className:"Logout"},l.a.createElement("form",{onSubmit:function(e){e.preventDefault(),fetch(P+"/logout?username=".concat(a),{method:"GET",redirect:"follow",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){console.log("logout",e),d.dispatch({type:"REMOVE_USER",payload:{user:{},isLoggedIn:!1}})}),(function(e){console.error(e)}))}},l.a.createElement(w.a,{block:!0,disabled:!1,type:"submit"},"Logout"))):l.a.createElement(h.a,{to:"/"})}function T(){var e=Object(n.useState)(""),t=Object(E.a)(e,2),a=t[0],r=t[1],c=Object(n.useState)(""),s=Object(E.a)(c,2),o=s[0],u=s[1],i=Object(n.useState)(""),m=Object(E.a)(i,2),g=m[0],b=m[1],p=Object(n.useState)(!1),v=Object(E.a)(p,2),f=v[0],j=v[1];return d.subscribe((function(){var e=d.getState().user;j(e.isLoggedIn)})),f?l.a.createElement(h.a,{to:"/messages"}):l.a.createElement("div",{className:"Register"},l.a.createElement("form",{onSubmit:function(e){console.log("handleSubmit"),e.preventDefault();var t={method:"POST",redirect:"follow",headers:{"Content-Type":"application/json"}};console.info(a,o,g),console.info(t),fetch(P+"/user?email=".concat(a,"&password=").concat(o,"&name=").concat(g),t).then((function(e){return e.json()})).then((function(e){console.log("result ",e),d.dispatch(C(e))}),(function(e){console.error(e)}))}},l.a.createElement(y.a.Group,{controlId:"name"},l.a.createElement(y.a.Label,null,"Name"),l.a.createElement(y.a.Control,{autoFocus:!0,type:"name",value:g,onChange:function(e){return b(e.target.value)}})),l.a.createElement(y.a.Group,{controlId:"email"},l.a.createElement(y.a.Label,null,"Email"),l.a.createElement(y.a.Control,{autoFocus:!0,type:"email",value:a,onChange:function(e){return r(e.target.value)}})),l.a.createElement(y.a.Group,{controlId:"password"},l.a.createElement(y.a.Label,null,"Password"),l.a.createElement(y.a.Control,{value:o,onChange:function(e){return u(e.target.value)},type:"password"})),l.a.createElement(w.a,{block:!0,disabled:!(a.length>0&&o.length>0&&g.length>0),type:"submit"},"Register")))}var F=function(e){Object(j.a)(a,e);var t=Object(O.a)(a);function a(){return Object(v.a)(this,a),t.apply(this,arguments)}return Object(f.a)(a,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("h2",null,"About Us"),l.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin faucibus magna quis tellus vestibulum blandit. Ut dignissim diam vitae turpis mattis porttitor. Suspendisse condimentum aliquet lectus, at molestie justo semper eu. Quisque vehicula velit nec dui blandit vestibulum. Mauris dignissim sem dolor, quis scelerisque arcu suscipit ac. Fusce vitae lorem ante. Phasellus id dui risus. Phasellus molestie congue sem, eu hendrerit sapien placerat in. Aenean justo ex, sodales vitae egestas eu, tempus porttitor eros. Integer nec sodales ante. Pellentesque rhoncus ex ac rhoncus tempus. Praesent tincidunt nulla at leo scelerisque luctus. Fusce aliquam lectus nec imperdiet efficitur. Etiam sodales, libero id ornare aliquam, magna nunc ornare risus, eget aliquam dui libero a ante."))}}]),a}(n.Component),M=function(){return l.a.createElement("h1",null,"404: Page Not Found")},P="http://localhost:3001/api";var _=function(e){var t,a=Object(n.useState)(d.getState().user),r=Object(E.a)(a,2),c=r[0],s=r[1],o=Object(n.useState)(!1),u=Object(E.a)(o,2),i=u[0],m=u[1];return d.subscribe((function(){var e=d.getState().user;s(e.user),m(e.isLoggedIn)})),t=i?l.a.createElement(l.a.Fragment,null,l.a.createElement(b.a,{className:"mr-auto"},l.a.createElement(b.a.Link,{as:p.b,to:"/"},"Home"),l.a.createElement(b.a.Link,{as:p.b,to:"/users"},"Users"),l.a.createElement(b.a.Link,{as:p.b,to:"/messages"},"Messages"),l.a.createElement(b.a.Link,{as:p.b,to:"/about"},"About Us")),l.a.createElement(b.a,{className:"ml-auto"},l.a.createElement(b.a.Link,{as:p.b,to:"/logout"},"Logout"))):l.a.createElement(l.a.Fragment,null,l.a.createElement(b.a,{className:"ml-auto"},l.a.createElement(b.a.Link,{as:p.b,to:"/register"},"Register"),l.a.createElement(b.a.Link,{as:p.b,to:"/login"},"Login"))),l.a.createElement(p.a,null,l.a.createElement("header",{id:"App-header"},l.a.createElement(g.a,{expand:"lg"},l.a.createElement(b.a,{className:""},l.a.createElement("h1",null,"Red Messenger")),l.a.createElement(b.a,{className:"ml-auto"},l.a.createElement("small",null,c.name)))),l.a.createElement(g.a,{bg:"light",expand:"lg"},l.a.createElement(g.a.Toggle,{"aria-controls":"basic-navbar-nav"}),l.a.createElement(g.a.Collapse,{id:"basic-navbar-nav"},t)),l.a.createElement("main",{className:"App"},l.a.createElement("div",{id:"App-body"},l.a.createElement(h.d,null,l.a.createElement(h.b,{path:"/",component:S,exact:!0}),l.a.createElement(h.b,{path:"/home",component:S}),l.a.createElement(h.b,{path:"/register",component:T,exact:!0}),l.a.createElement(h.b,{path:"/login",component:q,exact:!0}),l.a.createElement(h.b,{path:"/logout",component:U,exact:!0}),l.a.createElement(h.b,{path:"/users",component:N}),l.a.createElement(h.b,{path:"/messages",component:k}),l.a.createElement(h.b,{path:"/about",component:F}),l.a.createElement(h.b,{component:M})))))};c.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(s.a,{store:d},l.a.createElement(_,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[50,1,2]]]);
//# sourceMappingURL=main.368e54a1.chunk.js.map