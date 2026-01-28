import { supabase } from "../supabaseClient"
import type { Usuario } from "../types/usuario"


export async function traerUsuarios(): Promise<Usuario[]> {
  const { data, error } = await supabase
    .from("Usuarios")
    .select("*")
    .neq("rol", "admin")

  if (error) {
    console.error(error)
    return []
  }

  return data as Usuario[]
}

export async function crearUsuario(usuario: Omit<Usuario, "id">) {
  const { error } = await supabase 
    .from("Usuarios")
    .insert([usuario])
    .select()

  if (error) {
    console.log("ERROR:", error)
    throw error
  }
}

export async function buscarEmail(email: string): Promise<Usuario | null> {
  const { data, error } = await supabase
  .from("Usuarios")
  .select("*")
  .eq("email", email)
  .single()

  if (error){
    if (error.code == "23505") {
      throw new Error("EMAIL_DUPLICADO")
    }
    return null
  }

  return data as Usuario

}

export async function contrasena(usuario: Usuario | null, password: string): Promise <string | null>{
  
  if (!usuario) {
      return "Usuario no existe"
    }

    if (usuario.password != password) {
      return "Contraseña incorrecta"
    }
    return "Login correcto"
    
} 
