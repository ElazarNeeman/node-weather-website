console.log('client side java script') 



const weatherForm = document.querySelector('form')

const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = search.value
    console.log('testing ' + location)

    messageTwo.textContent = ''
    messageOne.textContent = 'Loading ...' 
    fetch('weather?address=' + location).then((response) =>{
        response.json().then(data => {
            if (data.error){
                 messageTwo.textContent = data.error
            }
            messageOne.textContent = data.forecast
        })
    } )
    

})