export interface CreateUserInput {
  name: string
  email: string
  image: string
}

export interface User {
  id: number
  name: string
  email: string
  image: string
  createdAt: Date
}
