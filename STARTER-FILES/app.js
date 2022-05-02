const tax = 0.0975
const menuItems = [
    {
        name: 'French Fries with Ketchup',
        price: 223,
        image: 'plate__french-fries.png',
        alt: 'French Fries',
        count: 0
    },
    {
        name: 'Salmon and Vegetables',
        price: 512,
        image: 'plate__salmon-vegetables.png',
        alt: 'Salmon and Vegetables',
        count: 0
    },
    {
        name: 'Spaghetti Meat Sauce',
        price: 782,
        image: 'plate__spaghetti-meat-sauce.png',
        alt: 'Spaghetti with Meat Sauce',
        count: 0
    },
    {
        name: 'Bacon, Eggs, and Toast',
        price: 599,
        image: 'plate__bacon-eggs.png',
        alt: 'Bacon, Eggs, and Toast',
        count: 0
    },
    {
        name: 'Chicken Salad with Parmesan',
        price: 698,
        image: 'plate__chicken-salad.png',
        alt: 'Chicken Salad with Parmesan',
        count: 0
    },
    {
        name: 'Fish Sticks and Fries',
        price: 634,
        image: 'plate__fish-sticks-fries.png',
        alt: 'Fish Sticks and Fries',
        count: 0
    }
]

let addedPlates = Array.from(document.getElementsByClassName('in-cart'))
let yetAddedPlates = Array.from(document.getElementsByClassName('add'))

const getChevronIcon = () => {
    let chevronIcon = document.createElement('img')
    chevronIcon.setAttribute('src', 'images/chevron.svg')
    // probably will add id
    return chevronIcon
}

const decreaseHandler = (e) => {
    let btn = e.target
    const listItem = btn.closest('li')
    const values = listItem.querySelectorAll('.quantity')
    if(parseInt(values[0].textContent) === 1) {
        // set available in the menu
        let plateTitle = listItem.querySelector('img').getAttribute('alt')
        let plateImages = Array.from(document.querySelectorAll('ul.menu > li > div.plate > img'))
        let plate_ = plateImages.filter(plate__ => plate__.getAttribute('alt') === plateTitle)
        let plateElt = plate_[0].parentNode.closest('li').querySelector('button')
        plateElt.classList.remove('in-cart')
        plateElt.classList.add('add')
        plateElt.textContent = 'Add to Cart'
        // remove from the cart
        let list = listItem.parentNode
        list.removeChild(listItem)
        btn.removeEventListener('click', e)
        btn.addEventListener('click', addingPlateHandler)
    } else {
        Array.from(values).forEach(v => {
            v.textContent = parseInt(v.textContent) - 1
        })
    }
}

const addingPlateHandler = (e) => {
    let elt = e.target
    let checkIcon = document.createElement('img')
    checkIcon.setAttribute('src', 'images/check.svg')
    checkIcon.setAttribute('alt', 'Check')
    if(elt.classList.contains('add')) {
        elt.classList.remove('add')
        elt.classList.add('in-cart')
        elt.textContent = 'In Cart'
        elt.insertBefore(checkIcon, elt.childNodes[0])
        // gathering product infos
        let menuIng = elt.parentNode.closest('li').querySelector('div.plate > img')
        let menuTitle = menuIng.getAttribute('alt')
        const chosenMenuItem = menuItems.filter(
            menuItem => menuItem.alt === menuTitle
        )
        // console.log(getCartEltTemplate(chosenMenuItem[0]))
        document.querySelector('.cart-summary').appendChild(
            getCartEltTemplate(chosenMenuItem[0])
        )
        elt.removeEventListener('click', e)
    }
}

const increaseHandler = (e) => {
    let btn = e.target
    const listItem = btn.closest('li')
    const values = listItem.querySelectorAll('.quantity')
    Array.from(values).forEach(v => {
        v.textContent = parseInt(v.textContent) + 1
    })
}

const synchroTemplate = () => {
    let cartSummary = Array.from(document.querySelectorAll('ul.cart-summary > li > div.plate > img'))
    let menuPlates = Array.from(document.querySelectorAll('ul.menu > li > div.plate > img'))
    cartSummary.forEach(addedPlate => {
        let menuPlate = menuPlates.filter(plate => plate.getAttribute('alt') === addedPlate.getAttribute('alt'))
        if(menuPlate !== null) {
            let menuPlateBtn = menuPlate[0].closest('li').querySelector('button')
            menuPlateBtn.classList.remove('add')
            menuPlateBtn.classList.remove('in-cart')
            menuPlateBtn.classList.add('in-cart')
            menuPlateBtn.textContent = 'In Cart'
            menuPlateBtn.addEventListener('click', addingPlateHandler)
        }
    })
}
synchroTemplate()

