export function inicioCliente(){
   return `
  <div class="w-screen h-screen bg-black flex">
    
    <!-- Menú lateral -->
    <aside class=" bg-black text-white p-6 flex flex-col gap-4">
      <h2 class="text-xl font-bold mb-6">Panel</h2>

      <button id="verClases" class="text-left hover:bg-gray-800 p-2 rounded">
        Ver clases
      </button>

      <button id="perfil" class="text-left hover:bg-gray-800 p-2 rounded">
        Modificar perfil
      </button>

      <button id="cerrar" class="text-left hover:bg-gray-800 p-2 rounded">
        Cerrar Sesion
      </button>

    </aside>

    <!-- Contenido -->
    <main class="flex-1 p-10">
      <h1 class="text-3xl font-bold mb-4">
        Bienvenido a tu panel
      </h1>

      <p class="text-gray-600">
        Seleccioná una opción del menú
      </p>

      <div id="contenidoPanel" class="mt-8"></div>
    </main>

  </div>
  `
}