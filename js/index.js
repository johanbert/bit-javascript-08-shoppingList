/** 
 * Programacion orientada a objetos 
 * Paradigma de orientación a objetos 
 * Todo es un objeto
 * Objeto: tiene atributos/propiedades y metodos/funciones
 * Atributos/Propiedades: son las caracteristicas/adjetivos que describen al objeto
 * Metodos/Funciones: lo que puede hacer el objeto.
 * ------------------------------------------------- *
 * Clases: son las plantillas o esqueletos de los cuales se crean los objetos
 */

/**
 * palabraReservada NombreDeLaClase{
  }
 * class NombreDeLaClase {
    }   
 */
/**
 * snake_case
 * camelCase
 */

class NombreDeLaClase {
    //atributos/propiedades // opcionales en JS
    atributo1;
    propiedad2;
    //metodos/funciones
    metodo1() {}
    funcion1() {}
}
/**
 * Instanciacion de una clase es crear un objeto de la clase.
 * Objeto = Instancia de una clase
 */

let objetoDeEjemplo = new NombreDeLaClase();

class Humano {
    //atributos/propiedades // opcionales en JS
    nombre;
    apellido;
    edad;

    constructor(paramNombre, paramApellido, paramEdad = 1) {
        // this.nombre = Humano.propiedad
        this.nombre = paramNombre
        this.edad = paramEdad
    }

    //metodos/funciones
    decirNombre() {
        console.log('Nombre:', this.nombre)
    }
    decirEdad() {
        console.log('Edad:', this.edad)
    }

}

let persona = new Humano('Benjamin', 'Franklin', 21)
persona.decirNombre()
persona.decirEdad()