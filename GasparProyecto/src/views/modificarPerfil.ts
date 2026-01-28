export function modificarPerfil() {
  return `
    <div class="w-screen h-screen bg-black flex items-center justify-center text-white">
      
      <form class="bg-zinc-900 p-8 rounded-xl w-full max-w-sm space-y-5">
        
        <h1 class="text-3xl font-bold text-center">
          Modificar Perfil
        </h1>

        <!-- Nombre -->
        <div>
          <label class="block text-sm text-gray-400 mb-1">Nombre</label>
          <button
            id="name"
            type="text"
            placeholder="Nombre completo"
            class="w-full px-4 py-2 rounded bg-black border border-zinc-700 focus:outline-none focus:border-white"
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm text-gray-400 mb-1">Modificar contraseña</label>
          <button
            id="password"
            type="password"
            placeholder="********"
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
            id="guardar"
            class="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition"
          >
            Guardar
          </button>
        </div>

      </form>

    </div>
  `
}