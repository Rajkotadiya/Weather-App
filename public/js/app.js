console.log('Client side js file is loaded')

const weatherform = document.querySelector('form')
const searchelement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageTwo.textContent = 'from Javascript'

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = searchelement.value
    messageOne.textContent = 'Loading.....'
    messageTwo.textContent = ''    

    fetch('/weather?address='+ location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
        }
        else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecastdata
        }
    })
})
})