import fs from 'fs/promises'
import {Product} from './product.js'

export class ProdManager{
    #products
    #path
    #id
    constructor(path){
        this.#path= path 
        this.#id=0

        
    }

    async checkFile(){
        try {
            await fs.access(this.#path)

            await this.load()         
            const lengthProd=[...this.#products].length-1   
            this.#id=  this.#products[lengthProd].id

        } catch (error) {
            console.error('el archivo no existe, generando...')
            await fs.writeFile(this.#path,'[]')        
            this.#id=0

        }
        
    }

    async load(){
        try {
            this.#products= JSON.parse(await fs.readFile(this.#path,'utf-8'))
            
        } catch (error) {
            console.log('algo salio mal')
        }
    }

    async burn(){
        await fs.writeFile(this.#path, JSON.stringify(this.#products,null,2))
    }

    async destroy(){
        await fs.writeFile(this.#path,'[]')        
        this.#id=0
    }

    async getProducts(){
        await this.load()
        return [...this.#products]
    }

    async lastID(){
        return this.#id
    }

    async addProduct(title,description,price,thumbnail,code,stock){
        await this.load()
        this.#id++
        const product= new Product(this.#id,title,description,price,thumbnail,code,stock)
        this.#products.push(product.print())
        
        await this.burn()
        return product.print()
    }
    
    async deleteProduct(id){
        if(await this.existProduct(id)){

            const newList = this.#products.filter((x)=> x.id != id)
            this.#products= newList
            await this.burn()

        }else{
            throw new Error(`ERROR: producto de id ${id} no existe`)
        }
    }

    async updateProduct(id,data){
        if(await this.existProduct(id)){

            const index= this.#products.findIndex((x) => x.id ==id)

            this.#products[index]={
                ...await this.take(id),
                ...data
            }
            await this.burn()
        }else{
            throw new Error(`ERROR: producto de id ${id} no existe`)
        }

    }

    async existProduct(id){
        await this.load()
        
        const itExist= this.#products.find(u => u.id == id)

        if(itExist==undefined){
            return false
            //throw new Error('ERROR, producto no existe')
        }else{
            return true
        }
    }

    async take(id){
        await this.load()
        return this.#products.find(u => u.id == id)
    }

    async search(id){
        if (await this.existProduct(id)){
            return this.take(id)
        }

        throw new Error(`ERROR: producto de id ${id} no existe`)
    }
    


}