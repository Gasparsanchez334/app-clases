import type { Usuario } from "../../types/usuario";

export function verClientes(usuarios: Usuario[] | null){
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
        Clientes
      </h1>

      <ul class="max-w-3xl mx-auto space-y-4">
        ${
          usuarios && usuarios.length > 0
            ? usuarios.map(u => `
              
                <li class="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex justify-between items-center">
                <div class="flex flex-col">
                  <span class="text-sm text-gray-400">ID</span>
                  <span class="font-medium">${u.id}</span>
                </div>

                <div class="flex flex-col">
                  <span class="text-sm text-gray-400">Email</span>
                  <span>${u.email}</span>
                </div>

                <div class="flex flex-col">
                  <span class="text-sm text-gray-400">Nombre</span>
                  <span>${u.name}</span>
                </div>
              </li>
            `).join("")
            : `<p class="text-center text-gray-400">No hay usuarios cargados</p>`
        }
      </ul>

    </div>
    `
}