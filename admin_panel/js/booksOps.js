window.addEventListener('load', ()=>{
	eel.loadBooksList()(showBooksList)
})

function showBooksList(data){
	if(data){
		let listElement = document.querySelector('.list ol li')
		let list = document.querySelector('.list ol')
		let selectNodes = document.querySelectorAll('article select')
		
		for(let i = 0; i<data.length; i++){
			let cloneNode = listElement.cloneNode(true)

			cloneNode.querySelector('.num').innerText = data[i][0]
			cloneNode.querySelector('b').innerText = ""
			cloneNode.querySelector('b').innerText += data[i][1]

			selectNodes.forEach((sltElem)=>{
				let opt = document.createElement('option')
				opt.value = data[i][0]
				opt.innerText = data[i][1]
				sltElem.appendChild(opt)
			})

			list.appendChild(cloneNode)
		}

		list.removeChild(listElement)
	}else{
		alert('هناك مشكلة في استرجاع قائمة الكتب من قاعدة البيانات')
	}
}

function isNotEmpty(a){
	return (a.value.trim() != "")
}

function putBook(a){
	let formElements = a.parentElement.previousElementSibling.querySelectorAll('[id^=bk_]')
	let arrFormElements = Array.from(formElements)

	//console.log(arrFormElements)

	if(!arrFormElements.every(isNotEmpty))
		alert('عليك بملء كل الحقول دون استثناء')
	else{
		let preparedData = []
		arrFormElements.forEach((x)=>{
			if(x.type != 'file')
				preparedData.push(x.value.trim())
			else
				preparedData.push(x.files[0].name)
		})
		eel.insert_book(preparedData)
		window.location.reload()
	}
}

function putQuestion(a){
	let formElement = a.parentElement.previousElementSibling
	let arrFormElements = Array.from(formElement.querySelectorAll('[id^=qst_]'))

	//console.log(arrFormElements)

	let checked = formElement.querySelector('input[type=radio]:checked')
	let chosenAnswer = checked.nextElementSibling.value

	if(!arrFormElements.every(isNotEmpty))
		alert('عليك بملء كل الحقول دون استثناء')
	else{
		let preparedData = []
		arrFormElements.forEach((x)=>{
			preparedData.push(x.value.trim())
		})

		preparedData.push(chosenAnswer)
		eel.insert_question(preparedData)
		emptify(formElement.querySelectorAll('[id^=qst_]'))
		//console.log(preparedData)
		//window.location.reload()
	}

}

function emptify(fields){
	for(let field of fields){
		field.value = ""
	}
}

function updateBook(a){
	let formElements = a.parentElement.previousElementSibling.querySelectorAll('[id^=bk_]')
	let arrFormElements = Array.from(formElements)

	formElements.forEach(x=> console.log(x.value))
	//console.log(formElements)

	if(!arrFormElements.every(isNotEmpty))
		alert('عليك بملء كل الحقول دون استثناء')
	else{
		let preparedData = []
		arrFormElements.forEach((x)=>{
			if(x.type != 'file')
				preparedData.push(x.value.trim())
			else
				preparedData.push(x.files[0].name)
		})
		eel.update_book(preparedData)
		emptify(formElements)
		//window.location.reload()
	}
}

function loadBookInfos(data){
	let parent = document.querySelector('.updateForm')
	let inputs = parent.querySelectorAll('input')

	for(let counter = 0; counter <data.length; counter++){
		if(inputs[counter].type == 'file'){
				const myFile = new File([data[counter]], data[counter], {
		        type: 'text/plain',
		        lastModified: new Date()});

			    // Now let's create a DataTransfer to get a FileList
			    const dataTransfer = new DataTransfer();
			    dataTransfer.items.add(myFile);
			    inputs[counter].files = dataTransfer.files;	
		}else{
			inputs[counter].value = data[counter]
		}
	}

}