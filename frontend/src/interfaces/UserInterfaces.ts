export interface UserInterface {
  name?:string
  email?:string
}

export interface UserRegisterInterface {
  name:string
  email:string
  password:string
  confirm_password:string
}

export interface UserLoginInterface {
  email:string
  password:string
}

export interface RegisterResponseIterface {
    user: UserInterface
    token: string
}