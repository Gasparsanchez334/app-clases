import { buscarEmail } from "./services/usuarios"
import { bienvenido } from "./views/bienvenido"
import { iniciarSesion } from "./views/iniciarSes"
import { contrasena } from "./services/usuarios"
import { inicioAdmin } from "./views/admin/inicioAdmin"
import { inicioCliente } from "./views/cliente/inicioCliente"
import { cierreSesion } from "./views/cierreSesion"
import { verClientes } from "./views/admin/verClientes"
import type { Usuario } from "./types/usuario"
import { traerUsuarios } from "./services/usuarios"
import { crearUsuario } from "./services/usuarios"
import { crearCliente } from "./views/admin/crearCliente"
import { crearClase } from "./views/admin/crearClase"
import { verClases } from "./views/verClases"
import { eliminar, traerClases, crearCla } from "./services/clases"
import type { Clase } from "./types/clase"
import { inscripUsuario, sumarPersona, traerCantClase } from "./services/inscripciones"
import type { Inscripcion } from "./types/Inscripcion"
import { bajarPersona } from "./services/inscripciones"
import { eliminarClase } from "./views/admin/eliminarClase"
import { modificarPerfil } from "./views/modificarPerfil"
import { modifContrasena } from "./views/modifContrasena"
import { modifNombre } from "./views/modifNombre"

const app = document.getElementById("app")!


function principal() { 
  const usuarioGuardado = localStorage.getItem("usuario")
  if (usuarioGuardado){
    inicio(JSON.parse(usuarioGuardado) as Usuario)
  }
  else{
    app.innerHTML = bienvenido()
  document.getElementById("login")!
  .addEventListener("click", ()=>{
    inicioDeSesion()
    }  )
}
}

function inicioDeSesion(){
  app.innerHTML = iniciarSesion()
  document.getElementById("entrar")!
  .addEventListener("click", async (e)=>{
    e.preventDefault()

  const email = (document.querySelector("input[type='email']") as HTMLInputElement).value
  const password = (document.querySelector("input[type='password']") as HTMLInputElement).value
  const usuario = await buscarEmail(email)
  const contra = await contrasena(usuario, password)
  if (contra == "Login correcto") {
    localStorage.setItem("usuario", JSON.stringify(usuario))
    inicio(usuario)
  } else {
    alert (contra)
  }
  })
}

function inicio(usuario: Usuario | null){
  if (usuario?.rol == "admin"){
    app.innerHTML = inicioAdmin()
    document.getElementById("verClientes")!
    .addEventListener("click", async ()=> {
      verClien()
    })
    document.getElementById("crearCliente")!
    .addEventListener("click", ()=> {
      crearCli()
    })
    document.getElementById("crearClase")!
    .addEventListener("click", ()=>{
      crearClas()
    } )
    document.getElementById("eliminarClase")!
  .addEventListener("click", ()=>{
    eliminarCla()
  })
    document.getElementById("perfil")!
    .addEventListener("click", async ()=>{
      modificar()
    })

  }
  else{
    app.innerHTML = inicioCliente()
  }
  document.getElementById("cerrar")!
  .addEventListener("click", async () =>{
    cerrarSesion(usuario)
  })
  document.getElementById("verClases")!
    .addEventListener("click" , ()=>{
      verClas()
    })
}

function cerrarSesion(usuario : Usuario |null){
  app.innerHTML = cierreSesion()
  
  document.getElementById("si")!
  .addEventListener("click", () => {
    localStorage.removeItem("usuario")
    principal()
  })
  
  document.getElementById("no")!
  .addEventListener("click", () => {
    inicio(usuario)
  })
}

async function verClien (){
  let usuarios : Usuario[] = []
  usuarios = await traerUsuarios()
  app.innerHTML= verClientes(usuarios)
  document.getElementById("volver")!
  .addEventListener("click", ()=> {
    const data = localStorage.getItem("usuario")
    if (!data) {
      principal()
    return
    }
    inicio(JSON.parse(data) as Usuario)
  } )

}

async function crearCli (){
  app.innerHTML = crearCliente()
  document.getElementById("guardar")!
  .addEventListener("click",async (e)=>{
    e.preventDefault()
  const name = (document.querySelector("input[type='text']") as HTMLInputElement).value
  const email = (document.querySelector("input[type='email']") as HTMLInputElement).value
  const password = (document.querySelector("input[type='password']") as HTMLInputElement).value
  
  try {const nuevo : Omit<Usuario, "id"> = {name, email, password, rol:"cliente"}
  await crearUsuario(nuevo)
  alert ("Usuario creado exitosamente")
  
  const data = localStorage.getItem("usuario")
    if (!data) {
      principal()
    return
    }
    inicio(JSON.parse(data) as Usuario)

  } 
  catch {
    alert("Error al crear usuario")
  }
})
  document.getElementById("volver")!
  .addEventListener("click", ()=>{
    const data = localStorage.getItem("usuario")
    if (!data) {
      principal()
    return
    }
    inicio(JSON.parse(data) as Usuario)
  })

}

