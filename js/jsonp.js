//版权 北京智能社©, 保留所有权利


function jsonp(options){
	//0.	整理参数
	options=options||{};
	options.data=options.data||{};
	options.cbKey=options.cbKey||'cb';
	options.timeout=options.timeout||0;
	
	//1	准备一个本地函数（全局) ,名字随机
	var cbValue=('jsonp'+Math.random()).replace('.','');
	options.data[options.cbKey]=cbValue;
	window[options.data[options.cbKey]]=function(json){
		options.success && options.success(json);
		//清理工作
		document.getElementsByTagName('head')[0].removeChild(oScript);	
		window[options.data[options.cbKey]]=null;
		clearTimeout(timer);
	};
	
	//2	整理data数据
	var arr=[];
	for(var key in options.data){
		arr.push(key+'='+encodeURIComponent(options.data[key]));	
	}
	options.url = options.url+'?'+arr.join('&');
	
	//3	创建script.指定src，插入到页面(head)
	var oScript=document.createElement('script');
	oScript.src=options.url;
	document.getElementsByTagName('head')[0].appendChild(oScript);
	
	//4	超时设定
	if(options.timeout){
		var timer=setTimeout(function(){
			options.error && options.error();
			window[options.data[options.cbKey]]=function(){
				//清理工作
				document.getElementsByTagName('head')[0].removeChild(oScript);	
				window[options.data[options.cbKey]]=null;
				clearTimeout(timer);	
			};
				
		},options.timeout);	
	}
}