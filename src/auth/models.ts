export type TokenUser = {
    id : string
    email : string
}

export type UserLoginForm = {
    email : string
    password : string
}

export type UserRegisterForm = {
    email : string
    password : string
    confirmPassword : string
}