const getCartEltTemplate = (chosenMenuItem) => {

    let cartElt = document.createElement('li')

    let cartEltPlate = document.createElement('div')
    cartEltPlate.setAttribute('class', 'plate')
    let plateImg = document.createElement('img')
    plateImg.setAttribute('src', `images/${chosenMenuItem.image}`)
    plateImg.setAttribute('alt', chosenMenuItem.alt)
    plateImg.setAttribute('class', 'plate')
    let plateQte1 = document.createElement('div')
    plateQte1.setAttribute('class', 'quantity')
    plateQte1.innerText = 1
    cartEltPlate.append(plateImg, plateQte1)
    
    let cartEltContent = document.createElement('div')
    cartEltContent.setAttribute('class', 'content')
    let plateName = document.createElement('p')
    plateName.setAttribute('class', 'menu-item')
    plateName.textContent = chosenMenuItem.name
    let platePrice = document.createElement('p')
    platePrice.setAttribute('class', 'price')
    platePrice.textContent = `$${chosenMenuItem.price/100}`
    cartEltContent.append(plateName, platePrice)

    let cartEltWrapper = document.createElement('div')
    cartEltWrapper.setAttribute('class', 'quantity__wrapper')
    let decreaseBtn = document.createElement('button')
    decreaseBtn.setAttribute('class', 'decrease')
    decreaseBtn.append(getChevronIcon())
    decreaseBtn.addEventListener('click', decreaseHandler)
    
    let increaseBtn = document.createElement('button')
    increaseBtn.setAttribute('class', 'increase')
    increaseBtn.append(getChevronIcon())
    increaseBtn.addEventListener('click', increaseHandler)
    let plateQte2 = document.createElement('div')
    plateQte2.setAttribute('class', 'quantity')
    plateQte2.innerText = 1
    cartEltWrapper.append(decreaseBtn, plateQte2, increaseBtn)

    cartEltWrapper.append()
    let cartEltSubtotal = document.createElement('div')
    cartEltSubtotal.setAttribute('class', 'subtotal')
    cartEltSubtotal.textContent = `$${chosenMenuItem.price/100}`

    cartElt.append(cartEltPlate, cartEltContent, cartEltWrapper, cartEltSubtotal)
    return cartElt
}

yetAddedPlates.forEach((elt) => {
    elt.addEventListener('click', addingPlateHandler)
})

Array.from(document.getElementsByClassName('decrease')).forEach(btn => {
    btn.addEventListener('click', decreaseHandler)
})



Array.from(document.getElementsByClassName('increase')).forEach(btn => {
    btn.addEventListener('click', increaseHandler)
})

const estimatePrice = (mutationList, observer) => {
    let ucs = document.querySelector('ul.cart-summary')
    let subtotal = 0
    mutationList.forEach(mutation => {
        if(mutation.type === 'childList') {
            ucs.querySelectorAll('li').forEach(el => {
                let itemAlt = el.querySelector('div.plate > img').getAttribute('alt')
                let correspondingItem = menuItems.filter(menuItem => menuItem.alt === itemAlt)[0]
                let singleItemPrice = correspondingItem.price
                let itemQuantity = parseInt(el.querySelector('div.quantity').textContent)
                el.querySelector('div.subtotal').textContent = `$${((singleItemPrice/100) * itemQuantity).toFixed(2)}`
            })
            ucs.querySelectorAll('div.subtotal').forEach(subtotal_ => {
                subtotal += parseFloat(subtotal_.textContent.slice(1))
            })
            let totals = document.querySelector('div.totals')
            let taxedTotal = parseFloat((subtotal*tax).toFixed(2))
            let total = (subtotal + taxedTotal).toFixed(2)
            totals.querySelector('div.line-item > div.subtotal').textContent = `$${subtotal.toFixed(2)}`
            totals.querySelector('div.line-item > div.tax').textContent = `$${taxedTotal}`
            totals.querySelector('div.line-item > div.total').textContent = `$${total}`
        }
    })
}

const observer = new MutationObserver(estimatePrice)
const observerConfig = {attributes:true, childList:true, subtree:true, characterData: true}
observer.observe(document.querySelector('ul.cart-summary'), observerConfig)