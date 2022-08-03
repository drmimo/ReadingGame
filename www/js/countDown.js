
window.onload= function(evt){
	let time = document.querySelector('.time')
	let cover= document.querySelector('.cover')

	let timer = window.setInterval(()=>{
		time.innerText = "0"+ (time.innerText - 1)

		if(time.innerText == 0){
			window.clearInterval(timer)
			cover.style.top = '-100%'
			startGameCounter()
		}
	}, 1000)
}

function startGameCounter(){
	let timer = document.querySelector('.countDown svg .circle2')
	let seconds = document.querySelector('.countDown h4 .seconds')
	let secs = seconds.innerText;

	let counter = window.setInterval(()=>{
		seconds.innerText -= 1
		//console.log('seconds: '+secs)
		timer.style.strokeDashoffset -= (410/secs);
		if(seconds.innerText == "0"){
			window.clearInterval(counter)
			endGame()
		}
		//console.log(123)
	}, 1000)
}

function endGame(){
	let finalCover = document.querySelector('.endCover')
	let left = document.querySelector('.endCover .leftPart')
	let right = document.querySelector('.endCover .rightPart')

	finalCover.style.zIndex = '21'
	left.style.left = '0px'
	right.style.right = '0px'
}