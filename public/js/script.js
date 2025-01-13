let deleteCoffee = document.querySelectorAll('.fa-trash')

Array.from(deleteCoffee).forEach(element => {
    element.addEventListener('click', deleteC)
})

async function deleteC(){
    const cName = this.parentNode.childNodes[1].innerText
    console.log(cName)
    try{
        const response = await fetch('deleteCoffee', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'coffeeBrandName': cName
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(error){
        console.log(error)
    }
}