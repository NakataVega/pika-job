(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{1543:function(t,e,a){},"9edc":function(t,e,a){"use strict";var r=a("1543"),i=a.n(r);i.a},a1fd:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.$store.state.user.id_aspirante?a("q-card",[a("q-card-section",[a("h6",{staticStyle:{margin:"0px","font-weight":"bold"}},[t._v("Vacantes disponibles")])]),a("q-card-section",[t.items?a("q-table",{attrs:{grid:"",data:t.items,columns:t.columns,"hide-header":"","virtual-scroll":"","virtual-scroll-item-size":this.items.length,pagination:t.pagination,"rows-per-page-options":[0],"hide-bottom":""},scopedSlots:t._u([{key:"item",fn:function(e){return[a("div",{staticClass:"q-pa-xs col-xs-12 col-sm-12 col-md-12"},[a("q-card",[a("q-card-section",[a("q-item",{staticClass:"link",staticStyle:{margin:"0px"},attrs:{to:"/aspirante/vacantes/ver/"+e.row.id}},[a("strong",{staticStyle:{"font-size":"20px"}},[t._v(t._s(e.row.nombre_vacante))])]),a("q-item-label",{staticStyle:{margin:"0px 15px","font-size":"16px","font-style":"italic"}},[t._v(t._s(e.row.organizacion.nombre_orga)+" ")]),0!==parseFloat(e.row.sueldo)?a("i",{staticStyle:{"font-weight":"bold","margin-left":"10px"}},[0!==parseFloat(e.row.sueldo)?a("q-icon",{attrs:{size:"xs",name:"attach_money"}}):t._e(),t._v(" "+t._s(e.row.sueldo)+" mensuales")],1):t._e(),a("q-item-label",{staticStyle:{margin:"0px 15px","font-size":"16px","font-style":"italic"}},[t._v("Fecha publicación: "+t._s(e.row.updatedAt)+" ")])],1)],1)],1)]}}],null,!1,229409206)}):t._e()],1)],1):t._e()},i=[],n=(a("8e6e"),a("8a81"),a("ac6a"),a("cadf"),a("06db"),a("456d"),a("967e")),s=a.n(n),o=(a("28a5"),a("c47a")),c=a.n(o),l=(a("a481"),a("96cf"),a("fa84")),u=a.n(l);function p(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function d(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?p(Object(a),!0).forEach((function(e){c()(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):p(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var m=a("db58");function f(t){return 1===t?"Enero":2===t?"Febrero":3===t?"Marzo":4===t?"Abril":5===t?"Mayo":6===t?"Junio":7===t?"Julio":8===t?"Agosto":9===t?"Septiembre":10===t?"Octubre":11===t?"Noviembre":12===t?"Diciembre":void 0}function b(t){if(t){var e=new Date(t);return e.getDate()+"/"+f(e.getMonth()+1)+"/"+e.getFullYear()}return"Actualidad"}var g={data:function(){return this.$store.state.user.id_aspirante||this.$router.push("/404"),{items:[],columns:[],pagination:{rowsPerPage:0}}},mounted:function(){var t=this;return u()(s.a.mark((function e(){var a,r,i,n,o,c,l,u,p,f;return s.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.$store.state.user.id_aspirante){e.next=4;break}t.$router.push("/404"),e.next=23;break;case 4:return a=t.$store.state.user.id_aspirante,e.next=7,t.$axios.get("experiencias-laborales?",{params:{id_user:a}});case 7:if(r=e.sent,i=r.data,n="",0!==i.total)for(o=0;o<i.data.length;o++)n=n+i.data[o].titulo_expe+" "+i.data[o].actividades;return e.next=13,t.$axios.get("/aspirantes/".concat(a));case 13:return c=e.sent,l=c.data,n=n+" "+l.conocimientos,n=n.replace(/\n/g," "),e.next=19,t.$axios.get("vacantes?$eager=organizacion",{params:{activo:1}});case 19:if(u=e.sent,p=u.data,t.items=p.data.map((function(t){return d({},t,{updatedAt:b(t.updatedAt.replace("-","/").split("T")[0]),strVacante:t.descripcion+" "+t.requisitos,similitud:0})})),0===t.items.length)t.items=null;else{for(f=0;f<t.items.length;f++)t.items[f].similitud=m.compareTwoStrings(n,t.items[f].strVacante),console.log(t.items[f].similitud);t.items.sort((function(t,e){return t.similitud<e.similitud?1:t.similitud>e.similitud?-1:0}))}case 23:case"end":return e.stop()}}),e)})))()}},v=g,w=(a("9edc"),a("2877")),h=a("eebe"),x=a.n(h),_=a("f09f"),y=a("a370"),O=a("eaac"),j=a("66e5"),q=a("0170"),S=a("0016"),$=Object(w["a"])(v,r,i,!1,null,null,null);e["default"]=$.exports;x()($,"components",{QCard:_["a"],QCardSection:y["a"],QTable:O["a"],QItem:j["a"],QItemLabel:q["a"],QIcon:S["a"]})}}]);