(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{298:function(t,e,n){t.exports=function(){"use strict";var t="minute",e=/[+-]\d\d(?::?\d\d)?/g,n=/([+-]|\d\d)/g;return function(i,r,s){var o=r.prototype;s.utc=function(t){var e={date:t,utc:!0,args:arguments};return new r(e)},o.utc=function(e){var n=s(this.toDate(),{locale:this.$L,utc:!0});return e?n.add(this.utcOffset(),t):n},o.local=function(){return s(this.toDate(),{locale:this.$L,utc:!1})};var a=o.parse;o.parse=function(t){t.utc&&(this.$u=!0),this.$utils().u(t.$offset)||(this.$offset=t.$offset),a.call(this,t)};var u=o.init;o.init=function(){if(this.$u){var t=this.$d;this.$y=t.getUTCFullYear(),this.$M=t.getUTCMonth(),this.$D=t.getUTCDate(),this.$W=t.getUTCDay(),this.$H=t.getUTCHours(),this.$m=t.getUTCMinutes(),this.$s=t.getUTCSeconds(),this.$ms=t.getUTCMilliseconds()}else u.call(this)};var c=o.utcOffset;o.utcOffset=function(i,r){var s=this.$utils().u;if(s(i))return this.$u?0:s(this.$offset)?c.call(this):this.$offset;if("string"==typeof i&&null===(i=function(t){void 0===t&&(t="");var i=t.match(e);if(!i)return null;var r=(""+i[0]).match(n)||["-",0,0],s=r[0],o=60*+r[1]+ +r[2];return 0===o?0:"+"===s?o:-o}(i)))return this;var o=Math.abs(i)<=16?60*i:i,a=this;if(r)return a.$offset=o,a.$u=0===i,a;if(0!==i){var u=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(a=this.local().add(o+u,t)).$offset=o,a.$x.$localOffset=u}else a=this.utc();return a};var p=o.format;o.format=function(t){var e=t||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return p.call(this,e)},o.valueOf=function(){var t=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||this.$d.getTimezoneOffset());return this.$d.valueOf()-6e4*t},o.isUTC=function(){return!!this.$u},o.toISOString=function(){return this.toDate().toISOString()},o.toString=function(){return this.toDate().toUTCString()};var l=o.toDate;o.toDate=function(t){return"s"===t&&this.$offset?s(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():l.call(this)};var f=o.diff;o.diff=function(t,e,n){if(t&&this.$u===t.$u)return f.call(this,t,e,n);var i=this.local(),r=s(t).local();return f.call(i,r,e,n)}}}()},306:function(t,e,n){},307:function(t,e,n){},308:function(t,e,n){},328:function(t,e,n){"use strict";n(306)},329:function(t,e,n){"use strict";n(307)},330:function(t,e,n){var i=n(138),r=n(131),s=n(331),o=n(335);t.exports=function(t,e){if(null==t)return{};var n=i(o(t),(function(t){return[t]}));return e=r(e),s(t,n,(function(t,n){return e(t,n[0])}))}},331:function(t,e,n){var i=n(71),r=n(332),s=n(65);t.exports=function(t,e,n){for(var o=-1,a=e.length,u={};++o<a;){var c=e[o],p=i(t,c);n(p,c)&&r(u,s(c,t),p)}return u}},332:function(t,e,n){var i=n(333),r=n(65),s=n(69),o=n(45),a=n(29);t.exports=function(t,e,n,u){if(!o(t))return t;for(var c=-1,p=(e=r(e,t)).length,l=p-1,f=t;null!=f&&++c<p;){var h=a(e[c]),m=n;if("__proto__"===h||"constructor"===h||"prototype"===h)return t;if(c!=l){var v=f[h];void 0===(m=u?u(v,h,f):void 0)&&(m=o(v)?v:s(e[c+1])?[]:{})}i(f,h,m),f=f[h]}return t}},333:function(t,e,n){var i=n(334),r=n(68),s=Object.prototype.hasOwnProperty;t.exports=function(t,e,n){var o=t[e];s.call(t,e)&&r(o,n)&&(void 0!==n||e in t)||i(t,e,n)}},334:function(t,e,n){var i=n(139);t.exports=function(t,e,n){"__proto__"==e&&i?i(t,e,{configurable:!0,enumerable:!0,value:n,writable:!0}):t[e]=n}},335:function(t,e,n){var i=n(132),r=n(336),s=n(338);t.exports=function(t){return i(t,s,r)}},336:function(t,e,n){var i=n(67),r=n(337),s=n(133),o=n(134),a=Object.getOwnPropertySymbols?function(t){for(var e=[];t;)i(e,s(t)),t=r(t);return e}:o;t.exports=a},337:function(t,e,n){var i=n(137)(Object.getPrototypeOf,Object);t.exports=i},338:function(t,e,n){var i=n(135),r=n(339),s=n(70);t.exports=function(t){return s(t)?i(t,!0):r(t)}},339:function(t,e,n){var i=n(45),r=n(136),s=n(340),o=Object.prototype.hasOwnProperty;t.exports=function(t){if(!i(t))return s(t);var e=r(t),n=[];for(var a in t)("constructor"!=a||!e&&o.call(t,a))&&n.push(a);return n}},340:function(t,e){t.exports=function(t){var e=[];if(null!=t)for(var n in Object(t))e.push(n);return e}},341:function(t,e,n){"use strict";n(308)},347:function(t,e,n){"use strict";n.r(e);n(0);var i=n(130),r=n.n(i),s=n(298),o=n.n(s),a=n(292),u=(n(28),{data:()=>({comp:null}),computed:{page(){return this.$pagination.paginationIndex+1}},mounted(){n.e(9).then(n.t.bind(null,346,7)).then(t=>{this.comp=t.default})},methods:{clickCallback(t){const e=this.$pagination.getSpecificPageLink(t-1);this.$router.push(e)}}}),c=(n(328),n(4)),p=Object(c.a)(u,(function(){var t=this._self._c;return this.comp?t(this.comp,{tag:"component",attrs:{value:this.page,"page-count":this.$pagination.length,"click-handler":this.clickCallback,"prev-text":this.$pagination.prevText,"next-text":this.$pagination.nextText,"container-class":"pagination","page-class":"page-item"}}):this._e()}),[],!1,null,null,null).exports,l=(n(329),Object(c.a)({},(function(){var t=this,e=t._self._c;return e("div",{staticClass:"pagination simple-pagination"},[t.$pagination.hasPrev?e("router-link",{attrs:{to:t.$pagination.prevLink}},[t._v("\n    "+t._s(t.$pagination.prevText)+"\n  ")]):t._e(),t._v(" "),t.$pagination.hasNext?e("router-link",{attrs:{to:t.$pagination.nextLink}},[t._v("\n    "+t._s(t.$pagination.nextText)+"\n  ")]):t._e()],1)}),[],!1,null,null,null).exports,n(46)),f=n.n(l),h=n(330),m=n.n(h),v={props:{title:{type:[String,Function],required:!1},issueId:{type:[String,Number],required:!1},options:{type:Object,required:!1},shortname:{type:String,required:!1},identifier:{type:String,required:!1},url:{type:String,required:!1},remote_auth_s3:{type:String,required:!1},api_key:{type:String,required:!1},sso_config:{type:Object,required:!1},language:{type:String,required:!1}},computed:{propsWithoutEmptyProperties(){return m()(this.$props,f.a)},commentProps(){return Object.assign({},this.propsWithoutEmptyProperties,this.$frontmatter.comment)},vssueProps(){return Object.assign({title:this.$page.title},this.commentProps)},disqusProps(){return Object.assign({identifier:this.$page.key},this.commentProps)}}};Object(c.a)(v,(function(){var t=this._self._c;return"vssue"===this.$service.comment.service?t("Vssue",this._b({},"Vssue",this.vssueProps,!1)):"disqus"===this.$service.comment.service?t("Disqus",this._b({},"Disqus",this.disqusProps,!1)):this._e()}),[],!1,null,null,null).exports;r.a.extend(o.a);var g={components:{NavigationIcon:a.c,ClockIcon:a.a,TagIcon:a.e},data:()=>({paginationComponent:null}),computed:{pages(){return this.$pagination.pages}},created(){this.paginationComponent=this.getPaginationComponent()},methods:{getPaginationComponent:()=>p,resolvePostDate(t){return r.a.utc(t).format(this.$themeConfig.dateFormat||"ddd MMM DD YYYY")},resolvePostTags:t=>!t||Array.isArray(t)?t:[t]}},d=(n(341),Object(c.a)(g,(function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"base-list-layout"}},[e("div",{staticClass:"ui-posts",attrs:{itemscope:"",itemtype:"http://schema.org/Blog"}},t._l(t.pages,(function(n){return e("article",{key:n.key,staticClass:"ui-post",attrs:{itemprop:"blogPost",itemscope:"",itemtype:"https://schema.org/BlogPosting"}},[e("meta",{attrs:{itemprop:"mainEntityOfPage",content:n.path}}),t._v(" "),e("header",{staticClass:"ui-post-title",attrs:{itemprop:"name headline"}},[e("NavLink",{attrs:{link:n.path}},[t._v(t._s(n.title))])],1),t._v(" "),n.excerpt?e("client-only",[e("p",{staticClass:"ui-post-summary",attrs:{itemprop:"description"},domProps:{innerHTML:t._s(n.excerpt)}})]):e("p",{staticClass:"ui-post-summary",attrs:{itemprop:"description"}},[t._v("\n        "+t._s(n.frontmatter.summary||n.summary)+"\n      ")]),t._v(" "),e("footer",[n.frontmatter.author?e("div",{staticClass:"ui-post-meta ui-post-author",attrs:{itemprop:"publisher author",itemtype:"http://schema.org/Person",itemscope:""}},[e("NavigationIcon"),t._v(" "),e("span",{attrs:{itemprop:"name"}},[t._v(t._s(n.frontmatter.author))]),t._v(" "),n.frontmatter.location?e("span",{attrs:{itemprop:"address"}},[t._v("\n              in "+t._s(n.frontmatter.location)+"\n          ")]):t._e()],1):t._e(),t._v(" "),n.frontmatter.date?e("div",{staticClass:"ui-post-meta ui-post-date"},[e("ClockIcon"),t._v(" "),e("time",{attrs:{pubdate:"",itemprop:"datePublished",datetime:n.frontmatter.date}},[t._v("\n            "+t._s(t.resolvePostDate(n.frontmatter.date))+"\n          ")])],1):t._e(),t._v(" "),n.frontmatter.tags?e("div",{staticClass:"ui-post-meta ui-post-tag",attrs:{itemprop:"keywords"}},[e("TagIcon"),t._v(" "),t._l(t.resolvePostTags(n.frontmatter.tags),(function(n){return e("router-link",{key:n,attrs:{to:"/tag/"+n}},[t._v("\n            "+t._s(n)+"\n          ")])}))],2):t._e()])],1)})),0),t._v(" "),t.$pagination.length>1&&t.paginationComponent?e(t.paginationComponent,{tag:"component"}):t._e()],1)}),[],!1,null,null,null));e.default=d.exports}}]);