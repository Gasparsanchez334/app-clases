import { supabase } from "../supabaseClient";
import type { Inscripcion } from "../types/Inscripcion";
import type { Usuario } from "../types/usuario";


export async function sumarPersona (inscrip: Omit<Inscripcion, "id">){
    const { error } = await supabase 
    .from("Inscripciones")
    .insert([inscrip])

  if (error) {
    console.log("ERROR:", error)
    throw error
  }
}

export async function traerCantClase (idClase : number) : Promise<number>{
  const { count, error } = await supabase
    .from("Inscripciones")
    .select("*", { count: "exact", head:true })
    .eq("id_clase", idClase)

    if (error) throw error
  
    return count  || 0
}

export async function inscripUsuario(id_usuario: number)  :Promise<Inscripcion[]>{
  const { data, error } = await supabase
      .from("Inscripciones")
      .select("*")
      .eq("id_usuario", id_usuario)
  
      if (error) {
          console.log("error")
          return []
      }
      return data as Inscripcion[]
}

export async function bajarPersona(id_usuario: number, idClase: number){
  const { error } = await supabase
  .from("Inscripciones")
  .delete()
  .eq("id_usuario",id_usuario)
  .eq("id_clase",idClase)  
  
  if (error) {
    console.log("error")
    throw error
  }
}


