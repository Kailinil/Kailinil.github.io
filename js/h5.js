"ues strict";
document.addEventListener("DOMContentLoaded",function(){
	//clock
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
	
	//动态阴影
	(function(){
		var oS1=document.querySelector("#s1");
		var oMoveBox=oS1.querySelector("#move-box");
		var oH=oS1.children[1];
		
		document.onmousemove=function(ev){
			var l=ev.pageX-oMoveBox.offsetWidth/2;
			var t=ev.pageY-oMoveBox.offsetHeight/2;
//			console.log(ev.pageX+"|"+ev.pageY);
			
//			oMoveBox.style.left=l+'px';
//			oMoveBox.style.top=t+'px';
			
			var x1=ev.pageX;
			var y1=ev.pageY;
			
			var x2=oS1.offsetLeft+oS1.offsetWidth/2;
			var y2=oS1.offsetTop+oS1.offsetHeight/2;
			var x=(x2-x1)/4;
			var y=(y2-y1)/4;
			
			var blur=Math.sqrt(x*x+y*y);
			oH.style.textShadow='#000 '+x+'px '+y+'px '+blur/20+'px';
		}
	})();
	
	
	//five box
	
//	(function(){
//		var oBox=document.querySelector("#boom-box");
//		var oBox2=document.querySelector("#boom-box2");
//		var oBtn1=oBox2.children[0];
//		var oBtn2=oBox2.children[1];
//		var oBtn3=oBox2.children[2];
//		var oBtn4=oBox2.children[3];
//		var oBtn5=oBox2.children[4];
//		var aS=oBox.getElementsByTagName("span");
//		var R=4;
//		var C=7;
//		var bOk=true;
//		var arr=["b1.jpg","b2.jpg","b3.jpg"];
//		var iNow=0;
//		
//		//创建单个小盒子
//		function creatBoom(iNow){
//			for(var i=0;i<R;i++){
//				for(var j=0;j<C;j++){
//					var oS=document.createElement("span");
//					oS.style.width=oBox.offsetWidth/C+'px';
//					oS.style.height=oBox.offsetHeight/R+'px';
//					oBox.appendChild(oS);
//					//单个盒子的位置
//					oS.style.left=j*oBox.offsetWidth/C+'px';
//					oS.style.top=i*oBox.offsetHeight/R+'px';
//					
//					oS.style.background="url(images/"+arr[iNow]+") -"+oS.offsetLeft+"px -"+oS.offsetTop+"px";
//					//初始化
//					oS.style.webkitTransform="perspective(800px) rotateX(0) rotateY(0) translateX(0) translateY(0)";
//					oS.style.MozTransform="perspective(800px) rotateX(0) rotateY(0) translateX(0) translateY(0)";
//					oS.style.msTransform="perspective(800px) rotateX(0) rotateY(0) translateX(0) translateY(0)";
//					oS.style.transform="perspective(800px) rotateX(0) rotateY(0) translateX(0) translateY(0)";
//					oS.R=j;
//					oS.C=i;
//					oS.innerHTML=j+"|"+i;
//				}
//			}
//		}
//		//第一个按钮点击
//		
//		oBtn1.onclick=function(){
//			if(bOk){
//				bOk=false;
//				creatBoom(iNow%arr.length);
//				oBox.style.background="url(images/"+arr[(iNow+1)%arr.length]+")";
//				var divX=oBox.offsetWidth/2;
//				var disY=oBox.offsetHeight/2;
//				
//				for(var i=0;i<aS.length;i++){
//					var sX=aS[i].offsetLeft+aS.offsetWidth/2+'px';
//					var sY=aS[i].offsetTop+aS.offsetHeight/2+'px';
//					var disX=(sX-divX)*2*Math.random();
//					var disY=(sY-disY)*2*Math.random();
//					
//					aS[i].style.webkitTransition="1s all ease";
//					aS[i].style.MozTransition="1s all ease";
//					aS[i].style.msTransition="1s all ease";
//					aS[i].style.transition="1s all ease";
//					//转换一定角度，偏移图片相对于中心点距离两倍的偏移量
////					aS[i].style.webkitTransform = "perspective(800px) translateX(" + disX + "px) translateY(" + disY + "px) rotateX(" + (Math.random() * 360 + 180) + "deg) rotateY(" + (Math.random() * 360 + 180) + "deg) scale(" + (Math.random() * 2) + "," + (Math.random() * 2) + ")";
//					
////					aS[i].style.MozTransition="perspective(800px) rotateX("+(Math.random()*360+180)+"deg) rotateY("+(Math.random()*360+180)+"deg) translateX("+disX+"px) translateY("+disY+"px) scale("+Math.random()*2+","+Math.random()*2+")";
////					
////					aS[i].style.msTransition="perspective(800px) rotateX("+(Math.random()*360+180)+"deg) rotateY("+(Math.random()*360+180)+"deg) translateX("+disX+"px) translateY("+disY+"px) scale("+Math.random()*2+","+Math.random()*2+")";
////					
//					aS[i].style.transform="translate("+disX+"px,"+disY+"px) rotateX("+rnd(-180,180)+"deg) rotateY("+rnd(-180,180)+"deg)";
//					aS[i].style.opacity=0;
//				}
//				
//				setTimeout(function(){
////					oBox.innerHTML="";
//					bOk=true;
//					iNow++;
//				},500)
//			}
//		};
//		
//	})();
	
	
	
	
	
	
	
	
	
	
	
	//3Dbox
	(function(){
		var oBox3d=document.querySelector("#box3d");
		var oBox=oBox3d.children[0];
		var timer=null;
		var x=0;
		var y=0;
		var bLeft=false;
		var bTop=false;
		var bRight=false;
		var bBottom=false;
		
		
		//键盘控制开始
		timer=setInterval(function(){
			if(bRight){
				y+=7;
			}
			if(bLeft){
				y-=7;
			}
			if(bTop){
				x-=7;
			}
			if(bBottom){
				x+=7;
			}
			oBox.style.webkitTransform="perspective(800px) rotateX("+-x+"deg) rotateY("+y+"deg)";
			oBox.style.MozTransform="perspective(800px) rotateX("+-x+"deg) rotateY("+y+"deg)";
			oBox.style.msTransform="perspective(800px) rotateX("+-x+"deg) rotateY("+y+"deg)";
			oBox.style.transform="perspective(800px) rotateX("+-x+"deg) rotateY("+y+"deg)";
		},30);
		
		//键盘事件
		//按下键盘
		document.onkeydown=function(ev){
			if(ev.keyCode==37){
				bLeft=true;
			}
			if(ev.keyCode==38){
				bTop=true;
			}
			if(ev.keyCode==39){
				bRight=true;
			}
			if(ev.keyCode==40){
				bBotton=true;
			}
		}
		//离开键盘
		document.onkeyup=function(ev){
			if(ev.keyCode==37){
				bLeft=false;
			}
			if(ev.keyCode==38){
				bTop=false;
			}
			if(ev.keyCode==39){
				bRight=false;
			}
			if(ev.keyCode==40){
				bBotton=false;
			}
		}
		//键盘控制结束
		
		//鼠标控制开始
		
		//左右y,上下x
		var x=0;
		var y=0;
		document.onmousedown=function(ev){
			var disX=ev.pageX-y;
			var disY=ev.pageY-x;
			
			document.onmousemove=function(ev){
				y=ev.pageX-disX;
				x=ev.pageY-disY;
				
				oBox.style.transform="perspective(800px) rotateX("+-x+"deg) rotateY("+y+"deg)"
				oBox.style.MozTransform="perspective(800px) rotateX("+-x+"deg) rotateY("+y+"deg)";
				oBox.style.msTransform="perspective(800px) rotateX("+-x+"deg) rotateY("+y+"deg)";
				
			}
			document.onmouseup=function(){
				document.onmousemove=document.onmouseup=null;
			}
			return false;
		}	
	})();
	
	
	
	//3D切换图片
	(function(){
		var oSwitch=document.querySelector("#switch");
		var oPrev=oSwitch.children[0];
		var oNext=oSwitch.children[1];
		var oUl = oSwitch.getElementsByTagName("ul")[0];
		var aLi=oUl.children;
		var iNow=2;
		var bReady=true;
		
		var aClass=[];
		for(var i=0;i<aLi.length;i++){
			aClass.push(aLi[i].className);
		}
		oNext.onclick=function(ev){
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
            }, false);
            
            if(!bReady) return;
            bReady=false;
            aClass.unshift(aClass.pop());
            tab();
		};
		
		oPrev.onclick=function(ev){
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
            }, false);
            
            if(!bReady) return;
            aClass.push(aClass.shift());
            tab();
		}
		
		//tab
		function tab(){
			for(var i=0;i<aLi.length;i++){
				aLi[i].className=aClass[i];
			}
			var oCur=document.querySelector(".cur");
			oCur.addEventListener("transitionend",function(){
				bReady=true;
			},false)
		}
	})();
	
	
	//canvas 柱状图
	(function() {
        var oC = document.getElementById("c1");
        var gc = oC.getContext("2d");
        var arr = [67, 321, 287, 34, 150, 210, 400, 340, rnd(0, 401), rnd(0, 401), rnd(0, 401), rnd(0, 401)];
        var space = oC.width / (arr.length * 4 - 1);
        var w = space * 3;
        var max = Math.max.apply(null, arr);
        for (var i = 0; i < arr.length; i++) {
            var h = arr[i] / max * oC.height;
            gc.beginPath();
            gc.fillStyle = "rgb(" + rnd(0, 256) + "," + rnd(0, 256) + "," + rnd(0, 256) + ")";
            gc.fillRect(i * (w + space), oC.height-h, w, h)
        }
    })();
	
	
	//canvas画板
	(function(){
		var oC=document.getElementById("c3");
		var gd=oC.getContext("2d");
	 	gd.strokeStyle = "#22C3AA";
	 	gd.lineWidth=5;
	 	gd.beginPath();
		
		oC.onmousedown=function(ev){
			gd.moveTo(ev.pageX-oC.offsetLeft,ev.pageY-oC.offsetTop);
			document.addEventListener("mousemove",fnMove,false);
			document.addEventListener("mouseup",fnUp,false);
			
			function fnMove(ev){
				gd.clearRect(0,0,oC.width,oC.height);
				gd.lineTo(ev.pageX-oC.offsetLeft,ev.pageY-oC.offsetTop);
				gd.stroke();
			}
			function fnUp(){
				document.removeEventListener("mousemove",fnMove,false);
				document.removeEventListener("mouseup",fnUp,false);
			}
		}
	})();
	
	
	//toTop小飞机
	(function() {
        var oScroll = document.getElementById("scrollTop");
        var oL2 = oScroll.children[0];
        var oL3 = oScroll.children[1];
        var oL4 = oScroll.children[2];
        var bOk = false;
        var timer = null;

        function fnScrollTop(ev) {
            if (bOk) {
                return
            }
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop >= 100) {
                oScroll.style.opacity = 1
            } else {
                oScroll.style.opacity = 0
            }
        }
        window.addEventListener("scroll", fnScrollTop, false);
        window.addEventListener("load", fnScrollTop, false);
        window.addEventListener("resize", fnScrollTop, false);
        oScroll.onclick = function() {
            addClass(this, "on");
            bOk = true;
            oScroll.style.WebkitTransition = "0.5s all ease-in";
            oScroll.style.MozTransition = "0.5s all ease-in";
            oScroll.style.msTransition = "0.5s all ease-in";
            oScroll.style.transition = "0.5s all ease-in";
            setTimeout(function() {
                oScroll.style.WebkitTransform = "translateY(-3000px)";
                oScroll.style.MozTransform = "translateY(-3000px)";
                oScroll.style.msTransform = "translateY(-3000px)";
                oScroll.style.transform = "translateY(-3000px)"
            }, 300);
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            var start = scrollTop;
            var iTarget = 0;
            var dis = iTarget - start;
            var time = 1000;
            var count = Math.floor(1000 / 30);
            var n = 0;
            timer = setInterval(function() {
                n++;
                var a = 1 - n / count;
                var cur = start + dis * (1 - Math.pow(a, 3));
                document.documentElement.scrollTop = document.body.scrollTop = cur;
                if (n == count) {
                    clearInterval(timer);
                    removeClass(oScroll, "on");
                    oScroll.style.WebkitTransition = "";
                    oScroll.style.MozTransition = "";
                    oScroll.style.msTransition = "";
                    oScroll.style.transition = "";
                    oScroll.style.WebkitTransform = "translateY(0)";
                    oScroll.style.MozTransform = "translateY(0)";
                    oScroll.style.msTransform = "translateY(0)";
                    oScroll.style.transform = "translateY(0)";
                    oScroll.style.opacity = 0;
                    bOk = false
                }
            }, 30)
        };
        var oTT = document.querySelector(".toptop");
        oTT.onclick = function() {
            document.documentElement.scrollTop = document.body.scrollTop = 0
        }
    })();
	
	
	
	
	
	
	
	
},false)
