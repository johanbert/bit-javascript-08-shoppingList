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

    update = (productIndex) => {}

    delete = (productIndex) => {
        productIndex = Number(productIndex.replace('product', ''))
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
                <td>
                <button type="button" name="btn-edit" class="btn btn-primary btn-sm"><i class="fa fa-edit text-ligth" aria-hidden="true"></i></button>
                <button id="product${i}"  type="button" name="btn-delete" class="btn btn-danger btn-sm"><i class="fa fa-trash text-ligth" aria-hidden="true"></i></button>
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

document.formTable.addEventListener("click", (element) => {
    if (element.target.name == 'btn-delete')
        objetoShoppingList.delete(element.target.id)

    // console.log('element.target.parentElement.name', element.target.parentElement.name);
    if (element.target.name == 'btn-edit' || element.target.parentElement.name == 'btn-edit') {
        console.log('entro aca');
        let parentElement = element.target.parentElement
        let children = (parentElement.name == 'btn-edit') ? parentElement.parentElement.parentElement.children : parentElement.parentElement.children // HTMLCollection[]
        let cArray = [...children]
        let min = 1

        cArray // Array[]
            .filter((item, i) => i >= (min) && i <= (cArray.length - 2))
            .map((item) => item.innerHTML = `<input value="${item.textContent}">`)

    }


})