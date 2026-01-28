export function cierreSesion (){
    return `
        <div id="modal" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 w-80 text-center space-y-4">
        
        <h2 class="text-xl font-bold text-gray-800">
          ¿Estás seguro?
        </h2>

        <p class="text-gray-600">
          ¿Querés cerrar la sesión?
        </p>

        <div class="flex justify-center gap-4 pt-4">
          <button
            id="no"
            class="px-4 py-2 rounded bg-black hover:bg-gray-300">
            No
          </button>

          <button
            id="si"
            class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">
            Sí
          </button>
        </div>

      </div>
    </div>
    `
}