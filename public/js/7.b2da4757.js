(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{e670:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("q-page",{attrs:{padding:""}},[s("h3",[e._v("Iniciar sesión")]),s("q-form",{staticClass:"q-gutter-md",attrs:{autocomplete:"new-password"},on:{submit:e.onSubmit}},[s("q-input",{attrs:{outlined:"",label:"Correo electrónico *",hint:"Correo electrónico","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Ingrese su correo electrónico"}]},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),s("q-input",{attrs:{label:"Contraseña",outlined:"",type:e.showPassword?"text":"password",hint:"Contraseña",rules:[function(e){return e&&e.length>0||"Ingrese su contraseña"}]},scopedSlots:e._u([{key:"append",fn:function(){return[s("q-icon",{staticClass:"cursor-pointer",attrs:{name:e.showPassword?"visibility":"visibility_off"},on:{click:function(t){e.showPassword=!e.showPassword}}})]},proxy:!0}]),model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),s("div",{staticClass:"q-pa-md q-gutter-sm"},[s("q-btn",{attrs:{label:"Ingresar",type:"submit",color:"primary"}}),s("q-btn",{attrs:{label:"No tengo una cuenta",type:"button",color:"secondary",to:"/login/register"}})],1)],1)],1)},n=[],r=s("967e"),o=s.n(r),i=(s("96cf"),s("fa84")),c=s.n(i),u={data:function(){return{password:"",email:"",showPassword:!1}},methods:{onSubmit:function(){var e=this;return c()(o.a.mark((function t(){var s,a,n,r;return o.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.post("/authentication",{strategy:"local",email:e.email,password:e.password});case 2:if(s=t.sent,a=s.data,!a){t.next=10;break}return n=a.accessToken,r=a.user,e.$axios.defaults.headers.common.Authorization="Bearer ".concat(n),t.next=9,e.$store.dispatch("login",{user:r,token:n,userId:r.id});case 9:e.$router.push("/");case 10:case"end":return t.stop()}}),t)})))()}}},l=u,p=s("2877"),d=s("eebe"),w=s.n(d),m=s("9989"),f=s("0378"),h=s("27f9"),b=s("0016"),g=s("9c40"),v=Object(p["a"])(l,a,n,!1,null,null,null);t["default"]=v.exports;w()(v,"components",{QPage:m["a"],QForm:f["a"],QInput:h["a"],QIcon:b["a"],QBtn:g["a"]})}}]);