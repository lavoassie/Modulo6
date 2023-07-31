const fs = require("fs")

const[nombre,mascota,animal,edadhumana] = process.argv.slice(2);

fs.readFile("mascotas.json","utf-8", (error,result)=>{
   let {mascotas} = JSON.parse(result)
   mascotas.push({nombre,mascota,animal,edadhumana})
   let data = {mascotas}
   fs.writeFile("mascotas.json",JSON.stringify(data), "utf-8",(error,result)=>{
    console.log("Mascota agregada");
   })
})