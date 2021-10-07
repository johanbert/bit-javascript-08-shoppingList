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

    update = () => {}
    delete = () => {}

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
                <td>${i}</td>
                <td>${obj.name}</td>
                <td>${obj.quantity}</td>
                <td>${obj.price}</td>
                <td>${obj.boughtAt}</td>
            </tr>
            `).join(' ')

        document.getElementById('tableBody').innerHTML = listaProductos
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
    // console.log('objetoShoppingList.read()', objetoShoppingList.read());