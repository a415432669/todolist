var inputDom = document.querySelector("#write");
var todoList = document.querySelector(".todo .clist")
var doneList = document.querySelector(".done .clist")
var todoNumSpan = document.querySelector('.todo h1 .num');
var doneNumSpan = document.querySelector('.done h1 .num');
var main = document.querySelector(".main")

//JSON.parse->将JSON格式的字符串转换成数组对象；
var dataList = localStorage.dataList?JSON.parse(localStorage.dataList):[];
renderList()

inputDom.onkeypress = function(e){
	//console.log(e)
	//当用户在输入框按下回车键，并且输入框有内容，那么就将输入框的内容放置到待办事项里
	if(e.key=="Enter"&&inputDom.value!=""){
		//往dataList数据里添加待办事项数据
		var data = {
			content:inputDom.value,
			type:"todo"
		}
		dataList.push(data)
		//根据数据渲染列表
		renderList()
		
		
	}
}


function renderList(){
	//每次渲染，将之前的内容清空，重新渲染
	//JSON.stringify:将对象转换成JSON格式字符串；
	localStorage.dataList = JSON.stringify(dataList)
	todoList.innerHTML = "";
	doneList.innerHTML = "";
	var todoNum = 0;
	var doneNum = 0;
	dataList.forEach(function(item,index){
		var newDiv = document.createElement("div")
		newDiv.className = "item";
		if(item.type=="todo"){
			todoNum++;
			newDiv.innerHTML = `
				<span class="checkbox">
					<input type="checkbox" name="check"  value="" data-index="${index}"  />
				</span>
				<span class="content">
					${item.content}
				</span>
				<span class="delete" data-index="${index}"></span>
			`;
			todoList.appendChild(newDiv)
		}else{
			doneNum ++;
			newDiv.innerHTML = `
				<span class="checkbox">
					<input type="checkbox" name="check" checked="checked"  value="" />
				</span>
				<span class="content">
					${item.content}
				</span>
				<span class="delete" data-index="${index}"></span>
			`;
			doneList.appendChild(newDiv)
		}
	})
	console.log(todoNum)
	todoNumSpan.innerHTML = todoNum;
	doneNumSpan.innerHTML = doneNum;
}



todoList.onchange = function(e){
	//console.log(e)
	var index = e.target.dataset.index;
	console.log(index)
	dataList[index].type = "done";
	renderList()
	
}



//删除事项
main.addEventListener("click",function(e){
	if(e.target.className=="delete"){
		var index = e.target.dataset.index;
		//console.log(e)
		dataList.splice(index,1);
		renderList();
	}
	
})
