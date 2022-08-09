
let tabsItems = document.querySelectorAll('.tabItem')
let tabsContents = document.querySelectorAll('.tabContent')

tabsItems.forEach((item, idx)=>{
    item.addEventListener('click', function(e){
        tabsContents.forEach((tab, tabIdx) =>{
            idx != tabIdx ? tab.classList.remove('active') : tab.classList.add('active')
        })

        tabsItems.forEach((it, itIdx)=>{
            it.classList.remove('active')
        })

        this.classList.add('active')
    })
})