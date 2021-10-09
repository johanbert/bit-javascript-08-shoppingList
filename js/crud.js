/**
 * CREATE
 * READ
 * UPDATE
 * DELETE
 */

/**
 * CODIGO IMPERATIVO
 * let currentData;
    if ( this.read() == '' ){
        currentData = []
    }else{
        currentData =  this.read()
    }
 * CODIGO DECLARATIVO 
 * let currentData = this.read() || []
 */


// let listResponse = []
// for (let i = 0; i < listaProductos.length; i++) {
//     let obj = listaProductos[i]
//     let result = `
//     <tr>
//         <td>${i+1}</td>
//         <td>${obj.name}</td>
//         <td>${obj.quantity}</td>
//         <td>${obj.price}</td>
//         <td>${obj.boughtAt}</td>
//     </tr>
//     `
//     listResponse.push(result)
// }
// listResponse = listResponse.join(' ')

class ShoppingList {
    jsonProduct = {
        name: '',
        quantity: '',
        price: '',
        boughtAt: ''
    }

    constructor(formName, formFields) {
        this.formName = formName;
        this.jsonFields = formFields
    }

    add = () => {
        let newProduct = this.getProductDetails()
        let currentData = this.read() || []
        let finalData = [...currentData, newProduct]
        localStorage.setItem(DB_NAME, JSON.stringify(finalData))

        this.refreshData()
    }

    // con JSON.parse convierte lo del localStorage de string a object
    read = () => JSON.parse(localStorage.getItem(DB_NAME))

    update = (productIndex, productEdited) => {
        productIndex = Number(productIndex.replace('btnConfirm', ''))

        // let productModified = {}
        productEdited = Object.keys(this.jsonProduct).map((item, i) => this.jsonProduct[item] = productEdited[i])

        console.log('this.jsonProduct', this.jsonProduct);

        let listaProductos = this.read();
        listaProductos[productIndex] = this.jsonProduct
        localStorage.setItem(DB_NAME, JSON.stringify(listaProductos))
        this.refreshData()
    }

    delete = (productIndex) => {
        productIndex = Number(productIndex.replace('btnDelete', ''))
        let listaProductos = this.read();
        listaProductos.splice(productIndex, 1)

        localStorage.setItem(DB_NAME, JSON.stringify(listaProductos))
        this.refreshData()
    }

    getProductDetails = () => {
        return {
            name: document[this.formName][this.jsonFields.name].value,
            quantity: document[this.formName][this.jsonFields.quantity].value,
            price: document[this.formName][this.jsonFields.price].value,
            boughtAt: document[this.formName][this.jsonFields.boughtAt].value
        }
    }

    refreshData = () => {
        let listaProductos = this.read();
        listaProductos = listaProductos.map((obj, i) => `
            <tr>
                <td>${i+1}</td>
                <td>${obj.name}</td>
                <td>${obj.quantity}</td>
                <td>${obj.price}</td>
                <td>${obj.boughtAt}</td>
                <td class="colActions">
                
                <button type="button" id="btnEdit${i}" name="btn-edit" class="btn btn-primary btn-sm"><i class="fa fa-edit text-ligth" aria-hidden="true"></i></button>
                <button type="button" id="btnDelete${i}" name="btn-delete" class="btn btn-danger btn-sm"><i class="fa fa-trash text-ligth" aria-hidden="true"></i></button>
                </td>
            </tr>`)

        document.getElementById('tableBody').innerHTML = listaProductos.join(' ')
    }


}

const DB_NAME = "shoppingList"
const formName = 'formProduct'
const formFields = {
    name: "productName",
    quantity: "productQuantity",
    price: "productPrice",
    boughtAt: "boughtAt"
}

const objetoShoppingList = new ShoppingList(formName, formFields);
objetoShoppingList.refreshData()
console.log('objetoShoppingList.jsonProduct', objetoShoppingList.jsonProduct);

const processClick = (element) => {
    const listButtons = ['btn-delete', 'btn-edit']
    const min = 1
    if (element.target.name == listButtons[0]) // se valida btn-delete
        objetoShoppingList.delete(element.target.id)

    if (element.target.name == listButtons[1] || element.target.parentElement.name == listButtons[1]) { // se valida btn-edit
        let parentElement = element.target.parentElement
        let tdColActions = (parentElement.name == listButtons[1]) ? parentElement.parentElement : parentElement
        hideButtons(tdColActions, listButtons, 'block')

        let productId = tdColActions.querySelector('button[name="btn-edit"]').id.replace('btnEdit', '')
        tdColActions.innerHTML += createEditButtons(productId)

        let children = (parentElement.name == listButtons[1]) ? parentElement.parentElement.parentElement.children : parentElement.parentElement.children // HTMLCollection[]
        let childrenArray = [...children]

        childrenArray // Array[]
            .filter((item, i) => i >= (min) && i <= (childrenArray.length - 2))
            .map((item) => item.innerHTML = `<input value="${item.textContent}">`)
    }

    if (element.target.name == 'btnConfirm') {
        let childrenArray = [...element.target.parentElement.parentElement.children]
        let productEdited = childrenArray
            .filter((item, i) => i >= (min) && i <= (childrenArray.length - 2))
            .map((item) => item.children[0].value)

        objetoShoppingList.update(element.target.id, productEdited)
        console.log('productEdited', productEdited);
    }
    if (['btnCancel'].includes(element.target.name)) {
        /* Le queda a usted la tarea */
    }

}
const toggleButtons = (parentElement, listBtns, display = 'none') => {
    listBtns.map((item) => parentElement.querySelector(`[name="${item}"]`).style.display = display || 'block')
}
const createEditButtons = (productId) => `
<button type="button" class="btn btn-primary" name="btnConfirm" id="btnConfirm${productId}">Confirmar</button>
<button type="button" class="btn btn-danger" name="btnCancel" id="btnCancel${productId}">Cancelar</button>`

document.formTable.addEventListener("click", processClick)