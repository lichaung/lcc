// JavaScript Document
window.onload=function(){
	var ruleEl = document.getElementById("rule");
	if(ruleEl.attachEvent){
		ruleEl.addEventListener("click",function(){
			var mask = document.getElementById("rulemask");
			mask.style.display = "block";
		},false);
	}else{
		ruleEl.addEventListener("click",function(){
			var mask = document.getElementById("rulemask");
			mask.style.display = "block";	
		},false);
	}
	/*var ruleEl = document.getElementById("rule");
	console.log(ruleEl);*/
}