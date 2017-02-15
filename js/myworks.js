"use strict";
document.addEventListener("DOMContentLoaded",function(){
	
	//时钟
	(function() {
		var oClock = document.querySelector("#clock");
		var aImg = oClock.getElementsByTagName("img");

		function tick() {
			var oDate = new Date();
			var h = oDate.getHours();
			var m = oDate.getMinutes();
			var s = oDate.getSeconds();
			var str = fillZero(h) + fillZero(m) + fillZero(s);
			for (var i = 0; i < aImg.length; i++) {
				move(aImg[i], {
					top: -35 * str.charAt(i)
				}, {
					duration: 300
				})
			}
		}
		tick();
		setInterval(tick, 1000)
	})();
	
	//mac
	(function(){
		var oDock = document.getElementById("dock-box");
		var aImg = oDock.children;
		document.onmousemove = function(ev) {
			var oEvent = ev || event;
			for (var i = 0; i < aImg.length; i++) {
				//获取当前鼠标的位置距每一个图片的距离
				
				var a = getOffset(oDock).x + aImg[i].offsetLeft + aImg[i].offsetWidth / 2 - oEvent.pageX;
				var b = getOffset(oDock).y + aImg[i].offsetTop + aImg[i].offsetHeight / 2 - oEvent.pageY;
				var c = Math.sqrt(a * a + b * b);
				//获取距离比值
				var scale = 1 - c / 500;
				if (scale < 0.5) {
					scale = 0.5
				}
				aImg[i].width = scale * 128
			}
		}
	})();
			
	//无缝滚动
	(function(){
		var oScroll=document.getElementById("scroll");
		var oUl=oScroll.children[0];
		var aHead=oScroll.children[1].children;
		var oPrev=oScroll.children[2];
		var oNext=oScroll.children[3];
		var oLiW=oUl.children[0].offsetWidth;
		
		var ready=true;
		
		oUl.innerHTML+=oUl.innerHTML;
		oUl.style.width=oLiW*oUl.children.length+'px';
		
		var now=0;
		//prev、next隐藏与消失
		oScroll.onmouseover=function(){
			oPrev.style.display=oNext.style.display="block";
		}
		oScroll.onmouseout=function(){
			oPrev.style.display=oNext.style.display="none";
		}
		//传递now
		for(var i=0;i<aHead.length;i++){
			(function(index){
				aHead[i].onmouseover=function(){
					now=index;
					tab();
				}
			})(i)
		}
		
		//tab
		function tab(){
			for(var i=0;i<aHead.length;i++){
				aHead[i].className="";
			}
			if(now==5){
				aHead[0].className="on";
			}else{
				aHead[now].className="on";
			}
			move(oUl,{left:-now*oLiW},{duration:500,complete:function(){
				ready=true;
				if(now==5){
					oUl.style.left=0;
					now=0;
				}
			}})
		}
		//上一张
		oPrev.onclick=function(){
			if(!ready) return;
			ready=false;
			now--;
			if(now==-1){
				now=4;
				oUl.style.left=-oUl.offsetWidth/2+'px';
				tab();
			}
		}
		//下一张
		oNext.onclick=function(){
			if(!ready) return;
			ready=false;
			now++;
			tab();
		}
	})();
	
	//照片墙
	(function(){
		var oWall=document.getElementById("picwall");
		var oBtn=oWall.children[0];
		var oUl=oWall.children[1];
		var aLi=oUl.children;
		var zIndex=10;
		var aPos=[];
		//存原来的位置
		for(var i=0;i<aLi.length;i++){
			aPos.push({
				left:aLi[i].offsetLeft,
				top:aLi[i].offsetTop
			})
		}
		//定位
		for(var i=0;i<aLi.length;i++){
			aLi[i].style.left=aPos[i].left+'px';
			aLi[i].style.top=aPos[i].top+'px';
			aLi[i].style.position="absolute";
			aLi[i].style.margin=0
		}
		//所有拖拽
		for(var i=0;i<aLi.length;i++){
			drag(aLi[i]);
			aLi[i].index=i;
		}
		oBtn.addEventListener("click",fnClick,false);
		oBtn.addEventListener("click",fnClick1,false);
		
		//按钮点击事件
		function fnClick(ev){
			var oEvt=ev||event;
			var oDiv=oBtn.children[0];
			var oSon=oDiv.children[0];
			var x=oEvt.pageX-oBtn.offsetLeft;
			var y=oEvt.pageY-oBtn.offsetTop;
			oSon.style.left=x+'px';
			oSon.style.top=y+'px';
			addClass(oDiv,"is-active");
			oDiv.addEventListener("animationend",function(){
				removeClass(oDiv,"is-active")
			},false);
			oDiv.addEventListener("webkitAnimationEnd", function(ev) {
				removeClass(oDiv, "is-active")
			}, false);
			oDiv.addEventListener("MSAnimationEnd", function(ev) {
				removeClass(oDiv, "is-active")
			}, false)
		}
		
		//点击移动
		function fnClick1(){
			aPos.sort(function(){
				return Math.random()-0.5;
			})
			for(var i=0;i<aLi.length;i++){
				move(aLi[i],aPos[i]);
				aLi[i].index=i
			}
		}
		//拖拽
		function drag(obj){
			obj.onmousedown=function(ev){
				var oEvt=ev||event;
				zIndex++;
				obj.style.zIndex=zIndex;
				var disX=oEvt.pageX-obj.offsetLeft;
				var disY=oEvt.pageY-obj.offsetTop;
				document.onmousemove=function(ev){
					var oEvt=ev||event;
					obj.style.left=oEvt.pageX-disX+'px';
					obj.style.top=oEvt.pageY-disY+'px';
					for(var i=0;i<aLi.length;i++){
						aLi[i].className="";
					}
					var oNear=findNearest(obj);
					if(oNear){
						oNear.className="on";
					}
				}
				document.onmouseup=function(){
					document.onmousemove=document.onmouseup=null;
					obj.releaseCapture && obj.releaseCapture();
					var oNear=findNearest(obj);
					if(oNear){
						oNear.className="";
						move(obj,aPos[oNear.index]);
						move(oNear,aPos[obj.index]);
						var cur=obj.index;
						obj.index=oNear.index;
						oNear.index=cur;
					}else{
						obj.style.left=aPos[obj.index].left+'px';
						obj.style.top=aPos[obj.index].top+'px';
					}
				}
				obj.setCapture && obj.setCapture();
				return false;
			}
		}
		//获取最小距离
		function findNearest(obj){
			var iMin=new Date().getTime();
			var iMinIndex=-1;
			for(var i=0;i<aLi.length;i++){
				if(obj==aLi[i]){
					continue
				}
				if(callTest(obj,aLi[i])){
					if(iMin>getDis(obj,aLi[i])){
						iMin=getDis(obj,aLi[i]);
						iMinIndex=i;
					}
				}
			}
			if(iMinIndex==-1){
				return null;
			}else{
				return aLi[iMinIndex]
			}
		}
		//碰撞检测
		function callTest(obj,obj2){
			var l1 = obj.offsetLeft;
			var t1 = obj.offsetTop;
			var r1 = obj.offsetLeft + obj.offsetWidth;
			var b1 = obj.offsetTop + obj.offsetHeight;
			var l2 = obj2.offsetLeft;
			var t2 = obj2.offsetTop;
			var r2 = obj2.offsetLeft + obj2.offsetWidth;
			var b2 = obj2.offsetTop + obj2.offsetHeight;
			if(l1>r2||t1>b2||r1<l2||b1<t2){
				return false;
			}else{
				return true;
			}
		}
		//物体间的距离
		function getDis(obj,obj2){
			var l1=obj.offsetLeft+obj.offsetWidth/2;
			var t1=obj.offsetTop+obj.offsetHeight/2;
			var l2=obj2.offsetLeft+obj2.offsetWidth/2;
			var t2=obj2.offsetTop+obj2.offsetHeight/2;
			var a=l2-l1;
			var b=t2-t1;
			return Math.sqrt(a*a+b*b);
		}
	})();
	
	//分块运动
	(function(){
		var oSplit=document.querySelector(".splitblock");
		var oBtn=oSplit.children[0];
		var oBox=oSplit.querySelector(".box");
		var R=4;
		var C=7;
		
		var now=0;
		
		var ready=true;
		for(var r=0;r<R;r++){
			for(var c=0;c<C;c++){
				var oS=document.createElement("span");
				oBox.appendChild(oS);
				oS.style.width=oBox.offsetWidth/C+'px';
				oS.style.height=oBox.offsetHeight/R+'px';
				oS.style.left=c*oBox.offsetWidth/C+'px';
				oS.style.top=r*oBox.offsetHeight/R+'px';
				oS.style.position="absolute";
				oS.style.backgroundPosition=-c*oBox.offsetWidth/C+'px '+ -r*oBox.offsetHeight/R+'px';
				oS.r=r;
				oS.c=c;
			}
		}
		
		oBtn.onclick=function(ev){
			if(!ready) return;
			ready=false;
			var aS=oBox.children;
			now++;
			for (var i = 0; i < aS.length; i++) {
				(function(index) {
					setTimeout(function() {
						aS[index].style.backgroundImage = "url(images/splitblock/" + now % 3 + ".jpg)";
						aS[index].style.opacity = 0;
						(function(j) {
							move(aS[j], {
								opacity: 1
							}, {
								complete: function() {
									if (j == aS.length - 1) {
										oBox.style.background = "url(images/splitblock/" + now % 3 + ".jpg) no-repeat";
										ready = true
									}
								}
							})
						})(index)
					}, Math.random() * 300)
				})(i)
			}
			var oDiv = this.children[0];
			var oSon = oDiv.children[0];
			var x = ev.pageX - this.offsetLeft;
			var y = ev.pageY - this.offsetTop;
			oSon.style.left = x + "px";
			oSon.style.top = y + "px";
			addClass(oDiv, "is-active");
			oDiv.addEventListener("animationend", function(ev) {
				removeClass(oDiv, "is-active")
			}, false);
			oDiv.addEventListener("webkitAnimationEnd", function(ev) {
				removeClass(oDiv, "is-active")
			}, false);
			oDiv.addEventListener("MSAnimationEnd", function(ev) {
				removeClass(oDiv, "is-active")
			}, false)
		}
		
	})();
	
	
	//iphone
	(function(){
		var oWrap=document.getElementById("wrap");
		var oUl=oWrap.children[0];
		var aLi=oUl.children;
		var now=0;
		oUl.onmousedown=function(ev){
			var oEvt=ev||event;
			var oldX=oEvt.pageX;
			var disX=oEvt.pageX-oUl.offsetLeft;
			document.onmousemove=function(ev){
				var oEvt=ev||event;
				oUl.style.left=oEvt.pageX-disX+'px';
			}
			document.onmouseup=function(ev){
				var oEvt=ev||event;
				var dis=oEvt.pageX-oldX;
				if(Math.abs(dis)>aLi[0].offsetWidth/2){
					if(dis<0){
						now++;
						if(now>aLi.length-1){
							now=aLi.length-1;
						}
					}else{
						now--;
						if(now<0){
							now=0
						}
					}
					
					move(oUl,{
						left:-now*aLi[0].offsetWidth
					})
				}else{
					move(oUl,{
						left:-now*aLi[0].offsetWidth
					})
				}
				document.onmousemove=document.onmouseup=null;
				oUl.releaseCapture && oUl.releaseCapture();
			}
			oUl.setCapture && oU.setCapture();
			return false;
		}
	})();
	
	
	//showbar
	(function(){
		var oBox=document.getElementById("showbar");
		var oUl=oBox.children[0];
		var aLi=oUl.children;
		var aImg=oUl.getElementsByTagName("img");
		oUl.style.width=aLi.length*aLi[0].offsetWidth+'px';
		oUl.onmousedown=function(ev){
			var oEvt=ev||event;
			var disX=oEvt.pageX-oUl.offsetLeft;
			document.onmousemove=function(ev){
				var oEvt=ev||event;
				var l=oEvt.pageX-disX;
				if(l>oBox.offsetWidth/2-(0+0.5)*aLi[0].offsetWidth){
					l=oBox.offsetWidth/2-(0+0.5)*aLi[0].offsetWidth
				}
				if(l<oBox.offsetWidth/2-(aLi.length-1+0.5)*aLi[0].offsetWidth){
					l=oBox.offsetWidth/2-(aLi.length-1+0.5)*aLi[0].offsetWidth
				}
				oUl.style.left=l+'px';
				setSize();
			}
			document.onmouseup=function(){
				document.onmousemove=document.onmouseup=null;
				oUl.releaseCapture && oUl.releaseCapture();
			}
			oUl.setCapture && oUl.setCapture();
			return false;
		}
		//设定图片大小
		function setSize(){
			for(var i=0;i<aImg.length;i++){
				var dis=Math.abs(oBox.offsetWidth/2-(oUl.offsetLeft+aLi[i].offsetLeft+aLi[i].offsetWidth/2));
				var scale=1-dis/800;
				if(scale<0.5) scale=0.5;
				aImg[i].style.width=520*scale+'px';
				aImg[i].style.height=358*scale+'px';
				aImg[i].style.marginLeft=-(aImg[i].offsetWidth-aLi[i].offsetWidth)/2+'px';
				aImg[i].style.marginTop=-(aImg[i].offsetHeight-aLi[i].offsetHeight)/2+'px';
				aLi[i].style.zIndex=parseInt(scale*10000);
				aLi[i].style.opacity=scale;	
			}
		}
		//设定中心图片
		setCenter(0);
		function setCenter(n){
			oUl.style.left=oBox.offsetWidth/2-(n+0.5)*aLi[0].offsetWidth+'px';
		}
		setSize();
		
	})();
	
	
	//视觉差
	(function(){
		var oUC=document.getElementById("ul_container");
		var aLi=oUC.children;
		var x=0;
		var y=0;
		oUC.onmousedown=function(ev){
			var oEvt=ev||event;
			var disX=oEvt.pageX-x;
			var disY=oEvt.pageY-y;
			document.onmousemove=function(ev){
				var oEvt=ev||event;
				x=oEvt.pageX-disX;
				y=oEvt.pageY-disY;
				for(var i=0;i<aLi.length;i++){
					aLi[i].style.marginLeft=x*aLi[i].style.zIndex/20+'px';
					aLi[i].style.marginTop=y*aLi[i].style.zIndex/20+'px';
				}
			}
			document.onmouseup=function(){
				document.onmousemove=document.onmouseup=null;
				oUC.releaseCapture && oUC.releaseCapture();
			}
			oUC.setCapture && oUC.setCapture();
			return false;
		}
	})();
	
	//登陆、注册
	(function(){
		var oLoginBtn=document.getElementById("loginBtn");
		var oDiv=document.getElementById("login");
		var oLogTile=document.querySelector(".logTitle");
		var oClose=oLogTile.children[0];
		var oUser=document.getElementById("user");
		var oPass=document.getElementById("pass");
		var oSignUp=document.getElementById("signUp");
		var oSignIn=document.getElementById("signIn");
		var oError=document.getElementById("error");
		
		
		var cHeight=window.document.body.offsetHeight-(document.documentElement.clientHeight)/2;
		var cWidth=(document.documentElement.clientWidth)/2;
		
		
		oLoginBtn.onclick = function(){
			oDiv.style.transform = "perspective(1000px) rotateX(360deg) scale(1)";	
			oDiv.style.opacity = "1";
			oDiv.style.top=cHeight+'px';
			oDiv.style.left=cWidth+'px';
			document.body.style.background="#ccc";
			document.body.style.opacity=0.8;
			oDiv.style.zIndex=999;
			oError.innerHTML="";
			oError.className="";
			oUser.value="";
			oPass.value="";
			
		};
		
		oClose.onclick=function(){
			oDiv.style.transform = "perspective(1000px) rotateX(0) scale(5)";	
			oDiv.style.opacity = "0";
			document.body.style.background="#22C3AA";
			document.body.style.opacity=1;
			oDiv.style.zIndex=-999;
		}
		
		//ajax
		function sendAjax(url,data,fn){
			ajax({
				url:url,
				data:data,
				success:function(str){
					fn && fn(str);	
				}	
			});
		}
		
		var url="user.php";
		
		//注册
		oSignIn.onclick=function(){
			sendAjax(url,{
				acc : "reg",
				user:oUser.value,
				pass:oPass.value
			},function(str){
				var data = eval("("+str+")");
				oError.innerHTML=data.msg;
				if(data.error==0){
					oError.className="error-info";
				}else{
					oError.className="success-info";
				}
			});	
		};
		//登陆
		oSignUp.onclick=function(){
			sendAjax(url,{
				acc : "lgn",
				user:oUser.value,
				pass:oPass.value
			},function(str){
				var data = eval("("+str+")");
				oError.innerHTML=data.msg;
				if(data.error==0){
					oError.className="error-info";
				}else{
					oError.className="success-info";
				}
			});
		};
	})();
	
	
	//toTop回到顶部
	(function(){
		var oScrollTop=document.getElementById("scrollTop");
		var oL2=oScrollTop.children[0];
		var oL3=oScrollTop.children[1];
		var oL4=oScrollTop.children[2];
		var bOk=false;
		var timer=null;
		//判断出现小飞机
		function fnScrollTop(ev){
			if(bOk) return;
			var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
			if(scrollTo>100){
				oScrollTop.style.opacity=1;
			}else{
				oScrollTop.style.opacity=1;
			}
		}
		window.addEventListener("load",fnScrollTop,false);
		window.addEventListener("resize",fnScrollTop,false);
		window.addEventListener("scroll",fnScrollTop,false);
		
		oScrollTop.onclick=function(){
			addClass(this,"on");
			bOk=true;
			oScrollTop.style.webkitTransition="0.5s all ease-in";
			oScrollTop.style.MozTransition="0.5s all ease-in";
			oScrollTop.style.msTransition="0.5s all ease-in";
			oScrollTop.style.transition="0.5s all ease-in";
			
			setTimeout(function(){
				oScrollTop.style.webkitTransform = "translateY(-3000px)";
				oScrollTop.style.MozTransform = "translateY(-3000px)";
				oScrollTop.style.msTransform = "translateY(-3000px)";
				oScrollTop.style.transform = "translateY(-3000px)"
			},300);
			
			var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
			var clientHeight=scrollTop=document.documentElement.clientHeight||document.body.clientHeight;
			var  start=scrollTop;
			var iTarget = 0;
			var dis = iTarget - start;
			var time=1000;
			var count=Math.floor(1000/30);
			var n=0;
			
			timer = setInterval(function() {
				n++;
				var a = 1 - n / count;
				var cur = start + dis * (1 - Math.pow(a, 3));
				document.documentElement.scrollTop = document.body.scrollTop = cur;
				if (n == count) {
					clearInterval(timer);
					removeClass(oScrollTop, "on");
					oScrollTop.style.WebkitTransition = "";
					oScrollTop.style.MozTransition = "";
					oScrollTop.style.msTransition = "";
					oScrollTop.style.transition = "";
					oScrollTop.style.WebkitTransform = "translateY(0)";
					oScrollTop.style.MozTransform = "translateY(0)";
					oScrollTop.style.msTransform = "translateY(0)";
					oScrollTop.style.transform = "translateY(0)";
					oScrollTop.style.opacity = 0;
					bOk = false
				}
			}, 30)
		}
		
		
		
		
		
		
	})()
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
},false);
