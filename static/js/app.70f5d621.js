(function(t){function i(i){for(var e,o,n=i[0],r=i[1],l=i[2],u=0,d=[];u<n.length;u++)o=n[u],a[o]&&d.push(a[o][0]),a[o]=0;for(e in r)Object.prototype.hasOwnProperty.call(r,e)&&(t[e]=r[e]);c&&c(i);while(d.length)d.shift()();return h.push.apply(h,l||[]),s()}function s(){for(var t,i=0;i<h.length;i++){for(var s=h[i],e=!0,n=1;n<s.length;n++){var r=s[n];0!==a[r]&&(e=!1)}e&&(h.splice(i--,1),t=o(o.s=s[0]))}return t}var e={},a={app:0},h=[];function o(i){if(e[i])return e[i].exports;var s=e[i]={i:i,l:!1,exports:{}};return t[i].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.m=t,o.c=e,o.d=function(t,i,s){o.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:s})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,i){if(1&i&&(t=o(t)),8&i)return t;if(4&i&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(o.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var e in t)o.d(s,e,function(i){return t[i]}.bind(null,e));return s},o.n=function(t){var i=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(i,"a",i),i},o.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},o.p="";var n=window["webpackJsonp"]=window["webpackJsonp"]||[],r=n.push.bind(n);n.push=i,n=n.slice();for(var l=0;l<n.length;l++)i(n[l]);var c=r;h.push([0,"chunk-vendors"]),s()})({0:function(t,i,s){t.exports=s("56d7")},"3aad":function(t,i,s){},"56d7":function(t,i,s){"use strict";s.r(i);var e=s("7618"),a=(s("cadf"),s("551c"),s("f751"),s("097d"),s("2b0e")),h=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{ref:"app",attrs:{id:"app"}},[s("transition",{attrs:{name:t.transitionName}},[s("router-view")],1)],1)},o=[],n={name:"app",data:function(){return{}},methods:{},mounted:function(){}},r=n,l=(s("7faf"),s("2877")),c=Object(l["a"])(r,h,o,!1,null,null,null),u=c.exports,d=s("8c4f");a["a"].use(d["a"]);var m=new d["a"]({routes:[{path:"/",name:"home",component:s("6511").default},{path:"*",redirect:"/"}]}),v=s("2f62");a["a"].use(v["a"]);var g=new v["a"].Store({state:{userInfo:"",transitionName:"slide-left"},actions:{setUser:function(t,i){var s=t.commit;s("setUser",i)},setSlide:function(t,i){var s=t.commit;s("setSlide",i)}},mutations:{setUser:function(t,i){t.userInfo=i},setSlide:function(t,i){t.transitionName=i}}}),f=(s("386d"),s("3b2b"),s("ac6a"),s("456d"),s("7f7f"),s("4917"),s("6b54"),{components:{},data:function(){return{}},filters:{formatTime:function(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:".",s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:".",e=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",a=arguments.length>4?arguments[4]:void 0,h=arguments.length>5?arguments[5]:void 0,o=new Date(1e3*t),n=1900+o.getYear(),r="0"+(o.getMonth()+1),l="0"+o.getDate(),c="0"+o.getHours(),u="0"+o.getMinutes(),d=n+i+r.substring(r.length-2,r.length)+s+l.substring(l.length-2,l.length)+e;return a&&!h?d+" "+c.substring(c.length-2,c.length):a&&h?d+" "+c.substring(c.length-2,c.length)+":"+u.substring(u.length-2,u.length):d}},methods:{go:function(t){this.$router.push(t)},goBack:function(){this.$router.go(-1)},validate:function(t){var i={};return t.some(function(t){return"number"===typeof t.key&&(t.key=t.key.toString()),!t.key||t.key.match(/^[ ]+$/)?(i[t.type]=!0,i.msg="请填写"+t.name):"name"===t.type&&(!/^[\u4e00-\u9fa5]+$/.test(t.key)||t.key.length<2)?(i[t.type]=!0,i.msg="请输入正确的"+t.name):("phone"!==t.type||11===t.key.length&&/^((13|14|15|17|18|19)[0-9]{1}\d{8})$/.test(t.key))&&("idCard"!==t.type||/^\d{6}(19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(t.key))?void 0:(i[t.type]=!0,i.msg="请输入正确的"+t.name)}),Object.keys(i).length?i:""},getQueryString:function(t){var i=new RegExp("(^|&)"+t+"=([^&]*)(&|$)","i"),s=window.location.search.substr(1).match(i);return null!==s?unescape(s[2]):null},resetImgUrl:function(t){var i=this;this.maxErrorNum>0?(--this.maxErrorNum,t.οnerrοr=function(){i.resetImgUrl(t)},setTimeout(function(){t.srcElement.src=t.srcElement.src},200)):(t.οnerrοr=null,t.srcElement.src=s("cb15"))}},computed:{userInfo:function(){return this.$store.state.userInfo},transitionName:function(){return this.$store.state.transitionName}},watch:{},mounted:function(){},beforeDestory:function(){}}),p=s("6829"),w=s.n(p),D=s("b970"),A=(s("157a"),s("2241")),b=s("d399"),y=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("van-nav-bar",{attrs:{title:t.title,"left-arrow":"","left-text":t.leftText},on:{"click-left":t.goBack}})},x=[],_={props:{title:{type:String,default:""},leftText:{type:String,default:"返回"}},model:{prop:"visible"},components:{},data:function(){return{}},methods:{},mounted:function(){}},k=_,O=Object(l["a"])(k,y,x,!1,null,"0c99fd60",null),j=O.exports,E=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("van-loading",{staticClass:"loading",attrs:{type:"circular",color:"#1989fa"}})},S=[],$={props:{},model:{prop:"visible"},components:{},data:function(){return{}},methods:{},mounted:function(){}},I=$,N=(s("6166"),Object(l["a"])(I,E,S,!1,null,"0af31a1a",null)),T=N.exports;a["a"].config.productionTip=!1,a["a"].component("nav-bar",j),a["a"].component("loading",T),a["a"].mixin(f),a["a"].use(D["a"]),a["a"].use(A["a"]);var C,R,P={api_url:"https://baidu.com"};function B(){setTimeout(function(){C="",R={}},300)}function M(t,i){var s=Object.getOwnPropertyNames(t),a=Object.getOwnPropertyNames(i);if(s.length!==a.length)return!1;for(var h=0;h<s.length;h++){var o=s[h],n=t[o],r=i[o];if("object"===Object(e["a"])(n))return!!this.isObjectValueEqual(n,r);if(n!==r)return!1}return!0}function G(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},s=arguments.length>2?arguments[2]:void 0;if(C!==t||!M(R,i)){C=t,R=JSON.parse(JSON.stringify(i));var e=i;if("post"===s||"delete"===s||"put"===s){var a=new FormData;for(var h in i)a.append(h,i[h]);e=a}var o=-1!==t.indexOf("http")?t:P.api_url+t;return w.a.request(o,e,{method:s,timeout:1e4}).then(function(t){return B(),"delete"===s||204===t.status?t.text():200===t.status?t.data:void Object(b["a"])(JSON.parse(t.data).error.msg)}).catch(function(t){B();var i={200:"服务器成功返回请求的数据.",201:"新建或修改数据成功.",202:"一个请求已经进入后台排队（异步任务）.",204:"删除数据成功.",400:"发出的请求有错误，服务器没有进行新建或修改数据的操作.",401:"用户没有权限（令牌、用户名、密码错误）.",403:"用户得到授权，但是访问是被禁止的.",404:"发出的请求针对的是不存在的记录，服务器没有进行操作.",406:"请求的格式不可得",410:"请求的资源被永久删除，且不会再得到的.",422:"当创建一个对象时，发生一个验证错误.",500:"服务器发生错误，请检查服务器.",502:"网关错误",503:"服务不可用，服务器暂时过载或维护.",504:"网关超时"};if(t.status>=300){var s=i[t.status]||t.response.statusText;Object(b["a"])(s)}})}}G.get=function(t,i){return G(t,i,"get")},G.post=function(t,i){return G(t,i,"post")},G.delete=function(t,i){return G(t,i,"delete")},G.put=function(t,i){return G(t,i,"put")},a["a"].prototype.$http=G,new a["a"]({router:m,store:g,render:function(t){return t(u)}}).$mount("#app")},"5dbe":function(t,i,s){},6166:function(t,i,s){"use strict";var e=s("3aad"),a=s.n(e);a.a},6511:function(t,i,s){"use strict";s.r(i);var e=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"home"},[s("canvas",{attrs:{id:"myCanvas",width:t.width,height:t.height}}),s("div",{staticClass:"text"},[s("span",[t._v("存活细胞: ")]),s("span",[t._v(t._s(t.lifes))])]),s("div",{staticClass:"sub"},[s("van-radio-group",{model:{value:t.check,callback:function(i){t.check=i},expression:"check"}},[s("van-radio",{attrs:{name:"大爆炸"}},[t._v("大爆炸")]),s("van-radio",{attrs:{name:"小蝌蚪"}},[t._v("小蝌蚪")]),s("van-radio",{attrs:{name:"小泥鳅"}},[t._v("小泥鳅")]),s("van-radio",{attrs:{name:"大螃蟹"}},[t._v("大螃蟹")])],1),s("div",{staticClass:"btn"},[s("van-button",{on:{click:t.reset}},[t._v("清空")])],1),s("div",{staticClass:"rule",on:{click:function(i){t.showRule=!0}}},[t._v("游戏规则")])],1),s("van-popup",{staticClass:"rule-wrap",model:{value:t.showRule,callback:function(i){t.showRule=i},expression:"showRule"}},[s("span",[t._v("  生命游戏（Game of Life），即元胞自动机，是一种离散的状态机，有无数个独立的格子，每个格子处于某种状态，然后所有格子按照预先设定好的规律进行状态演化。格子们可以是任意维度、任意形状、按任意规律排布的。而生命游戏就是最简单的元胞自动机之一——在二维平面上的方格子（细胞），每个细胞有两种状态：死或活，而下一回合的状态完全受它周围8个细胞的状态而定。按照以下三条规则进行演化："),s("br")]),s("span",[t._v("1. 活细胞周围的细胞数如果小于2个或多于3个则会死亡；（离群或过度竞争导致死亡）"),s("br")]),s("span",[t._v("2. 活细胞周围如果有2或3个细胞可以继续存活；（正常生存）"),s("br")]),s("span",[t._v("3. 死细胞（空格）周围如果恰好有3个细胞则会诞生新的活细胞。（繁殖）"),s("br")]),s("span",[t._v("这三条规则简称B3/S23。如果调整规则对应的细胞数量，还能衍生出其他类型的自动机。"),s("br"),s("br")]),s("span",[t._v("游戏操作：选择指定的生物类型，点击屏幕即可生成指定生命种子，观察生命演化状态。"),s("br")])])],1)},a=[],h=(s("a481"),{components:{},data:function(){return{lifes:0,x:0,y:0,color:"",imgData:"",canvas:"",ctx:"",width:0,height:0,timer:"",check:"小蝌蚪",showRule:!1}},methods:{setGame:function(){var t=this;this.width=document.documentElement.clientWidth,this.height=document.documentElement.clientHeight-120,this.color={r:251,g:53,b:80,a:255},this.canvas=document.getElementById("myCanvas"),this.ctx=this.canvas.getContext("2d"),this.imgData=this.ctx.createImageData(this.width,this.height),this.canvas.addEventListener("mousedown",function(i){var s,e,a=0|t.canvas.style.width.replace(/\px/g,""),h=0|t.canvas.style.height.replace(/\px/g,"");i.pageX||i.pageY?(s=i.pageX,e=i.pageY):(s=i.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,e=i.clientY+document.body.scrollTop+document.documentElement.scrollTop),s-=t.canvas.offsetLeft,e-=t.canvas.offsetTop,a&&(s*=t.canvas.width/a),h&&(e*=t.canvas.height/h),s|=0,e|=0,t.ctx.clearRect(0,0,t.width,t.height),t.x=s,t.y=e,t.addBaby(s,e)},!1)},addBaby:function(t,i){"大爆炸"===this.check?this.bomb(t,i):"小蝌蚪"===this.check?this.tad(t,i):"小泥鳅"===this.check?this.loach(t,i):"大螃蟹"===this.check&&this.crab(t,i),this.ctx.putImageData(this.imgData,0,0)},startGame:function(){var t=this;this.timer||(this.timer=setInterval(function(){t.ctx.putImageData(t.imgData,0,0),t.setRule(t.imgData,t.width,t.height)},50))},reset:function(){for(var t=0;t<this.height;++t)for(var i=0;i<this.width;++i)this.setDeath(this.imgData,4*(t*this.width+i),this.color)},setAlive:function(t,i,s){t.data[i]=s.r,t.data[i+1]=s.g,t.data[i+2]=s.b,t.data[i+3]=s.a},setDeath:function(t,i){t.data[i]=0,t.data[i+1]=0,t.data[i+2]=0,t.data[i+3]=0},isAlive:function(t,i){return 0!=t.data[i]},setRule:function(t,i,s){this.lifes=0;for(var e=0,a=this.ctx.createImageData(i,s),h=0;h<s;++h)for(var o=0;o<i;++o)e=0,0!=h&&this.isAlive(t,4*((h-1)*i+o))&&e++,h!=s-1&&this.isAlive(t,4*((h+1)*i+o))&&e++,0!=o&&this.isAlive(t,4*(h*i+o-1))&&e++,o!=i-1&&this.isAlive(t,4*(h*i+o+1))&&e++,0!=o&&0!=h&&this.isAlive(t,4*((h-1)*i+o-1))&&e++,0!=o&&h!=s-1&&this.isAlive(t,4*((h+1)*i+o-1))&&e++,o!=i-1&&h!=s-1&&this.isAlive(t,4*((h+1)*i+o+1))&&e++,o!=i-1&&0!=h&&this.isAlive(t,4*((h-1)*i+o+1))&&e++,3===e?this.setAlive(a,4*(h*i+o),this.color):2===e?(a.data[4*(h*i+o)]=this.imgData.data[4*(h*i+o)],a.data[4*(h*i+o)+1]=this.imgData.data[4*(h*i+o)+1],a.data[4*(h*i+o)+2]=this.imgData.data[4*(h*i+o)+2],a.data[4*(h*i+o)+3]=this.imgData.data[4*(h*i+o)+3]):this.setDeath(a,4*(h*i+o),this.color),this.isAlive(a,4*(h*i+o))&&++this.lifes;for(var n=0;n<t.data.length;++n)t.data[n]=a.data[n]},bomb:function(){for(var t=0;t<this.height;++t)for(var i=0;i<this.width;i+=30)this.setAlive(this.imgData,4*(t*this.width+i),this.color)},tad:function(t,i){this.setAlive(this.imgData,4*((i-1)*this.width+t),this.color),this.setAlive(this.imgData,4*(i*this.width+(t+1)),this.color),this.setAlive(this.imgData,4*((i+1)*this.width+(t-1)),this.color),this.setAlive(this.imgData,4*((i+1)*this.width+t),this.color),this.setAlive(this.imgData,4*((i+1)*this.width+(t+1)),this.color)},loach:function(t,i){this.setAlive(this.imgData,4*((i-1)*this.width+(t+1)),this.color),this.setAlive(this.imgData,4*((i-1)*this.width+(t-2)),this.color),this.setAlive(this.imgData,4*((i+1)*this.width+(t-2)),this.color),this.setAlive(this.imgData,4*((i+2)*this.width+(t-1)),this.color),this.setAlive(this.imgData,4*((i+2)*this.width+t),this.color),this.setAlive(this.imgData,4*((i+2)*this.width+(t+1)),this.color),this.setAlive(this.imgData,4*(i*this.width+(t+2)),this.color),this.setAlive(this.imgData,4*((i+1)*this.width+(t+2)),this.color),this.setAlive(this.imgData,4*((i+2)*this.width+(t+2)),this.color)},crab:function(t,i){this.setAlive(this.imgData,4*((i-3)*this.width+(t-7)),this.color),this.setAlive(this.imgData,4*((i-3)*this.width+(t-6)),this.color),this.setAlive(this.imgData,4*((i-3)*this.width+(t-5)),this.color),this.setAlive(this.imgData,4*((i-2)*this.width+(t-5)),this.color),this.setAlive(this.imgData,4*((i+2)*this.width+(t-5)),this.color),this.setAlive(this.imgData,4*((i+3)*this.width+(t-5)),this.color),this.setAlive(this.imgData,4*((i+3)*this.width+(t-6)),this.color),this.setAlive(this.imgData,4*((i+3)*this.width+(t-7)),this.color),this.setAlive(this.imgData,4*((i-7)*this.width+(t-3)),this.color),this.setAlive(this.imgData,4*((i-6)*this.width+(t-3)),this.color),this.setAlive(this.imgData,4*((i-5)*this.width+(t-3)),this.color),this.setAlive(this.imgData,4*((i-2)*this.width+(t-3)),this.color),this.setAlive(this.imgData,4*((i-1)*this.width+(t-3)),this.color),this.setAlive(this.imgData,4*((i+1)*this.width+(t-3)),this.color),this.setAlive(this.imgData,4*((i+2)*this.width+(t-3)),this.color),this.setAlive(this.imgData,4*((i+5)*this.width+(t-3)),this.color),this.setAlive(this.imgData,4*((i+6)*this.width+(t-3)),this.color),this.setAlive(this.imgData,4*((i+7)*this.width+(t-3)),this.color),this.setAlive(this.imgData,4*((i-5)*this.width+(t-2)),this.color),this.setAlive(this.imgData,4*((i-3)*this.width+(t-2)),this.color),this.setAlive(this.imgData,4*((i-1)*this.width+(t-2)),this.color),this.setAlive(this.imgData,4*((i+1)*this.width+(t-2)),this.color),this.setAlive(this.imgData,4*((i+3)*this.width+(t-2)),this.color),this.setAlive(this.imgData,4*((i+5)*this.width+(t-2)),this.color),this.setAlive(this.imgData,4*((i-3)*this.width+(t-1)),this.color),this.setAlive(this.imgData,4*((i-2)*this.width+(t-1)),this.color),this.setAlive(this.imgData,4*((i+2)*this.width+(t-1)),this.color),this.setAlive(this.imgData,4*((i+3)*this.width+(t-1)),this.color),this.setAlive(this.imgData,4*((i-3)*this.width+(t+1)),this.color),this.setAlive(this.imgData,4*((i-2)*this.width+(t+1)),this.color),this.setAlive(this.imgData,4*((i+2)*this.width+(t+1)),this.color),this.setAlive(this.imgData,4*((i+3)*this.width+(t+1)),this.color),this.setAlive(this.imgData,4*((i-5)*this.width+(t+2)),this.color),this.setAlive(this.imgData,4*((i-3)*this.width+(t+2)),this.color),this.setAlive(this.imgData,4*((i-1)*this.width+(t+2)),this.color),this.setAlive(this.imgData,4*((i+1)*this.width+(t+2)),this.color),this.setAlive(this.imgData,4*((i+3)*this.width+(t+2)),this.color),this.setAlive(this.imgData,4*((i+5)*this.width+(t+2)),this.color),this.setAlive(this.imgData,4*((i-7)*this.width+(t+3)),this.color),this.setAlive(this.imgData,4*((i-6)*this.width+(t+3)),this.color),this.setAlive(this.imgData,4*((i-5)*this.width+(t+3)),this.color),this.setAlive(this.imgData,4*((i-2)*this.width+(t+3)),this.color),this.setAlive(this.imgData,4*((i-1)*this.width+(t+3)),this.color),this.setAlive(this.imgData,4*((i+1)*this.width+(t+3)),this.color),this.setAlive(this.imgData,4*((i+2)*this.width+(t+3)),this.color),this.setAlive(this.imgData,4*((i+5)*this.width+(t+3)),this.color),this.setAlive(this.imgData,4*((i+6)*this.width+(t+3)),this.color),this.setAlive(this.imgData,4*((i+7)*this.width+(t+3)),this.color),this.setAlive(this.imgData,4*((i-3)*this.width+(t+5)),this.color),this.setAlive(this.imgData,4*((i-2)*this.width+(t+5)),this.color),this.setAlive(this.imgData,4*((i+2)*this.width+(t+5)),this.color),this.setAlive(this.imgData,4*((i+3)*this.width+(t+5)),this.color),this.setAlive(this.imgData,4*((i-3)*this.width+(t+6)),this.color),this.setAlive(this.imgData,4*((i+3)*this.width+(t+6)),this.color),this.setAlive(this.imgData,4*((i-3)*this.width+(t+7)),this.color),this.setAlive(this.imgData,4*((i+3)*this.width+(t+7)),this.color)}},mounted:function(){this.setGame(),this.startGame()}}),o=h,n=(s("d2ae"),s("2877")),r=Object(n["a"])(o,e,a,!1,null,"66cff617",null);i["default"]=r.exports},"7faf":function(t,i,s){"use strict";var e=s("dc71"),a=s.n(e);a.a},cb15:function(t,i,s){t.exports=s.p+"static/img/default-avatar.2292e53b.png"},d2ae:function(t,i,s){"use strict";var e=s("5dbe"),a=s.n(e);a.a},dc71:function(t,i,s){}});
//# sourceMappingURL=app.70f5d621.js.map