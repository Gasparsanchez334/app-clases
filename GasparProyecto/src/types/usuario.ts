export interface Usuario {
  id: number
  email: string
  password: string
  name : string
  rol : "cliente" | "admin"
}