async function verClas(){
  let clases : Clase[] = []
  clases = await traerClases()
  const data = localStorage.getItem("usuario")
  if (!data) {
      principal()
    return}
  const conteo: Record<number, number> = {}
  for (const c of clases) {
    conteo[c.id] = await traerCantClase(c.id)
  }
  let inscripcionesUsu : Inscripcion[] = []
  inscripcionesUsu = await inscripUsuario((JSON.parse(data) as Usuario).id)
  app.innerHTML= verClases(clases, JSON.parse(data) as Usuario, conteo, inscripcionesUsu)
  document.getElementById("volver")!
  .addEventListener("click", ()=>{
    const data= localStorage.getItem("usuario")
    if (!data) {
      principal()
    return
    }
    inicio(JSON.parse(data) as Usuario)
  })
  const btnCancelar = document.querySelectorAll<HTMLButtonElement>(".btn-cancelar")
  btnCancelar.forEach((btnC)=>{
    btnC.addEventListener("click", async ()=>{
      const data= localStorage.getItem("usuario")
      let usu: Usuario | null = null
      if (!data) {
      principal()
      return 
    }
    try{
      usu = JSON.parse(data) as Usuario
      await bajarPersona(usu.id, Number(btnC.dataset.id!))
      alert ("Cancelaste tu clase")
      
    }catch{
      alert ("Error al bajarse de la clase")
    }
    verClas()
    })    
  })
  const btnReservar = document.querySelectorAll<HTMLButtonElement>(".btn-sumarse")
  btnReservar.forEach((btn)=> {
  btn.addEventListener("click", async() => {
    const data= localStorage.getItem("usuario")
    let usu: Usuario | null = null
    if (!data) {
      principal()
      return 
    }
    try{
      usu = JSON.parse(data) as Usuario
      const insc : Omit<Inscripcion, "id"> = {id_usuario: usu.id, id_clase: Number(btn.dataset.id!)}
      await sumarPersona(insc)
      alert ("Te sumaste a la clase con exito")
      
    }catch{
      alert ("Error al sumarse a la clase")
    }
    verClas()
  })
})
}

async function eliminarCla(){
  app.innerHTML= eliminarClase()
  document.getElementById("eliminar")!
  .addEventListener("click", async (e)=>{
    e.preventDefault()
    
    try {
      const idClase = Number((document.querySelector("input[type='number']") as HTMLInputElement).value)
      const filasBorradas= await eliminar(idClase)
      if (filasBorradas == 0){
        alert ("No existe una clase con ese ID")
        return
      }
      alert ("Clase eliminada con exito")
    }catch {
      alert("Fallo al eliminar la clase")
    }
  })
  document.getElementById("volver")!
  .addEventListener("click", ()=>{
    const data= localStorage.getItem("usuario")
    if (!data) {
      principal()
    return
    }
    inicio(JSON.parse(data) as Usuario)
  })
}

async function crearClas (){
  app.innerHTML= crearClase()
  document.getElementById("volver")!
  .addEventListener("click", ()=>{
    const data= localStorage.getItem("usuario")
    if (!data) {
      principal()
    return
    }
    inicio(JSON.parse(data) as Usuario)
  })
  document.getElementById("guardar")!
  .addEventListener("click", async (e)=>{
    e.preventDefault()
    const fechaIni = (document.getElementById("inicio") as HTMLInputElement).value
    const otroInicio = new Date (fechaIni)
    const fechaFin = (document.getElementById("fin") as HTMLInputElement).value
    const otroFin = new Date (fechaFin)
    
    
    if (otroInicio.getTime()  >= otroFin.getTime()){
      alert ("Error al crear la clase, revisa las fechas ingresadas")
      return 
    }
    if(otroInicio.getTime() < Date.now()){
      alert ("La clase no puede empezar en el pasado")
      return 
    }
    if (!fechaIni || !fechaFin) {
      alert("Completá ambas fechas")
      return
    } 

    const inicio= otroInicio.toISOString()
    const fin= otroFin.toISOString()

    try {const nuevo : Omit<Clase, "id"> = {inicio, fin}
      console.log("Enviando a Supabase:", nuevo)
      await crearCla(nuevo)
      alert ("Clase creada con exito")
    }
    catch{
      alert ("La clase no pudo ser creada")
    }
  })
}


async function modificar (){
  app.innerHTML= modificarPerfil()
  document.getElementById("name")!
  .addEventListener("click",async ()=>{
    modificarNombre()
  })
  document.getElementById("password")!
  .addEventListener("click", async ()=>{
    modificarContrasena()
  })
}

async function modificarNombre(){
  app.innerHTML= modifNombre()
}

async function modificarContrasena(){
  app.innerHTML = modifContrasena()
}

principal ()
