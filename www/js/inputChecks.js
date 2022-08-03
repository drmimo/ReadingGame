function only_numbers(a){

    if(isNaN(a.value) || a.value.trim() =="")
    {
        showAlert()
        a.value = ""
        a.nextElementSibling.value = ""
        let submitBtn = document.querySelector('.submitBtn')
        submitBtn.disabled = true
        
    }else{
        if(a.id  == 'plyID'){
            eel.get_player(a.value)(showPlayer)
        }

        if(a.id == 'bkID'){
            eel.get_book(a.value)(showBooks)
        }
    }

}
		
function full_fields(){
    
    let plyNum = document.querySelector('#plyID')
    let plyName = document.querySelector('#plyName')
    let submitBtn = document.querySelector('.submitBtn')

    if(plyNum.value.trim() && plyName.value.trim()){
        submitBtn.disabled = false
    }else{
        submitBtn.disabled = true
    }
}

function full_fields_book(){
    let bkNum = document.querySelector('#bkID')
    let bkTitle = document.querySelector('#bkTitle')
    let submitBtn = document.querySelector('.submitBtn')

    if(bkNum.value.trim() && bkTitle.value.trim()){
        submitBtn.disabled = false
    }else{
        submitBtn.disabled = true
    }
}

function showAlert(){
    let cover = document.querySelector('.alert')
    cover.style.display = 'flex'
}

function hideAlert(){
    let cover = document.querySelector('.alert')
    cover.style.display = 'none'
}