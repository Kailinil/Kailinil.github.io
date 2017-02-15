document.addEventListener("DOMContentLoaded",function(){
	var oHd=document.querySelector("header");
	var oAboutMe=document.querySelector(".abou-tme");
	var oShodow=document.querySelector(".shadow");
	var aHead=document.querySelectorAll(".me-box ol li");
	var aContent=document.querySelectorAll(".me-box ul li");
	var oSimShow=document.querySelector(".sim-show");
	var oAboutMe=document.querySelector(".about-me");
	var oConcatMe=document.querySelector(".contact-me");

	for(var i=0;i<aHead.length;i++){
		(function(index){
			aHead[i].onmouseover=function(){
				for(var i=0;i<aHead.length;i++){
					aHead[i].className="";
					aContent[i].style.opacity=0;
				}
				this.className="on";
				aContent[index].style.opacity=1;
			}
		})(i)
	}
	
	oHd.style.width=document.documentElement.clientWidth+"px";
	oHd.style.height=document.documentElement.clientHeight+"px";
	oHd.style.backgroundSize=document.documentElement.clientWidth+"px auto";
	
	oConcatMe.style.width=document.documentElement.clientWidth+"px";
	oConcatMe.style.height=document.documentElement.clientHeight+"px";
	oConcatMe.style.backgroundSize=document.documentElement.clientWidth+"px auto";
	
	//打字效果
	wordShow();
	//缩放窗口
	
	window.onresize=window.onscroll=function(){
		var oHd = document.querySelector("header");
		
		oHd.style.width=document.documentElement.clientWidth+"px";
		oHd.style.height=document.documentElement.clientHeight+"px";
		oHd.style.backgroundSize=document.documentElement.clientWidth+"px auto";
		
		oConcatMe.style.width=document.documentElement.clientWidth+"px";
		oConcatMe.style.height=document.documentElement.clientHeight+"px";
		oConcatMe.style.backgroundSize=document.documentElement.clientWidth+"px auto";
		
		var oScrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		var scal=oAboutMe.offsetTop - oScrollTop;
		oAboutMe.style.backgroundPosition="center"+(scal/3-200)+"px";
		oShodow.style.opacity=0.8*(1-scal/200);
	}


	//section


	//header
	function wordShow(){
		var str="李瑶WEB前端工程师";
		var oWordH=document.querySelector("#h_word");
		for(var i=0;i<str.length;i++){
			var oSpan=document.createElement("span");
			oSpan.innerHTML=str[i];
			oWordH.appendChild(oSpan);
		}
		var i=0;
		var aSpan=oWordH.children;
		var timer=setInterval(function(){
			aSpan[i].className="word_active";
			var oA = new Audio();
			oA.src = "audio/"+(i+1)+".ogg";
			oA.play(); 
			i++;
			if(i==str.length){
				clearInterval(timer);
			}
		},100)
		
		//钢琴音
		for(let i = 0; i < aSpan.length; i++){
			 aSpan[i].onmouseover = function(){
				var oA = new Audio();
				oA.src = "audio/"+(i+1)+".ogg";
				oA.play();	 
			 };
	 	}
	}
	
},false);
