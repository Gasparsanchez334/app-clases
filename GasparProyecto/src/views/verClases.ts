import type { Clase } from "../types/clase"
import type { Inscripcion } from "../types/Inscripcion"
import type { Usuario } from "../types/usuario"

export function verClases(clases : Clase [], usuario: Usuario | null, conteo: Record<number, number>, vectorInscrip: Inscripcion[]){
    return `
        <div class="w-screen h-screen bg-black text-white p-8">
      
      
        <!-- Botón volver -->
      <button
        id="volver"
        class="absolute top-6 left-6 flex items-center gap-2 text-gray-300 hover:text-white transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span class="text-sm">Volver</span>
      </button>


      <h1 class="text-4xl font-bold text-center mb-10">
        Clases
      </h1>

      <ul class="max-w-3xl mx-auto space-y-4">
        ${
            clases.length > 0
            ?clases.map(c =>{ 
              const cant = conteo[c.id] || 0
              return ` 
                <li class="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex justify-between items-center">
                <div class="flex flex-col">
                  <span class="text-sm text-gray-400">Clase ${c.id}</span>
                  <span class="text-sm text-gray-400">Inicio</span>
                  <span>${new Date(c.inicio).toLocaleString("es-AR", {
                  hour12: false,
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                  })}</span>
                </div>

                <div class="flex flex-col">
                  <span class="text-sm text-gray-400">Fin</span>
                  <span>${new Date(c.fin).toLocaleString("es-AR", {
                    hour12: false,
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                  </span>
                </div>
                ${usuario?.rol == "cliente"
                  ?`<div class="flex flex-col">
                    ${vectorInscrip.some(v=> v.id_clase == c.id)  
                      ?`<button class="btn-cancelar" data-id="${c.id}">Bajarse</button>`
                      :cant < 5 
                        ?`<button class="btn-sumarse" data-id="${c.id}">Sumarse</button>`
                        : `<span class="text-sm text-gray-400">Clase llena</span>`
                    }
                  </div>`
                  :`<div class="flex flex-col">
                    <span class="text-sm text-gray-400">Personas anotadas ${cant}</span>
                  </div>`
                }
              </li>
            `
        }).join("")
            : `<p class="text-center text-gray-400">No hay clases disponibles</p>`    
        } 
    </div>
    `
}