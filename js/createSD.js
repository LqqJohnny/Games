/**
* author:ls
* email:liusaint@gmail.com
* date:2016年4月9日
*/

function SD(){
	this.sdArr = [];//生成的数独数组	
	this.errorArr = [];//错误的格子。
	this.blankNum = 30;//空白格子数量 
	this.blankArr=[];
	this.backupSdArr = [];//数独数组备份。
}

SD.prototype={
	constructor:SD,
	init:function(blankNum){

		var beginTime = new Date().getTime();
		this.createSdArr();
		console.log("数独生成完毕，耗时："+((new Date().getTime())-beginTime)/1000+"秒！");
		this.blankNum = this.setLevel()||blankNum || this.blankNum;		
		this.createBlank(this.blankNum);
	},
	createSdArr:function(){  
	    //生成数独数组。  
	    var that = this;  

	        this.sdArr = [];  
	        this.setThird(2,2);  
	        this.setThird(5,5);  
	        this.setThird(8,8);  
	        var allNum = [1,2,3,4,5,6,7,8,9];  
	        outerfor:  
	        for(var i=1;i<=9;i++){  
	            innerfor:  
	            for(var j=1;j<=9;j++){  
	                if(this.sdArr[parseInt(i+''+j)]){  
	                    continue innerfor;  
	                }  
	                var XArr = this.getXArr(j,this.sdArr);  
	                var YArr = this.getYArr(i,this.sdArr);  
	                var thArr = this.getThArr(i,j,this.sdArr);  
	                var arr = getConnect(getConnect(XArr,YArr),thArr);  
	                var ableArr = arrMinus(allNum,arr);  
	  
	                if(ableArr.length == 0){  
	                    this.createSdArr();  
	                    return;  
	                    break outerfor;  
	                }  
	  
	                var item;  
	                //如果生成的重复了就重新生成。  
	                do{  
	                    item = ableArr[getRandom(ableArr.length)-1];  
	                }while((arr.indexOf(item)>-1));  
	  
	                this.sdArr[parseInt(i+''+j)] = item;  
	            }  
	        }  
	        this.backupSdArr = this.sdArr.slice();  

	},  
	getXArr:function(j,sdArr){  
	    //获取所在行的值。  
	    var arr = [];  
	    for(var a =1;a<=9;a++){  
	        if(this.sdArr[parseInt(a+""+j)]){  
	            arr.push(sdArr[parseInt(a+""+j)])  
	        }  
	    }  
	    return arr;  
	},  
	getYArr:function(i,sdArr){  
	    //获取所在列的值。  
	    var arr = [];  
	    for(var a =1;a<=9;a++){  
	        if(sdArr[parseInt(i+''+a)]){  
	            arr.push(sdArr[parseInt(i+''+a)])  
	        }  
	    }  
	    return arr;  
	},  
	getThArr:function(i,j,sdArr){  
	    //获取所在三宫格的值。  
	    var arr = [];  
	    var cenNum = this.getTh(i,j);  
	    var thIndexArr = [cenNum-11,cenNum-1,cenNum+9,cenNum-10,cenNum,cenNum+10,cenNum-9,cenNum+1,cenNum+11];  
	    for(var a =0;a<9;a++){  
	        if(sdArr[thIndexArr[a]]){  
	            arr.push(sdArr[thIndexArr[a]]);  
	        }  
	    }  
	    return arr;  
	},  
	getTh:function(i,j){  
	    //获取所在三宫格的中间位坐标。  
	    var cenArr = [22,52,82,25,55,85,28,58,88];  
	    var index = (Math.ceil(j/3)-1) * 3 +Math.ceil(i/3) -1;  
	    var cenNum = cenArr[index];  
	    return cenNum;  
	},  
	setThird:function(i,j){  
	    //为对角线上的三个三宫格随机生成。  
	    var numArr = [1,2,3,4,5,6,7,8,9];  
	    var sortedNumArr= numArr.sort(function(){return Math.random()-0.5>0?-1:1});  
	    var cenNum = parseInt(i+''+j);  
	    var thIndexArr = [cenNum-11,cenNum-1,cenNum+9,cenNum-10,cenNum,cenNum+10,cenNum-9,cenNum+1,cenNum+11];  
	    for(var a=0;a<9;a++){  
	        this.sdArr[thIndexArr[a]] = sortedNumArr[a];  
	    }  
	} ,
	setLevel:function(){
		//用户输入难度。
		var num = prompt("请输入难度（5-50）"); 
		if(!isNaN(num)){
			num = parseInt(num);
			num = num<5?5:num;
			num = num>50?50:num;
		}else{
			num = false;
		}
		return num;
	},
	createBlank:function(num){
		//生成指定数量的空白格子的坐标。
		var blankArr = [];
		var numArr = [1,2,3,4,5,6,7,8,9];
		var item;
		for(var a =0;a<num;a++){
			do{
				item = parseInt(numArr[getRandom(9) -1] +''+ numArr[getRandom(9) -1]);
			}while(blankArr.indexOf(item)>-1);
			blankArr.push(item);
		}
		this.blankArr = blankArr;
	},

}










//生成随机正整数
function getRandom(n){
	return Math.floor(Math.random()*n+1)
}

//两个简单数组的并集。
function getConnect(arr1,arr2){
	var i,len = arr1.length,resArr = arr2.slice();
	for(i=0;i<len;i++){
		if(arr2.indexOf(arr1[i])<0){
			resArr.push(arr1[i]);
		}
	}
	return resArr;
}

//两个简单数组差集，arr1为大数组
function　arrMinus(arr1,arr2){
	var resArr = [],len = arr1.length;
	for(var i=0;i<len;i++){
		if(arr2.indexOf(arr1[i])<0){
			resArr.push(arr1[i]);
		}
	}
	return resArr;
}

