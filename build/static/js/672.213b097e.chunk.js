"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[672],{5672:function(e,i,r){r.r(i),r.d(i,{default:function(){return N}});var s,t,n=r(4165),a=r(5861),c=r(9439),d=r(1413),l=r(2791),o=r(3263),h=r(2619),x=r(7689),m=r(1087),p=r(6907),u=r(9085),Z=r(4193),j=r(2597),f=r(9743),v=r(2677),g=r(9140),P=r(1398),y=r(3360),b=r(168),E=r(6444),I=(E.ZP.div(s||(s=(0,b.Z)(["\n  max-width: 600px;\n"]))),E.ZP.img(t||(t=(0,b.Z)(["\n  max-width: 100px;\n"])))),A=r(184),C=function(e,i){switch(i.type){case"CREATE_REQUEST":return(0,d.Z)((0,d.Z)({},e),{},{loading:!0});case"CREATE_SUCCESS":case"CREATE_FAIL":return(0,d.Z)((0,d.Z)({},e),{},{loading:!1});default:return e}},N=function(){var e=(0,x.s0)(),i=(0,l.useReducer)(C,{loading:!1,error:""}),r=(0,c.Z)(i,2),s=r[0],t=s.loading,d=(s.error,r[1]),b=(0,l.useContext)(h.y),E=b.state,N=b.dispatch,R=E.cart,T=E.userInfo,k=function(e){return Math.round(100*e+Number.EPSILON)/100};R.itemsPrice=k(R.cartItems.reduce((function(e,i){return e+i.quantity*i.price}),0)),R.shippingPrice=R.itemsPrice>100?k(0):k(10),R.taxPrice=k(.15*R.itemsPrice),R.totalPrice=R.itemsPrice+R.shippingPrice+R.taxPrice;var S=function(){var i=(0,a.Z)((0,n.Z)().mark((function i(){var r,s;return(0,n.Z)().wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return i.prev=0,d({type:"CREATE_REQUEST"}),i.next=4,o.Z.post("http://localhost:3001/api/orders",{orderItems:R.cartItems,shippingAddress:R.shippingAddress,payamentMethod:R.payamentMethod,itemsPrice:R.itemsPrice,shippingPrice:R.shippingPrice,taxPrice:R.taxPrice,totalPrice:R.totalPrice},{headers:{authorization:"Bearer ".concat(T.token)}});case 4:r=i.sent,s=r.data,N({type:"CART_CLEAR"}),d({type:"CREATE_SUCCESS"}),localStorage.removeItem("cartItems"),e("/order/".concat(s.order._id)),i.next=16;break;case 12:i.prev=12,i.t0=i.catch(0),d({type:"CREATE_FAIL"}),u.Am.error((0,Z.b)(i.t0));case 16:case"end":return i.stop()}}),i,null,[[0,12]])})));return function(){return i.apply(this,arguments)}}();return(0,l.useEffect)((function(){R.payamentMethod||e("payament")}),[R,e]),(0,A.jsxs)("div",{children:[(0,A.jsx)(j.bN,{step1:!0,step2:!0,step3:!0,step4:!0}),(0,A.jsx)(p.ql,{children:(0,A.jsx)("title",{children:"Visualizar Pedido"})}),(0,A.jsx)("h1",{className:"my-3",children:"Visualizar Pedido"}),(0,A.jsxs)(f.Z,{children:[(0,A.jsxs)(v.Z,{md:8,children:[(0,A.jsx)(g.Z,{className:"mb-3",children:(0,A.jsxs)(g.Z.Body,{children:[(0,A.jsx)(g.Z.Title,{children:"Shipping"}),(0,A.jsxs)(g.Z.Text,{children:[(0,A.jsx)("strong",{children:"Name:"})," ",R.shippingAddress.fullName," ",(0,A.jsx)("br",{}),(0,A.jsx)("strong",{children:"Address:"})," ",R.shippingAddress.address,",",R.shippingAddress.city,", ",R.shippingAddress.postalCode,",",R.shippingAddress.country]}),(0,A.jsx)(m.Link,{to:"/shipping",children:"Edit"})]})}),(0,A.jsx)(g.Z,{className:"mb-3",children:(0,A.jsxs)(g.Z.Body,{children:[(0,A.jsx)(g.Z.Title,{children:"Payament"}),(0,A.jsxs)(g.Z.Text,{children:[(0,A.jsx)("strong",{children:"Method:"})," ",R.payamentMethod]}),(0,A.jsx)(m.Link,{to:"/payament",children:"Edit"})]})}),(0,A.jsx)(g.Z,{className:"mb-3",children:(0,A.jsxs)(g.Z.Body,{children:[(0,A.jsx)(g.Z.Title,{children:"Items"}),(0,A.jsx)(P.Z,{variant:"flush",children:R.cartItems.map((function(e){return(0,A.jsx)(P.Z.Item,{children:(0,A.jsxs)(f.Z,{className:"align-items-center",children:[(0,A.jsxs)(v.Z,{md:6,children:[(0,A.jsx)(I,{src:e.image,alt:e.name,className:"img-fluid rounded img-thumbnail"})," "," ",(0,A.jsx)(m.Link,{to:"/product/".concat(e._slug),children:e.name})]}),(0,A.jsx)(v.Z,{md:3,children:(0,A.jsx)("span",{children:e.quantity})}),(0,A.jsxs)(v.Z,{md:3,children:["R$",e.price]})]})},e._id)}))}),(0,A.jsx)(m.Link,{to:"/cart",children:"Edit"})]})})]}),(0,A.jsx)(v.Z,{md:4,children:(0,A.jsx)(g.Z,{children:(0,A.jsxs)(g.Z.Body,{children:[(0,A.jsx)(g.Z.Title,{children:"Order summary"}),(0,A.jsxs)(P.Z,{variant:"flush",children:[(0,A.jsx)(P.Z.Item,{children:(0,A.jsxs)(f.Z,{children:[(0,A.jsx)(v.Z,{children:"Items"}),(0,A.jsxs)(v.Z,{children:["R$",R.itemsPrice.toFixed(2)]})]})}),(0,A.jsx)(P.Z.Item,{children:(0,A.jsxs)(f.Z,{children:[(0,A.jsx)(v.Z,{children:"Shipping"}),(0,A.jsxs)(v.Z,{children:["R$",R.shippingPrice.toFixed(2)]})]})}),(0,A.jsx)(P.Z.Item,{children:(0,A.jsxs)(f.Z,{children:[(0,A.jsx)(v.Z,{children:"Tax"}),(0,A.jsxs)(v.Z,{children:["R$",R.taxPrice.toFixed(2)]})]})}),(0,A.jsx)(P.Z.Item,{children:(0,A.jsxs)(f.Z,{children:[(0,A.jsx)(v.Z,{children:(0,A.jsx)("strong",{children:"Order Total"})}),(0,A.jsx)(v.Z,{children:(0,A.jsxs)("strong",{children:["R$",R.totalPrice.toFixed(2)]})})]})}),(0,A.jsxs)(P.Z.Item,{children:[(0,A.jsx)("div",{className:"d-grid",children:(0,A.jsx)(y.Z,{type:"button",onClick:S,disabled:0===R.cartItems.length,children:"Place Order"})}),t&&(0,A.jsx)(j.pH,{})]})]})]})})})]})]})}},1398:function(e,i,r){r.d(i,{Z:function(){return P}});var s=r(1413),t=r(5987),n=r(1694),a=r.n(n),c=r(2791),d=(r(2391),r(8580)),l=r(1337),o=r(162),h=r(9439),x=r(9007),m=r(4787),p=r(8633),u=r(184),Z=["bsPrefix","active","disabled","eventKey","className","variant","action","as"],j=c.forwardRef((function(e,i){var r=e.bsPrefix,n=e.active,c=e.disabled,d=e.eventKey,l=e.className,j=e.variant,f=e.action,v=e.as,g=(0,t.Z)(e,Z);r=(0,o.vE)(r,"list-group-item");var P=(0,m.v)((0,s.Z)({key:(0,p.h)(d,g.href),active:n},g)),y=(0,h.Z)(P,2),b=y[0],E=y[1],I=(0,x.Z)((function(e){if(c)return e.preventDefault(),void e.stopPropagation();b.onClick(e)}));c&&void 0===g.tabIndex&&(g.tabIndex=-1,g["aria-disabled"]=!0);var A=v||(f?g.href?"a":"button":"div");return(0,u.jsx)(A,(0,s.Z)((0,s.Z)((0,s.Z)({ref:i},g),b),{},{onClick:I,className:a()(l,r,E.isActive&&"active",c&&"disabled",j&&"".concat(r,"-").concat(j),f&&"".concat(r,"-action"))}))}));j.displayName="ListGroupItem";var f=j,v=["className","bsPrefix","variant","horizontal","numbered","as"],g=c.forwardRef((function(e,i){var r,n=(0,d.Ch)(e,{activeKey:"onSelect"}),c=n.className,h=n.bsPrefix,x=n.variant,m=n.horizontal,p=n.numbered,Z=n.as,j=void 0===Z?"div":Z,f=(0,t.Z)(n,v),g=(0,o.vE)(h,"list-group");return m&&(r=!0===m?"horizontal":"horizontal-".concat(m)),(0,u.jsx)(l.Z,(0,s.Z)((0,s.Z)({ref:i},f),{},{as:j,className:a()(c,g,x&&"".concat(g,"-").concat(x),r&&"".concat(g,"-").concat(r),p&&"".concat(g,"-numbered"))}))}));g.displayName="ListGroup";var P=Object.assign(g,{Item:f})}}]);
//# sourceMappingURL=672.213b097e.chunk.js.map