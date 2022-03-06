import axios from 'axios'
import Noty from 'noty'

let addToCart = document.querySelectorAll('.add-to-29cart')
let cartCounter = document.querySelector('#cartCounter')

function updateCart(idli) {
    axios.post('/update-cart', idli).then(res => {
        console.log(res)
        cartCounter.innerText = res.data.totalQty
        new Noty({
            type: 'success',
            timeout: 1000,
            text: 'Item added to cart',
            progressBar: false,
        }).show();
    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            text: 'Something went wrong',
            progressBar: false,
        }).show();
    })
    
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let idli = JSON.parse(btn.dataset.idli)
        updateCart(idli)

    })
})