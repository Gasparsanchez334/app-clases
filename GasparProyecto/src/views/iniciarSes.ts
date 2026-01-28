export function iniciarSesion(){
    return`
    <form class="min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
      <h1 class="text-2xl font-bold text-black">Iniciar sesión</h1>

      <input type="email" placeholder="Correo" class="border px-4 py-2 rounded w-64 text-black" />
      <input type="password" placeholder="Contraseña" class="border px-4 py-2 rounded w-64 text-black" />

      <button id=entrar class="bg-black text-white px-6 py-2 rounded">
        Entrar
      </button>
    </form>
    `
}