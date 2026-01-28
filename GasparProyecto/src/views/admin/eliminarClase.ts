export function eliminarClase(){
    return `
    <div class="w-screen h-screen bg-black flex items-center justify-center text-white">
      
      <form class="bg-zinc-900 p-8 rounded-xl w-full max-w-sm space-y-5">
        
        <h1 class="text-3xl font-bold text-center">
          Eliminar clase
        </h1>

        <!-- id -->
        <div>
          <label class="block text-sm text-gray-400 mb-1">Id clase a eliminar</label>
          <input
            id="idClase"
            type="number"
            placeholder="Ejemplo: 2"
            class="w-full px-4 py-2 rounded bg-black border border-zinc-700 focus:outline-none focus:border-white"
          />
        </div>

        <!-- Botones -->
        <div class="flex justify-between pt-4">
          <button
            type="button"
            id="volver"
            class="text-gray-400 hover:text-white"
          >
            Volver
          </button>

          <button
            type="submit"
            id="eliminar"
            class="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition"
          >
            Eliminar
          </button>
        </div>

      </form>

    </div>
  `
}