(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[13],{"47c2":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.$store.state.user.id_aspirante?a("q-card",[a("q-card-section",[a("h4",{staticStyle:{margin:"0px","font-weight":"bold"}},[t._v("Tu curriculum")]),a("h6",{staticStyle:{margin:"0px"}},[t._v("Así es como los reclutadores verán toda tu información :)")])]),t.datoPers?a("q-card-section",{staticClass:"row items-start"},[a("q-card-section",{staticClass:"col-md-4 col-sm-12 row items-start"},[a("div",{staticClass:"col-md-12 col-sm-6 col-xs-12",staticStyle:{overflow:"hidden",position:"relative"}},[a("img",{staticStyle:{width:"100%"},attrs:{src:"/uploads/"+this.imagen}}),a("div",{staticStyle:{position:"absolute",left:"0",bottom:"0",padding:"16px"}},[a("q-item-label",{staticClass:"text-white",staticStyle:{"background-color":"rgba(13,13,13,0.6)",margin:"0px",padding:"7px","font-size":"24px","font-weight":"bold"}},[t._v("\n            "+t._s(t.datoPers.nombre)+" "+t._s(t.datoPers.apellido_paterno)+" "+t._s(t.datoPers.apellido_materno)+"\n          ")])],1)]),a("div",{staticClass:"col-md-12 col-sm-6 col-xs-12",staticStyle:{padding:"5px","font-weight":"bold","font-size":"18px"}},[t.datoPers.ciudad||t.datoPers.estado||t.datoPers.pais?a("q-item",[a("q-icon",{staticClass:"text-yellow-14",staticStyle:{"margin-right":"5px"},attrs:{size:"sm",name:"place"}}),t._v(" "+t._s(this.localidad)+"\n        ")],1):t._e(),t.datoPers.telefono?a("q-item",[a("q-icon",{staticClass:"text-yellow-14",staticStyle:{"margin-right":"5px"},attrs:{size:"sm",name:"phone"}}),t._v(" "+t._s(t.datoPers.telefono)+"\n        ")],1):t._e(),this.email?a("q-item",[a("q-icon",{staticClass:"text-yellow-14",staticStyle:{"margin-right":"5px"},attrs:{size:"sm",name:"mail"}}),t._v(" "+t._s(this.email)+"\n        ")],1):t._e(),t.datoPers.conocimientos?a("div",[a("hr"),a("h5",{staticStyle:{margin:"0px","font-weight":"bold"}},[a("q-icon",{staticClass:"text-yellow-14",attrs:{size:"md",name:"assessment"}}),t._v(" Conocimientos y habilidades")],1),a("hr"),a("div",{staticStyle:{padding:"0px 10px"}},t._l(t.datoPers.conocimientos,(function(e){return a("p",{key:e,staticStyle:{"font-size":"14px","font-style":"italic","font-weight":"normal",margin:"0px"}},[t._v(t._s(e)+"\n            ")])})),0)]):t._e()],1)]),a("q-card-section",{staticClass:"col-md-8 col-sm-12"},[t.experiencias?a("div",[a("hr"),a("h5",{staticStyle:{margin:"0px","font-weight":"bold"}},[a("q-icon",{staticClass:"text-yellow-14",attrs:{size:"md",name:"business_center"}}),t._v(" Experiencia laboral")],1),a("hr"),a("q-list",t._l(t.experiencias,(function(e){return a("q-item",{key:e.id},[a("q-item-section",[a("q-item-label",{staticStyle:{margin:"5px","font-size":"20px","font-weight":"bold"}},[t._v(" "+t._s(e.organizacion)+" ")]),a("q-item-label",{staticStyle:{margin:"0px 15px","font-size":"16px","font-style":"italic"}},[t._v("* "+t._s(e.titulo_expe)+" ")]),a("q-item-label",{staticStyle:{margin:"5px 15px","font-size":"14px"}},[a("q-icon",{attrs:{name:"calendar_today"}}),t._v("\n                "+t._s(e.fecha_inicio)+" - "+t._s(e.fecha_fin)+"\n              ")],1),a("q-item-label",{staticStyle:{margin:"0px 15px","font-size":"14px"}},[a("strong",[t._v("Actividades / funciones:")]),t._l(e.actividades,(function(e){return a("p",{key:e,staticStyle:{margin:"0px"}},[t._v("\n                  "+t._s(e)+"\n                ")])}))],2)],1)],1)})),1)],1):t._e(),t.formaciones?a("div",[a("hr"),a("h5",{staticStyle:{margin:"0px","font-weight":"bold"}},[a("q-icon",{staticClass:"text-yellow-14",attrs:{size:"md",name:"school"}}),t._v(" Formación académica")],1),a("hr"),a("q-list",t._l(t.formaciones,(function(e){return a("q-item",{key:e.id},[a("q-item-section",[a("q-item-label",{staticStyle:{margin:"5px","font-size":"20px","font-weight":"bold"}},[t._v(" "+t._s(e.institucion)+" ")]),a("q-item-label",{staticStyle:{margin:"0px 15px","font-size":"16px","font-style":"italic"}},[t._v("* "+t._s(e.titulo_formacion)+" ")]),a("q-item-label",{staticStyle:{margin:"5px 15px","font-size":"14px"}},[a("q-icon",{attrs:{name:"calendar_today"}}),t._v("\n                "+t._s(e.fecha_inicio)+" - "+t._s(e.fecha_fin)+"\n              ")],1),e.certificado?a("q-item-label",{staticStyle:{margin:"5px 15px","font-size":"14px"}},[a("q-icon",{staticClass:"text-yellow-14",staticStyle:{"margin-right":"5px"},attrs:{name:"stars"}}),a("strong",[t._v("Certificado/Titulado")])],1):t._e()],1)],1)})),1)],1):t._e(),t.datoPers.referencias?a("div",[a("hr"),a("h5",{staticStyle:{margin:"0px","font-weight":"bold"}},[a("q-icon",{staticClass:"text-yellow-14",attrs:{size:"md",name:"import_contacts"}}),t._v(" Referencias")],1),a("hr"),a("div",{staticStyle:{padding:"0px 10px"}},t._l(t.datoPers.referencias,(function(e){return a("p",{key:e,staticStyle:{"font-size":"14px","font-style":"italic","font-weight":"normal",margin:"0px"}},[t._v(t._s(e)+"\n          ")])})),0)]):t._e()])],1):t._e()],1):t._e()},s=[],n=(a("8e6e"),a("8a81"),a("ac6a"),a("cadf"),a("06db"),a("456d"),a("967e")),o=a.n(n),r=(a("c5f6"),a("a481"),a("c47a")),c=a.n(r),l=(a("28a5"),a("96cf"),a("fa84")),d=a.n(l);function m(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,i)}return a}function p(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?m(Object(a),!0).forEach((function(e){c()(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):m(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function f(t){return 1===t?"Enero":2===t?"Febrero":3===t?"Marzo":4===t?"Abril":5===t?"Mayo":6===t?"Junio":7===t?"Julio":8===t?"Agosto":9===t?"Septiembre":10===t?"Octubre":11===t?"Noviembre":12===t?"Diciembre":void 0}function u(t){if(t){var e=new Date(t);return e.getDate()+"/"+f(e.getMonth()+1)+"/"+e.getFullYear()}return"Actualidad"}var _={data:function(){return this.$store.state.user.id_aspirante||this.$router.push("/404"),{datoPers:null,experiencias:null,formaciones:null,imagen:"0.png",localidad:"",email:this.$store.state.user.email}},mounted:function(){var t=this;return d()(o.a.mark((function e(){var a,i,s,n,r,c;return o.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.$store.state.user.id_aspirante){e.next=4;break}t.$router.push("/404"),e.next=29;break;case 4:return e.next=6,t.$axios.get("/aspirantes/".concat(t.$store.state.user.id_aspirante));case 6:return a=e.sent,i=a.data,t.datoPers=i,""===t.datoPers.ciudad?t.datoPers.ciudad=null:t.localidad=t.localidad+t.datoPers.ciudad+", ",""===t.datoPers.estado?t.datoPers.estado=null:t.localidad=t.localidad+t.datoPers.estado+", ",""===t.datoPers.pais?t.datoPers.pais=null:t.localidad=t.localidad+t.datoPers.pais+".",""===t.datoPers.conocimientos?t.datoPers.conocimientos=null:t.datoPers.conocimientos=t.datoPers.conocimientos.split("\n"),""===t.datoPers.fecha_naci&&(t.datoPers.fecha_naci=null),""===t.datoPers.referencias?t.datoPers.referencias=null:t.datoPers.referencias=t.datoPers.referencias.split("\n"),""===t.datoPers.telefono&&(t.datoPers.telefono=null),""!==t.datoPers.imagen&&t.datoPers.imagen?t.imagen=t.datoPers.imagen:t.datoPers.imagen="0.png",e.next=19,t.$axios.get("experiencias-laborales?id_user=".concat(t.$store.state.user.id_aspirante,"&$sort[fecha_inicio]=-1"));case 19:return s=e.sent,n=s.data,t.experiencias=n.data.map((function(t){return p({},t,{fecha_inicio:u(t.fecha_inicio),fecha_fin:u(t.fecha_fin),actividades:t.actividades.replace(/\n/gi,"\n").split("\n")})})),0===t.experiencias.length&&(t.experiencias=null),e.next=25,t.$axios.get("formaciones-academicas?id_user=".concat(t.$store.state.user.id_aspirante,"&$sort[fecha_inicio]=-1"));case 25:r=e.sent,c=r.data,t.formaciones=c.data.map((function(t){return p({},t,{fecha_inicio:u(t.fecha_inicio),fecha_fin:u(t.fecha_fin),certificado:Boolean(Number(t.certificado))})})),0===t.formaciones.length&&(t.formaciones=null);case 29:case"end":return e.stop()}}),e)})))()}},x=_,g=a("2877"),h=a("eebe"),y=a.n(h),b=a("f09f"),v=a("a370"),P=a("0170"),w=a("66e5"),q=a("0016"),S=a("1c1c"),z=a("4074"),O=Object(g["a"])(x,i,s,!1,null,null,null);e["default"]=O.exports;y()(O,"components",{QCard:b["a"],QCardSection:v["a"],QItemLabel:P["a"],QItem:w["a"],QIcon:q["a"],QList:S["a"],QItemSection:z["a"]})}}]);