"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[131],{1131:function(e,r,n){n.r(r);var t=n(4165),a=n(5861),s=n(9439),o=n(2791),c=n(3263),i=n(7689),u=n(6907),l=n(6516),d=n(3360),h=n(1087),p=n(5953),m=n(2619),f=n(9085),x=n(4193),Z=n(184);r.default=function(){var e=(0,i.s0)(),r=(0,i.TH)().search,n=new URLSearchParams(r).get("redirect"),j=n||"/",b=(0,o.useState)(""),g=(0,s.Z)(b,2),v=g[0],C=g[1],y=(0,o.useState)(""),S=(0,s.Z)(y,2),w=S[0],N=S[1],I=(0,o.useState)(""),k=(0,s.Z)(I,2),L=k[0],q=k[1],G=(0,o.useState)(""),R=(0,s.Z)(G,2),A=R[0],E=R[1],P=(0,o.useContext)(m.y),T=P.state,U=P.dispatch,W=T.userInfo,z=function(){var r=(0,a.Z)((0,t.Z)().mark((function r(n){var a,s,o;return(0,t.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(a={"Content-Type":"application/json",Authorization:"bearer secret"},n.preventDefault(),L===A){r.next=5;break}return f.Am.error("As senhas nao se conhecidem"),r.abrupt("return");case 5:return r.prev=5,r.next=8,c.Z.post("http://localhost:3001/api/users/signup",{name:v,email:w,password:L},{headers:a});case 8:s=r.sent,o=s.data,U({type:"USER_SIGNIN",payload:o}),localStorage.setItem("userInfo",JSON.stringify(o)),e(j||"/"),r.next=18;break;case 15:r.prev=15,r.t0=r.catch(5),f.Am.error((0,x.b)(r.t0));case 18:case"end":return r.stop()}}),r,null,[[5,15]])})));return function(e){return r.apply(this,arguments)}}();return(0,o.useEffect)((function(){W&&e(j)}),[e,j,W]),(0,Z.jsxs)(p.W,{children:[(0,Z.jsx)(u.ql,{children:(0,Z.jsx)("title",{children:"Registrar"})}),(0,Z.jsx)("h1",{className:"my-3",children:"Registrar"}),(0,Z.jsxs)(l.Z,{onSubmit:z,children:[(0,Z.jsxs)(l.Z.Group,{className:"mb-3",controlId:"name",children:[(0,Z.jsx)(l.Z.Label,{children:"Nome"}),(0,Z.jsx)(l.Z.Control,{type:"name",required:!0,onChange:function(e){return C(e.target.value)}})]}),(0,Z.jsxs)(l.Z.Group,{className:"mb-3",controlId:"email",children:[(0,Z.jsx)(l.Z.Label,{children:"Email"}),(0,Z.jsx)(l.Z.Control,{type:"email",required:!0,onChange:function(e){return N(e.target.value)}})]}),(0,Z.jsxs)(l.Z.Group,{className:"mb-3",controlId:"password",children:[(0,Z.jsx)(l.Z.Label,{children:"Senha"}),(0,Z.jsx)(l.Z.Control,{type:"password",required:!0,onChange:function(e){return q(e.target.value)}})]}),(0,Z.jsxs)(l.Z.Group,{className:"mb-3",controlId:"confirmPassword",children:[(0,Z.jsx)(l.Z.Label,{children:"Confirmar Senha"}),(0,Z.jsx)(l.Z.Control,{type:"password",required:!0,onChange:function(e){return E(e.target.value)}})]}),(0,Z.jsx)("div",{className:"mb-3",children:(0,Z.jsx)(d.Z,{type:"submit",children:"Registrar"})}),(0,Z.jsxs)("div",{className:"mb-3",children:["Voc\xea j\xe1 tem uma conta"," ",(0,Z.jsx)(h.Link,{to:"/signin?redirect".concat(j),children:"Logue aqui"})]})]})]})}},5953:function(e,r,n){n.d(r,{W:function(){return s}});var t,a=n(168),s=n(6444).ZP.div(t||(t=(0,a.Z)(["\n  max-width: 600px;\n"])))}}]);
//# sourceMappingURL=131.1e73e4cd.chunk.js.map