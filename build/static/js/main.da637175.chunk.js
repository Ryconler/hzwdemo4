(this.webpackJsonpactivity=this.webpackJsonpactivity||[]).push([[0],{166:function(t,e){var n;function r(t){this.mode=a.MODE_8BIT_BYTE,this.data=t,this.parsedData=[];for(var e=0,n=this.data.length;e<n;e++){var r=[],i=this.data.charCodeAt(e);i>65536?(r[0]=240|(1835008&i)>>>18,r[1]=128|(258048&i)>>>12,r[2]=128|(4032&i)>>>6,r[3]=128|63&i):i>2048?(r[0]=224|(61440&i)>>>12,r[1]=128|(4032&i)>>>6,r[2]=128|63&i):i>128?(r[0]=192|(1984&i)>>>6,r[1]=128|63&i):r[0]=i,this.parsedData.push(r)}this.parsedData=Array.prototype.concat.apply([],this.parsedData),this.parsedData.length!=this.data.length&&(this.parsedData.unshift(191),this.parsedData.unshift(187),this.parsedData.unshift(239))}function i(t,e){this.typeNumber=t,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}r.prototype={getLength:function(t){return this.parsedData.length},write:function(t){for(var e=0,n=this.parsedData.length;e<n;e++)t.put(this.parsedData[e],8)}},i.prototype={addData:function(t){var e=new r(t);this.dataList.push(e),this.dataCache=null},isDark:function(t,e){if(t<0||this.moduleCount<=t||e<0||this.moduleCount<=e)throw new Error(t+","+e);return this.modules[t][e]},getModuleCount:function(){return this.moduleCount},make:function(){this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(t,e){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var n=0;n<this.moduleCount;n++){this.modules[n]=new Array(this.moduleCount);for(var r=0;r<this.moduleCount;r++)this.modules[n][r]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(t,e),this.typeNumber>=7&&this.setupTypeNumber(t),null==this.dataCache&&(this.dataCache=i.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,e)},setupPositionProbePattern:function(t,e){for(var n=-1;n<=7;n++)if(!(t+n<=-1||this.moduleCount<=t+n))for(var r=-1;r<=7;r++)e+r<=-1||this.moduleCount<=e+r||(this.modules[t+n][e+r]=0<=n&&n<=6&&(0==r||6==r)||0<=r&&r<=6&&(0==n||6==n)||2<=n&&n<=4&&2<=r&&r<=4)},getBestMaskPattern:function(){for(var t=0,e=0,n=0;n<8;n++){this.makeImpl(!0,n);var r=g.getLostPoint(this);(0==n||t>r)&&(t=r,e=n)}return e},createMovieClip:function(t,e,n){var r=t.createEmptyMovieClip(e,n);this.make();for(var i=0;i<this.modules.length;i++)for(var a=1*i,o=0;o<this.modules[i].length;o++){var s=1*o;this.modules[i][o]&&(r.beginFill(0,100),r.moveTo(s,a),r.lineTo(s+1,a),r.lineTo(s+1,a+1),r.lineTo(s,a+1),r.endFill())}return r},setupTimingPattern:function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=t%2==0);for(var e=8;e<this.moduleCount-8;e++)null==this.modules[6][e]&&(this.modules[6][e]=e%2==0)},setupPositionAdjustPattern:function(){for(var t=g.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var n=0;n<t.length;n++){var r=t[e],i=t[n];if(null==this.modules[r][i])for(var a=-2;a<=2;a++)for(var o=-2;o<=2;o++)this.modules[r+a][i+o]=-2==a||2==a||-2==o||2==o||0==a&&0==o}},setupTypeNumber:function(t){for(var e=g.getBCHTypeNumber(this.typeNumber),n=0;n<18;n++){var r=!t&&1==(e>>n&1);this.modules[Math.floor(n/3)][n%3+this.moduleCount-8-3]=r}for(n=0;n<18;n++){r=!t&&1==(e>>n&1);this.modules[n%3+this.moduleCount-8-3][Math.floor(n/3)]=r}},setupTypeInfo:function(t,e){for(var n=this.errorCorrectLevel<<3|e,r=g.getBCHTypeInfo(n),i=0;i<15;i++){var a=!t&&1==(r>>i&1);i<6?this.modules[i][8]=a:i<8?this.modules[i+1][8]=a:this.modules[this.moduleCount-15+i][8]=a}for(i=0;i<15;i++){a=!t&&1==(r>>i&1);i<8?this.modules[8][this.moduleCount-i-1]=a:i<9?this.modules[8][15-i-1+1]=a:this.modules[8][15-i-1]=a}this.modules[this.moduleCount-8][8]=!t},mapData:function(t,e){for(var n=-1,r=this.moduleCount-1,i=7,a=0,o=this.moduleCount-1;o>0;o-=2)for(6==o&&o--;;){for(var s=0;s<2;s++)if(null==this.modules[r][o-s]){var c=!1;a<t.length&&(c=1==(t[a]>>>i&1)),g.getMask(e,r,o-s)&&(c=!c),this.modules[r][o-s]=c,-1==--i&&(a++,i=7)}if((r+=n)<0||this.moduleCount<=r){r-=n,n=-n;break}}}},i.PAD0=236,i.PAD1=17,i.createData=function(t,e,n){for(var r=w.getRSBlocks(t,e),a=new y,o=0;o<n.length;o++){var s=n[o];a.put(s.mode,4),a.put(s.getLength(),g.getLengthInBits(s.mode,t)),s.write(a)}var c=0;for(o=0;o<r.length;o++)c+=r[o].dataCount;if(a.getLengthInBits()>8*c)throw new Error("code length overflow. ("+a.getLengthInBits()+">"+8*c+")");for(a.getLengthInBits()+4<=8*c&&a.put(0,4);a.getLengthInBits()%8!=0;)a.putBit(!1);for(;!(a.getLengthInBits()>=8*c)&&(a.put(i.PAD0,8),!(a.getLengthInBits()>=8*c));)a.put(i.PAD1,8);return i.createBytes(a,r)},i.createBytes=function(t,e){for(var n=0,r=0,i=0,a=new Array(e.length),o=new Array(e.length),s=0;s<e.length;s++){var c=e[s].dataCount,u=e[s].totalCount-c;r=Math.max(r,c),i=Math.max(i,u),a[s]=new Array(c);for(var h=0;h<a[s].length;h++)a[s][h]=255&t.buffer[h+n];n+=c;var l=g.getErrorCorrectPolynomial(u),f=new b(a[s],l.getLength()-1).mod(l);o[s]=new Array(l.getLength()-1);for(h=0;h<o[s].length;h++){var d=h+f.getLength()-o[s].length;o[s][h]=d>=0?f.get(d):0}}var p=0;for(h=0;h<e.length;h++)p+=e[h].totalCount;var m=new Array(p),v=0;for(h=0;h<r;h++)for(s=0;s<e.length;s++)h<a[s].length&&(m[v++]=a[s][h]);for(h=0;h<i;h++)for(s=0;s<e.length;s++)h<o[s].length&&(m[v++]=o[s][h]);return m};for(var a={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},o={L:1,M:0,Q:3,H:2},s=0,c=1,u=2,h=3,l=4,f=5,d=6,p=7,g={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){for(var e=t<<10;g.getBCHDigit(e)-g.getBCHDigit(g.G15)>=0;)e^=g.G15<<g.getBCHDigit(e)-g.getBCHDigit(g.G15);return(t<<10|e)^g.G15_MASK},getBCHTypeNumber:function(t){for(var e=t<<12;g.getBCHDigit(e)-g.getBCHDigit(g.G18)>=0;)e^=g.G18<<g.getBCHDigit(e)-g.getBCHDigit(g.G18);return t<<12|e},getBCHDigit:function(t){for(var e=0;0!=t;)e++,t>>>=1;return e},getPatternPosition:function(t){return g.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,n){switch(t){case s:return(e+n)%2==0;case c:return e%2==0;case u:return n%3==0;case h:return(e+n)%3==0;case l:return(Math.floor(e/2)+Math.floor(n/3))%2==0;case f:return e*n%2+e*n%3==0;case d:return(e*n%2+e*n%3)%2==0;case p:return(e*n%3+(e+n)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new b([1],0),n=0;n<t;n++)e=e.multiply(new b([1,m.gexp(n)],0));return e},getLengthInBits:function(t,e){if(1<=e&&e<10)switch(t){case a.MODE_NUMBER:return 10;case a.MODE_ALPHA_NUM:return 9;case a.MODE_8BIT_BYTE:case a.MODE_KANJI:return 8;default:throw new Error("mode:"+t)}else if(e<27)switch(t){case a.MODE_NUMBER:return 12;case a.MODE_ALPHA_NUM:return 11;case a.MODE_8BIT_BYTE:return 16;case a.MODE_KANJI:return 10;default:throw new Error("mode:"+t)}else{if(!(e<41))throw new Error("type:"+e);switch(t){case a.MODE_NUMBER:return 14;case a.MODE_ALPHA_NUM:return 13;case a.MODE_8BIT_BYTE:return 16;case a.MODE_KANJI:return 12;default:throw new Error("mode:"+t)}}},getLostPoint:function(t){for(var e=t.getModuleCount(),n=0,r=0;r<e;r++)for(var i=0;i<e;i++){for(var a=0,o=t.isDark(r,i),s=-1;s<=1;s++)if(!(r+s<0||e<=r+s))for(var c=-1;c<=1;c++)i+c<0||e<=i+c||0==s&&0==c||o==t.isDark(r+s,i+c)&&a++;a>5&&(n+=3+a-5)}for(r=0;r<e-1;r++)for(i=0;i<e-1;i++){var u=0;t.isDark(r,i)&&u++,t.isDark(r+1,i)&&u++,t.isDark(r,i+1)&&u++,t.isDark(r+1,i+1)&&u++,0!=u&&4!=u||(n+=3)}for(r=0;r<e;r++)for(i=0;i<e-6;i++)t.isDark(r,i)&&!t.isDark(r,i+1)&&t.isDark(r,i+2)&&t.isDark(r,i+3)&&t.isDark(r,i+4)&&!t.isDark(r,i+5)&&t.isDark(r,i+6)&&(n+=40);for(i=0;i<e;i++)for(r=0;r<e-6;r++)t.isDark(r,i)&&!t.isDark(r+1,i)&&t.isDark(r+2,i)&&t.isDark(r+3,i)&&t.isDark(r+4,i)&&!t.isDark(r+5,i)&&t.isDark(r+6,i)&&(n+=40);var h=0;for(i=0;i<e;i++)for(r=0;r<e;r++)t.isDark(r,i)&&h++;return n+=10*(Math.abs(100*h/e/e-50)/5)}},m={glog:function(t){if(t<1)throw new Error("glog("+t+")");return m.LOG_TABLE[t]},gexp:function(t){for(;t<0;)t+=255;for(;t>=256;)t-=255;return m.EXP_TABLE[t]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},v=0;v<8;v++)m.EXP_TABLE[v]=1<<v;for(v=8;v<256;v++)m.EXP_TABLE[v]=m.EXP_TABLE[v-4]^m.EXP_TABLE[v-5]^m.EXP_TABLE[v-6]^m.EXP_TABLE[v-8];for(v=0;v<255;v++)m.LOG_TABLE[m.EXP_TABLE[v]]=v;function b(t,e){if(void 0==t.length)throw new Error(t.length+"/"+e);for(var n=0;n<t.length&&0==t[n];)n++;this.num=new Array(t.length-n+e);for(var r=0;r<t.length-n;r++)this.num[r]=t[r+n]}function w(t,e){this.totalCount=t,this.dataCount=e}function y(){this.buffer=[],this.length=0}b.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=new Array(this.getLength()+t.getLength()-1),n=0;n<this.getLength();n++)for(var r=0;r<t.getLength();r++)e[n+r]^=m.gexp(m.glog(this.get(n))+m.glog(t.get(r)));return new b(e,0)},mod:function(t){if(this.getLength()-t.getLength()<0)return this;for(var e=m.glog(this.get(0))-m.glog(t.get(0)),n=new Array(this.getLength()),r=0;r<this.getLength();r++)n[r]=this.get(r);for(r=0;r<t.getLength();r++)n[r]^=m.gexp(m.glog(t.get(r))+e);return new b(n,0).mod(t)}},w.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],w.getRSBlocks=function(t,e){var n=w.getRsBlockTable(t,e);if(void 0==n)throw new Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+e);for(var r=n.length/3,i=[],a=0;a<r;a++)for(var o=n[3*a+0],s=n[3*a+1],c=n[3*a+2],u=0;u<o;u++)i.push(new w(s,c));return i},w.getRsBlockTable=function(t,e){switch(e){case o.L:return w.RS_BLOCK_TABLE[4*(t-1)+0];case o.M:return w.RS_BLOCK_TABLE[4*(t-1)+1];case o.Q:return w.RS_BLOCK_TABLE[4*(t-1)+2];case o.H:return w.RS_BLOCK_TABLE[4*(t-1)+3];default:return}},y.prototype={get:function(t){var e=Math.floor(t/8);return 1==(this.buffer[e]>>>7-t%8&1)},put:function(t,e){for(var n=0;n<e;n++)this.putBit(1==(t>>>e-n-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}};var _=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]];function k(){var t=!1,e=navigator.userAgent;if(/android/i.test(e)){t=!0;var n=e.toString().match(/android ([0-9]\.[0-9])/i);n&&n[1]&&(t=parseFloat(n[1]))}return t}var C=function(){var t=function(t,e){this._el=t,this._htOption=e};return t.prototype.draw=function(t){var e=this._htOption,n=this._el,r=t.getModuleCount();Math.floor(e.width/r),Math.floor(e.height/r);function i(t,e){var n=document.createElementNS("http://www.w3.org/2000/svg",t);for(var r in e)e.hasOwnProperty(r)&&n.setAttribute(r,e[r]);return n}this.clear();var a=i("svg",{viewBox:"0 0 "+String(r)+" "+String(r),width:"100%",height:"100%",fill:e.colorLight});a.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink"),n.appendChild(a),a.appendChild(i("rect",{fill:e.colorLight,width:"100%",height:"100%"})),a.appendChild(i("rect",{fill:e.colorDark,width:"1",height:"1",id:"template"}));for(var o=0;o<r;o++)for(var s=0;s<r;s++)if(t.isDark(o,s)){var c=i("use",{x:String(s),y:String(o)});c.setAttributeNS("http://www.w3.org/1999/xlink","href","#template"),a.appendChild(c)}},t.prototype.clear=function(){for(;this._el.hasChildNodes();)this._el.removeChild(this._el.lastChild)},t}(),O="svg"===document.documentElement.tagName.toLowerCase()?C:"undefined"==typeof CanvasRenderingContext2D?function(){var t=function(t,e){this._el=t,this._htOption=e};return t.prototype.draw=function(t){for(var e=this._htOption,n=this._el,r=t.getModuleCount(),i=Math.floor(e.width/r),a=Math.floor(e.height/r),o=['<table style="border:0;border-collapse:collapse;">'],s=0;s<r;s++){o.push("<tr>");for(var c=0;c<r;c++)o.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:'+i+"px;height:"+a+"px;background-color:"+(t.isDark(s,c)?e.colorDark:e.colorLight)+';"></td>');o.push("</tr>")}o.push("</table>"),n.innerHTML=o.join("");var u=n.childNodes[0],h=(e.width-u.offsetWidth)/2,l=(e.height-u.offsetHeight)/2;h>0&&l>0&&(u.style.margin=l+"px "+h+"px")},t.prototype.clear=function(){this._el.innerHTML=""},t}():function(){function t(){this._elImage.src=this._elCanvas.toDataURL("image/png"),this._elImage.style.display="block",this._elCanvas.style.display="none"}if(this&&this._android&&this._android<=2.1){var e=1/window.devicePixelRatio,n=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(t,r,i,a,o,s,c,u,h){if("nodeName"in t&&/img/i.test(t.nodeName))for(var l=arguments.length-1;l>=1;l--)arguments[l]=arguments[l]*e;else"undefined"==typeof u&&(arguments[1]*=e,arguments[2]*=e,arguments[3]*=e,arguments[4]*=e);n.apply(this,arguments)}}function r(t,e){var n=this;if(n._fFail=e,n._fSuccess=t,null===n._bSupportDataURI){var r=document.createElement("img"),i=function(){n._bSupportDataURI=!1,n._fFail&&n._fFail.call(n)};return r.onabort=i,r.onerror=i,r.onload=function(){n._bSupportDataURI=!0,n._fSuccess&&n._fSuccess.call(n)},void(r.src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==")}!0===n._bSupportDataURI&&n._fSuccess?n._fSuccess.call(n):!1===n._bSupportDataURI&&n._fFail&&n._fFail.call(n)}var i=function(t,e){this._bIsPainted=!1,this._android=k(),this._htOption=e,this._elCanvas=document.createElement("canvas"),this._elCanvas.width=e.width,this._elCanvas.height=e.height,t.appendChild(this._elCanvas),this._el=t,this._oContext=this._elCanvas.getContext("2d"),this._bIsPainted=!1,this._elImage=document.createElement("img"),this._elImage.alt="Scan me!",this._elImage.style.display="none",this._el.appendChild(this._elImage),this._bSupportDataURI=null};return i.prototype.draw=function(t){var e=this._elImage,n=this._oContext,r=this._htOption,i=t.getModuleCount(),a=r.width/i,o=r.height/i,s=Math.round(a),c=Math.round(o);e.style.display="none",this.clear();for(var u=0;u<i;u++)for(var h=0;h<i;h++){var l=t.isDark(u,h),f=h*a,d=u*o;n.strokeStyle=l?r.colorDark:r.colorLight,n.lineWidth=1,n.fillStyle=l?r.colorDark:r.colorLight,n.fillRect(f,d,a,o),n.strokeRect(Math.floor(f)+.5,Math.floor(d)+.5,s,c),n.strokeRect(Math.ceil(f)-.5,Math.ceil(d)-.5,s,c)}this._bIsPainted=!0},i.prototype.makeImage=function(){this._bIsPainted&&r.call(this,t)},i.prototype.isPainted=function(){return this._bIsPainted},i.prototype.clear=function(){this._oContext.clearRect(0,0,this._elCanvas.width,this._elCanvas.height),this._bIsPainted=!1},i.prototype.round=function(t){return t?Math.floor(1e3*t)/1e3:t},i}();function L(t,e){for(var n=1,r=function(t){var e=encodeURI(t).toString().replace(/\%[0-9a-fA-F]{2}/g,"a");return e.length+(e.length!=t?3:0)}(t),i=0,a=_.length;i<=a;i++){var s=0;switch(e){case o.L:s=_[i][0];break;case o.M:s=_[i][1];break;case o.Q:s=_[i][2];break;case o.H:s=_[i][3]}if(r<=s)break;n++}if(n>_.length)throw new Error("Too long data");return n}n=function(t,e){if(this._htOption={width:256,height:256,typeNumber:4,colorDark:"#000000",colorLight:"#ffffff",correctLevel:o.H},"string"===typeof e&&(e={text:e}),e)for(var n in e)this._htOption[n]=e[n];"string"==typeof t&&(t=document.getElementById(t)),this._htOption.useSVG&&(O=C),this._android=k(),this._el=t,this._oQRCode=null,this._oDrawing=new O(this._el,this._htOption),this._htOption.text&&this.makeCode(this._htOption.text)},n.prototype.makeCode=function(t){this._oQRCode=new i(L(t,this._htOption.correctLevel),this._htOption.correctLevel),this._oQRCode.addData(t),this._oQRCode.make(),this._el.title=t,this._oDrawing.draw(this._oQRCode),this.makeImage()},n.prototype.makeImage=function(){"function"==typeof this._oDrawing.makeImage&&(!this._android||this._android>=3)&&this._oDrawing.makeImage()},n.prototype.clear=function(){this._oDrawing.clear()},n.CorrectLevel=o,t.exports=n},172:function(t,e,n){},174:function(t,e,n){"use strict";n.r(e);var r,i=n(0),a=n.n(i),o=n(20),s=n.n(o),c=n(105),u=n.n(c),h=n(16),l=n(17),f=n(18),d=n(40),p=n(42),g=n(59),m=n(96),v=n.n(m),b=n(9),w=function(t){Object(d.a)(n,t);var e=Object(p.a)(n);function n(t){return Object(l.a)(this,n),e.call(this,t)}return Object(f.a)(n,[{key:"render",value:function(){return Object(b.jsx)("div",{className:v.a.loading,style:{display:this.props.show?"":"none"}})}}]),n}(i.Component),y=n(73),_=[{path:"/heimlich",component:a.a.lazy((function(){return Promise.all([n.e(2),n.e(4)]).then(n.bind(null,372))}))}],k=n(103),C=n(5),O=function(t){Object(d.a)(n,t);var e=Object(p.a)(n);function n(){return Object(l.a)(this,n),e.apply(this,arguments)}return Object(f.a)(n,[{key:"render",value:function(){return Object(b.jsx)(i.Suspense,{fallback:null,children:Object(b.jsx)(k.a,{basename:"/interaction-activity",children:Object(b.jsx)(C.c,{children:_.map((function(t,e){return Object(b.jsx)(C.a,{path:t.path,exact:!0,component:t.component},e)}))})})})}}]),n}(i.Component),L=O,D=Object(g.b)(r=function(t){Object(d.a)(n,t);var e=Object(p.a)(n);function n(){return Object(l.a)(this,n),e.apply(this,arguments)}return Object(f.a)(n,[{key:"render",value:function(){return Object(b.jsx)(g.a,Object(h.a)(Object(h.a)({},y.a),{},{children:Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(w,{show:y.a.common.animating}),Object(b.jsx)(L,{})]})}))}}]),n}(i.Component))||r,j=D,P=function(t){t&&t instanceof Function&&n.e(5).then(n.bind(null,371)).then((function(e){var n=e.getCLS,r=e.getFID,i=e.getFCP,a=e.getLCP,o=e.getTTFB;n(t),r(t),i(t),a(t),o(t)}))},E=n(45);n(172);"1"===(Object(E.d)(location.href)||{}).debug&&new u.a,s.a.render(Object(b.jsx)(j,{}),document.getElementById("root")),P()},45:function(t,e,n){"use strict";n.d(e,"b",(function(){return l})),n.d(e,"f",(function(){return f})),n.d(e,"d",(function(){return d})),n.d(e,"e",(function(){return v})),n.d(e,"c",(function(){return b})),n.d(e,"a",(function(){return y}));n(16);var r=n(4),i=n(8),a=n(10),o=n.n(a),s=(n(102),n(13)),c=n.n(s),u=(n(106),n(162));var h=function(){var t=o.a.get("source")||"";return["ios","android"].indexOf(t)>-1};var l=function(){var t=Object(i.a)(Object(r.a)().mark((function t(e){var n;return Object(r.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(n={}).cityCode="320100",n.cityName="\u5357\u4eac",t.abrupt("return",n);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),f=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];window.kwapp&&(window.kwapp.onReady((function(){window.kwapp.allowRefreshOrShare(e,n)})),window.kwapp.setTitle(t),document.title=t,window.kwapp.allowRefreshOrShare(e,n),setTimeout((function(){window.kwapp.setTitle(t),window.kwapp.allowRefreshOrShare(e,n)}),500))},d=function(t){var e={},n=c.a.split(t,"?").length>1?c.a.split(t,"?")[1]:null;if(!n)return null;var r=c.a.split(n,"&");return c.a.forEach(r,(function(t){var n=c.a.split(decodeURIComponent(t),"=")[0],r=c.a.split(decodeURIComponent(t),"=")[1];e[n]=r})),e};function p(){return g.apply(this,arguments)}function g(){return(g=Object(i.a)(Object(r.a)().mark((function t(){return Object(r.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t,e){u.miniProgram.getEnv((function(e){e.miniprogram?t("miniprogram"):t("wechat")}))})));case 1:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var m=/MicroMessenger/i.test(navigator.userAgent),v=function(){var t=Object(i.a)(Object(r.a)().mark((function t(){return Object(r.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.t0=m,!t.t0){t.next=6;break}return t.next=4,p();case 4:t.t1=t.sent,t.t0="miniprogram"===t.t1;case 6:return t.abrupt("return",t.t0);case 7:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),b=function(){var t=Object(i.a)(Object(r.a)().mark((function t(){return Object(r.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",w());case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),w=function(){var t=Object(i.a)(Object(r.a)().mark((function t(){return Object(r.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return"","",t.abrupt("return",{lat:"",lng:""});case 3:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),y=function(){return new Promise((function(t,e){var n=o.a.get("uid"),r=o.a.get("skey"),i=o.a.get("phone");if(n&&r)return t({uid:n,skey:r,phone:i});e(new Error("\u672a\u767b\u5f55")),location.href=h()?"/login?cmd=login":"//passport.cekid.com/passport/login?referer=".concat(encodeURIComponent(location.href))}))}},73:function(t,e,n){"use strict";var r=n(17),i=n(18),a=n(2),o=new(function(){function t(){Object(r.a)(this,t),this.animating=!1,this.loading=0,this.loadingTimer=null,this.isShowPopup=!1,this.userInfo={},Object(a.l)(this)}return Object(i.a)(t,[{key:"startLoading",value:function(){var t=this;this.loading+=1,null===this.loadingTimer&&(this.loadingTimer=setTimeout((function(){t.animating=!0}),200))}},{key:"endLoading",value:function(){this.loading>0?this.loading-=1:this.loading=0,0===this.loading&&(this.animating=!1,clearTimeout(this.loadingTimer),this.loadingTimer=null)}},{key:"showPopup",value:function(){this.isShowPopup=!0,document.documentElement.style.position="fixed"}},{key:"hidePopup",value:function(){this.isShowPopup=!1,document.documentElement.style.position=""}}]),t}()),s=n(16),c=n(58),u=n(74),h=(n(79),n(46)),l=n.n(h),f=n(4),d=n(8),p=n(10),g=n.n(p),m=n(179);function v(t){return b.apply(this,arguments)}function b(){return b=Object(d.a)(Object(f.a)().mark((function t(e){var n,r,i,a,o,c,u,h,d,p,g,v,b,w,y,_=arguments;return Object(f.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=_.length>1&&void 0!==_[1]?_[1]:{},i=(r=_.length>2&&void 0!==_[2]?_[2]:{}).codeField,a=void 0===i?"code":i,o=r.msgField,c=void 0===o?"msg":o,u=r.isSuccess,h=r.shouldLogin,d=r.hideNotify,p=void 0!==d&&d,g=r.ignoreLogin,void 0!==g&&g,v={credentials:"include",cache:"no-cache"},n=Object(s.a)(Object(s.a)({},v),n),["POST","PUT","DELETE"].includes(n.method)&&(n.headers=Object(s.a)({Accept:"application/json","Content-Type":"application/json;charset=utf-8"},n.headers),"object"===typeof n.body&&(n.body=JSON.stringify(n.body))),b="","",t.prev=8,t.next=11,window.fetch(e,n);case 11:return w=t.sent,w.headers.get("x-trace-id")||"",t.next=15,w.clone().text();case 15:return b=t.sent,t.next=18,w.json();case 18:if(y=t.sent,!(e.indexOf("DoLikeCommentForService")>0||e.indexOf("GetCommentDetailForService")>0)){t.next=21;break}return t.abrupt("return",y);case 21:if(!("function"===typeof u?u(y):1===+y.code||1001===+y.code||0===+y.errno)){t.next=25;break}return t.abrupt("return",y);case 25:if(!("function"===typeof h?h(y):1005===+y.code||500011===+y.code||1024===+y.errno||1024===+y.code)){t.next=29;break}throw"login";case 29:throw y;case 30:t.next=38;break;case 32:if(t.prev=32,t.t0=t.catch(8),"login"!==t.t0){t.next=36;break}throw t.t0;case 36:throw t.t0 instanceof Error||!t.t0[c]||void 0===typeof t.t0[a]?(!0!==p&&l.a.offline("\u7f51\u7edc\u9519\u8bef"),"production"===Object({NODE_ENV:"production",PUBLIC_URL:"https://st.haiziwang.com/p/h5-digitalize-activity",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_ENV&&m.b((function(r){r.setExtras({url:e,options:n,responseBody:b,desc:"\u7f51\u7edc\u9519\u8bef"}),m.a(t.t0)}))):!0!==p&&l.a.fail(t.t0[c]),t.t0;case 38:case"end":return t.stop()}}),t,null,[[8,32]])}))),b.apply(this,arguments)}var w=n(13),y=n.n(w),_=function(t){var e=g.a.get("uid")||"",n=g.a.get("skey")||"";return v("".concat("https://www.fastmock.site/mock/75319f595e971601094c05cf661306d6/mock/querySkillBadgeCertifiedNum.do","?skillCode=").concat(t.skillCode,"&uid=").concat(e,"&skey=").concat(n),{},{isSuccess:function(t){return"0"==y.a.get(t,"code")}})},k=function(t){return v("".concat("https://www.fastmock.site/mock/75319f595e971601094c05cf661306d6/mock/queryTopicComment2.do","?param=").concat(JSON.stringify(t)),{},{msgField:"message",hideNotify:!0})},C=n(45),O=function(){function t(){Object(r.a)(this,t),this.cityInfo={cityName:"\u5357\u4eac",cityCode:"320100"},this.position={lat:"",lng:""},this.cmsData=null,this.badgeData={totalNum:"",userRank:-1,isUnlocked:!1,isShared:!1},this.prizeList=[],this.certPrizeList=[],this.certPirzeCids=[],this.certPrizesSendResult=[],this.sharePrizeList=[],this.sharePirzeCids=[],this.activityList=[],this.commentList=[],this.commentListQuery={loading:!1,finished:!1,params:{pageNo:1,pageSize:6,sort:2}},this.isSharing=!1,this.questions=void 0,Object(a.l)(this)}return Object(i.a)(t,[{key:"getLocationInfo",value:function(){var t=Object(d.a)(Object(f.a)().mark((function t(){return Object(f.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(C.c)();case 2:return this.position=t.sent,t.next=5,Object(C.b)();case 5:this.cityInfo=t.sent;case 6:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"getCmsData",value:function(){var t=Object(d.a)(Object(f.a)().mark((function t(){var e;return Object(f.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,v("https://www.fastmock.site/mock/75319f595e971601094c05cf661306d6/mock/qinzihudong-heimlich.json",{credentials:"omit"},{codeField:"code",msgField:"message",isSuccess:function(t){return 0==y.a.get(t,"code")}});case 3:return e=t.sent,this.cmsData=e.data,t.abrupt("return",e.data);case 8:return t.prev=8,t.t0=t.catch(0),console.error(t.t0),l.a.fail("\u7f51\u7edc\u5f02\u5e38\u6216\u6570\u636e\u9519\u8bef"),t.abrupt("return",null);case 13:case"end":return t.stop()}}),t,this,[[0,8]])})));return function(){return t.apply(this,arguments)}}()},{key:"getBadgeData",value:function(){var t=Object(d.a)(Object(f.a)().mark((function t(){var e,n,r,i,a,o;return Object(f.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,_({skillCode:10});case 3:if(r=t.sent,null!==(e=r.content)&&void 0!==e&&e.result&&(this.badgeData.isUnlocked=!!r.content.result.userRank&&r.content.result.userRank>0,this.badgeData.userRank=!!r.content.result.userRank&&r.content.result.userRank,this.badgeData.totalNum=r.content.result.certifiedTotalNum),!1,i=null===(n=this.cmsData)||void 0===n?void 0:n.prizeConfig.sharePrizes.map((function(t){return t.cid}))){a=Object(u.a)(i);try{for(a.s();!(o=a.n()).done;)o.value,[]}catch(s){a.e(s)}finally{a.f()}}this.badgeData.isShared=false,t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),console.error(t.t0);case 14:case"end":return t.stop()}}),t,this,[[0,11]])})));return function(){return t.apply(this,arguments)}}()},{key:"getPrizeList",value:function(){var t=Object(d.a)(Object(f.a)().mark((function t(){var e,n,r;return Object(f.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:this.cmsData?(e=this.badgeData.isUnlocked?this.cmsData.prizeConfig.sharePrizes:this.cmsData.prizeConfig.certifyPrizes,this.prizeList=e.map((function(t){return t.list})).flat(),n=this.cmsData.prizeConfig.sharePrizes,this.sharePrizeList=n.map((function(t){return t.list})).flat(),r=this.cmsData.prizeConfig.certifyPrizes,this.certPrizeList=r.map((function(t){return t.list})).flat(),this.certPirzeCids=this.cmsData.prizeConfig.certifyPrizes.map((function(t){return t.cid})),this.sharePirzeCids=this.cmsData.prizeConfig.sharePrizes.map((function(t){return t.cid}))):(this.prizeList=[],this.certPrizeList=[],this.sharePrizeList=[],this.certPirzeCids=[],this.sharePirzeCids=[]);case 1:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"getActivityList",value:function(){var t=Object(d.a)(Object(f.a)().mark((function t(){var e,n;return Object(f.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,r={cityCode:this.cityInfo.cityCode,page:1,pageSize:3,typeCode:"10171140,10171154",type:2,orderByCond:3,lat:this.position.lat?+this.position.lat:void 0,lng:this.position.lng?+this.position.lng:void 0},v("".concat("https://www.fastmock.site/mock/75319f595e971601094c05cf661306d6/mock/queryActList.do","?param=").concat(JSON.stringify(r)),{},{isSuccess:function(t){return"1"==y.a.get(t,"code")}});case 3:n=t.sent,this.activityList=(null===(e=n.data)||void 0===e?void 0:e.list)||[],t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.error(t.t0);case 10:case"end":return t.stop()}var r}),t,this,[[0,7]])})));return function(){return t.apply(this,arguments)}}()},{key:"getCommentList",value:function(){var t=Object(d.a)(Object(f.a)().mark((function t(){var e,n,r,i,a,o,u=arguments;return Object(f.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(u.length>0&&void 0!==u[0]&&u[0]&&(this.commentListQuery.params.pageNo=1,this.commentListQuery.finished=!1,this.commentList=[]),this.cmsData){t.next=4;break}return t.abrupt("return");case 4:if(0==this.commentList.length&&(this.commentList=Object(c.a)(this.cmsData.homeConfig.dajiashuo.commentList)),e=this.cmsData.homeConfig.dajiashuo.topicInfo.id){t.next=8;break}return t.abrupt("return");case 8:return this.commentListQuery.loading=!0,t.prev=9,t.next=12,k(Object(s.a)({topicId:e},this.commentListQuery.params));case 12:i=t.sent,(null===(n=i.data)||void 0===n||null===(r=n.list)||void 0===r?void 0:r.length)>0&&(o=i.data.list.map((function(t){return{image:t.imageList[0],content:t.comment,userAvatar:t.headImage,userName:t.nickName,likeFlag:t.likeFlag,likeNum:t.likeNum,id:t.commentId,activityId:t.activityId,uid:t.uid}})),(a=this.commentList).push.apply(a,Object(c.a)(o)),this.commentListQuery.params.pageNo++,this.commentListQuery.finished=!0),t.next=20;break;case 16:t.prev=16,t.t0=t.catch(9),console.error(t.t0),this.commentListQuery.finished=!0;case 20:return t.prev=20,this.commentListQuery.loading=!1,t.finish(20);case 23:case"end":return t.stop()}}),t,this,[[9,16,20,23]])})));return function(){return t.apply(this,arguments)}}()},{key:"getCertPrizesSendResult",value:function(){var t=Object(d.a)(Object(f.a)().mark((function t(){var e,n,r,i,a;return Object(f.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e=this.certPirzeCids,n=[],e&&Array.isArray(e)&&e.length>0){r=Object(u.a)(e);try{for(r.s();!(i=r.n()).done;)i.value,null,(a=[])&&Array.isArray(a)&&a.length>0&&n.push.apply(n,Object(c.a)(a))}catch(o){r.e(o)}finally{r.f()}}this.certPrizesSendResult=n;case 4:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"setShared",value:function(){this.badgeData.isShared=!0}},{key:"setQuestions",value:function(t){console.log(this),this.questions=t}}]),t}(),L=new O;e.a={common:o,heimlich:L}},96:function(t,e,n){t.exports={loading:"Loading_loading__38WPi",scale:"Loading_scale__1JUI-",up:"Loading_up__2-FZ9"}}},[[174,1,3]]]);