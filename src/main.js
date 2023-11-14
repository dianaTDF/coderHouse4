import express from 'express'
import { ProdManager } from './prodMan.js'

const app = express()
const pm= new ProdManager('./db/products.json')
await pm.checkFile()


app.get('/products', async (req,res)=>{ 
    const {limit} = req.query
    const prodCount= await pm.getProducts().length
    
    if( limit == undefined){
        return res.json( await pm.getProducts())
    }

    if(limit >0){
        res.json( [... await pm.getProducts()].slice(0,limit))
    }else{
        return res.status(400).json({ error: 'el valor buscado debe ser positivos'});
    }
/*     else{
    } */

    
})



app.get('/products/:pid', async (req,res)=>{
    const pid= Number(req.params.pid)
    const existPid= await pm.existProduct(pid)
    if(!existPid){
        return res.status(404).json({message:`producto de id ${pid} no existe`})
    }
    return res.json( await pm.search(pid))
})



app.listen(8080, () => console.log("Server ON: 8080") )