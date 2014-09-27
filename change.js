window.onload = function(){

    var oPrev=document.getElementById("btn_prev");
    var oNext=document.getElementById("btn_next");
    var alis = document.getElementsByTagName("li");
    var arr = [];
    for(var i = 0;i<alis.length;i++){
        var oImg=alis[i].getElementsByTagName("img")[0];
        arr.push([parseInt(getStyle(alis[i],"left")),parseInt(getStyle(alis[i],"top")),
            Math.round(parseFloat(getStyle(alis[i],"opacity"))*100),getStyle(alis[i],"zIndex"),oImg.offsetWidth]);

    }
    console.dir(arr);

    oPrev.onclick = function(){
        // alert(123);
        arr.push(arr[0]);
        arr.shift();
        change();

    }

    oNext.onclick = function(){
        arr.unshift(arr[arr.length-1]);
        arr.pop();
        change();
    }

    function change(){
        for(var i = 0 ;i<alis.length;i++){
            var oImg=alis[i].getElementsByTagName("img")[0];
            startMove(alis[i],{left:arr[i][0],top:arr[i][1],opacity:arr[i][2]});
            alis[i].style.zIndex = arr[i][3];
            startMove(oImg,{width:arr[i][4]});
        }
    }
}



function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }
}


function startMove(obj,json,callback){


    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var bstop = true;

        for(var key in json){
            var current = 0;
            if(key == 'opacity'){
                current = Math.round(parseFloat(getStyle(obj,key)*100));
            }else{
                current = parseInt(getStyle(obj,key));
            }
            var speed = (json[key]-current)/5;
            speed = speed>0 ?Math.ceil(speed):Math.floor(speed);

            if(current != json[key]){
                bstop  = false;
            }
            if(key == 'opacity'){
                obj.style.opacity = (current + speed)/100;
                obj.style.filter  ="alpha(opacity : '+(current + speed)+')" ;
            }else{
                obj.style[key] = current + speed +'px';
            }
            if(bstop){
                clearInterval(timer);
                if(callback){
//                    callback();
                }
            }

        }
    },30)
}