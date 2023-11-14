import * as sec from './security.js'


export class Product {
    #code
    #title
    #thumbnail

    constructor(id,title,description = "Descipcion pendiente",price,thumbnail="Sin imagen",code,stock){
        this.id= id
        this.title= title
        this.description =sec.requiredValue(description,'descipcion')
        this.price =sec.requiredPositiveValue(price,'precio')
        this.thumbnail= thumbnail
        this.code= code
        this.stock =sec.requiredPositiveValue(stock,'cantidad')       
    }


    set title(value){
        this.#title =sec.requiredValue(value,'titulo')
    }
    get title(){
        return this.#title
    }

    set code(value){
        this.#code =sec.requiredValue(value,'codigo'+value)
    }
    get code(){
        return this.#code
    }

    set thumbnail(value){
        this.#thumbnail =sec.requiredValue(value,'iamgen')
    }
    get thumbnail(){
        return this.#thumbnail
    }

    print(){
        return {
            id:this.id,
            title:this.title,
            description:this.description,
            price:this.price,
            thumbnail:this.thumbnail,
            code:this.code,
            stock:this.stock,
        }
    }


}