"use strict";
document.addEventListener("DOMContentLoaded",function(){
	(function(){
		var oCon=document.querySelector(".my-info");
		var aDd=oCon.getElementsByTagName("dd");
		var aI=oCon.getElementsByTagName("i");
		for(var i=0;i<aDd.length;i++){
			(function(index){
				aDd[i].onmouseover=function(){
					aI[index].style.opacity=1;
				}
				aDd[i].onmouseout=function(){
					aI[index].style.opacity=0;
				}
			})(i)
		}	
	})();
	
	
	(function(){
		var aEle=document.querySelectorAll(".objs");
		window.addEventListener("load",fnAnimate,false);
		window.addEventListener("resize",fnAnimate,false);
		window.addEventListener("scroll",fnAnimate,false);
		
		function fnAnimate(){
			var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
			var clientHeight=document.documentElement.clientHeight||document.body.clientHeight;
			var scrollBottom=scrollTop+clientHeight;
			for(var i=0;i<aEle.length;i++){
				var iTop=getOffset(aEle[i]).y;
				if(iTop<scrollBottom){
					addClass(aEle[i], "animated")
				}
			}
		}
		
	})();
	
	
	
	(function(){
		var oLoca=document.getElementById("loca");
		window.navigator.geolocation.getCurrentPosition(function(res){
			var longitude = 121.44655320000001;
			var latitude = 31.141113799999996;
			
			var map = new BMap.Map("loca");          
			var point = new BMap.Point(longitude, latitude);  
			map.centerAndZoom(point, 15);
			console.log(longitude+"|"+latitude)
		},function(){
			oLoca.innerHTML="获取地理信息失败"
		});
	})();

},false)
