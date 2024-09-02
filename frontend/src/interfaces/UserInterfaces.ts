export interface UserInterface {
  name?:string
  email?:string
}

export interface UserRegisterInterface {
  name:string
  email:string
  password:string
  password_confirmation:string
}

export interface UserLoginInterface {
  email:string
  password:string
}

export interface RegisterResponseIterface {
    user: UserInterface
    token: string
}