"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[250],{6250:function(e,r,n){n.r(r),n.d(r,{default:function(){return S}});var t,a=n(4165),s=n(5861),o=n(9439),u=n(1413),i=n(3263),l=n(2791),c=n(6516),d=n(3360),p=n(6907),h=n(9085),m=n(2619),f=n(168),Z=n(6444).ZP.div(t||(t=(0,f.Z)(["\n  max-width: 600px;\n"]))),x=n(4193),j=n(184),v=function(e,r){switch(r.type){case"UPDATE_REQUEST":return(0,u.Z)((0,u.Z)({},e),{},{loadingUpdate:!0});case"UPDATE_SUCCESS":case"UPDATE_FAIL":return(0,u.Z)((0,u.Z)({},e),{},{loadingUpdate:!1});default:return e}},S=function(){var e=(0,l.useContext)(m.y),r=e.state,n=e.dispatch,t=r.userInfo,u=(0,l.useReducer)(v,{loadingUpdated:!1}),f=(0,o.Z)(u,2),S=(f[0].loadingUpdated,f[1]),b=(0,l.useState)(t.name||""),C=(0,o.Z)(b,2),g=C[0],U=C[1],w=(0,l.useState)(t.email||""),y=(0,o.Z)(w,2),A=y[0],E=y[1],I=(0,l.useState)(""),N=(0,o.Z)(I,2),P=N[0],k=N[1],D=(0,l.useState)(""),L=(0,o.Z)(D,2),T=L[0],_=L[1],q=function(){var e=(0,s.Z)((0,a.Z)().mark((function e(r){var s,o;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r.preventDefault(),P===T){e.next=4;break}return h.Am.warning("As senhas nao se conhecidem"),e.abrupt("return");case 4:return e.prev=4,e.next=7,i.Z.put("http://localhost:3001/api/users/profile",{name:g,email:A,password:P},{headers:{authorization:"Bearer ".concat(t.token)}});case 7:s=e.sent,o=s.data,S({type:"UPDATE_SUCCESS"}),n({type:"USER_SIGNIN",payload:o}),localStorage.setItem("userInfo",JSON.stringify(o)),h.Am.success("Usu\xe1rio atualizido com sucesso!"),e.next=19;break;case 15:e.prev=15,e.t0=e.catch(4),S({type:"UPDATE_FAIL"}),h.Am.error((0,x.b)(e.t0));case 19:case"end":return e.stop()}}),e,null,[[4,15]])})));return function(r){return e.apply(this,arguments)}}();return(0,j.jsxs)(Z,{className:"container",children:[(0,j.jsx)(p.ql,{children:(0,j.jsx)("title",{children:"Perfil do usu\xe1rio"})}),(0,j.jsx)("h1",{children:"Perfil do usu\xe1rio"}),(0,j.jsxs)("form",{onSubmit:q,children:[(0,j.jsxs)(c.Z.Group,{className:"mb-3",controlId:"name",children:[(0,j.jsx)(c.Z.Label,{children:"Nome"}),(0,j.jsx)(c.Z.Control,{value:g,onChange:function(e){return U(e.target.value)},required:!0})]}),(0,j.jsxs)(c.Z.Group,{className:"mb-3",controlId:"email",children:[(0,j.jsx)(c.Z.Label,{children:"Email"}),(0,j.jsx)(c.Z.Control,{value:A,type:"email",onChange:function(e){return E(e.target.value)},required:!0})]}),(0,j.jsxs)(c.Z.Group,{className:"mb-3",controlId:"password",children:[(0,j.jsx)(c.Z.Label,{children:"Senha"}),(0,j.jsx)(c.Z.Control,{value:P,type:"password",onChange:function(e){return k(e.target.value)},required:!0})]}),(0,j.jsxs)(c.Z.Group,{className:"mb-3",controlId:"confirmPassword",children:[(0,j.jsx)(c.Z.Label,{children:"Confirmar a senha"}),(0,j.jsx)(c.Z.Control,{value:T,type:"password",onChange:function(e){return _(e.target.value)},required:!0})]}),(0,j.jsx)(d.Z,{type:"submit",children:"Atualizar"})]})]})}}}]);
//# sourceMappingURL=250.3ca08915.chunk.js.map