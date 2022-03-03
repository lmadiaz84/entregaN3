const fs = require("fs")

class Contenedor {
    
    constructor(nombre){
        this.nombre = nombre
    }

    async save(obj){
        try{
            const contenido = fs.readFileSync(this.nombre)
            const contenido_parsed = JSON.parse(contenido)
            obj["id"] = (contenido_parsed[contenido_parsed.length - 1].id) + 1
            fs.writeFileSync("./productos.txt", JSON.stringify([...contenido_parsed, obj]))
        }
        catch(err){
            fs.appendFileSync("./productos.txt",JSON.stringify([{...obj,id : 0}]))
        }
    }

    getAll(){
        try {
            const contenido = fs.readFileSync(this.nombre)
            const contenido_parsed = JSON.parse(contenido)
            return JSON.stringify(contenido_parsed)
        }
        catch (error) {
            console.log("No se puede leer todo el objeto o no tiene contenido")
        }
    
    }

    getById(id){
        try {
            const contenido = fs.readFileSync(this.nombre)
            const productos = JSON.parse(contenido)
            return productos.find(producto => id === producto.id)
        } catch (error) {
            console.log(error)
        }
    }

    async deleteById(id){
        try{ 
            const contenido = await fs.promises.readFile("./productos.txt", "utf-8")
            const archivoC = JSON.parse(contenido)
            let index = archivoC.map(producto => producto.id).indexOf(id)
            archivoC.splice(index,1)
            await fs.promises.writeFile("./productos.txt", JSON.stringify(archivoC, null, 2)) 
            console.log(archivoC)

        } catch (error){
            console.log("No se encuentra lo solicitado")
        }
    }

    deleteAll(){
        fs.writeFileSync("./productos.txt", "")
        console.log('contenido borrado')
    }

    async getRandom (){
        const id = Math.floor(math.random()*(3-1+1)+1)
        return await this.getById(id)
    }
           
}

const cont1 = new Contenedor("./productos.txt")
/*
cont1.save({                                                                                                                                                    
    title: 'Escuadra2',                                                                                                                                 
    price: 199.45,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',                                     
                                                                                                                                            
  },)
cont1.save({                                                                                                                                                
    title: 'Globo Terráqueo',                                                                                                                          
    price: 345.67,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',                                                                                       id: null                                                                                  
  },)
cont1.save( {                                                                                                                                                    
    title: 'Calculadora',                                                                                                                              
    price: 234.56,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',                                          
                                                                                                                                              
  },)*/
module.exports = Contenedor

console.log(cont1.getAll())

//console.log(cont1.getById())

//console.log(cont1.deleteById(0))

//console.log(cont1.deleteAll())
