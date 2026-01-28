import { supabase } from "../supabaseClient";
import type { Clase } from "../types/clase";




export async function traerClases(): Promise<Clase[]>{
    const now = new Date().toISOString()
    
    const { data, error } = await supabase
    .from("Clases")
    .select("*")
    .gt("inicio" , now)

    if (error) {
        console.log("error")
        return []
    }
    return data as Clase[]
}

export async function eliminar(id_clase:number){
    const { data, error } = await supabase
    .from("Clases")
    .delete()
    .eq("id", id_clase)
    .select()

    if (error){
        console.log("error")
        throw error
    }
    return data.length
}

export async function crearCla(clase : Omit<Clase, "id">){
    const { error } = await supabase
    .from("Clases")
    .insert([clase])
    
    if (error){
        console.log("error", error)
        throw error
    }


}

