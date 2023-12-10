export interface newUser{

    email: string,
    username: string, 
    password: string;
    name: string;
    lastname: string;



}

export interface existinguser{
    username: string;
    password: string;

}
export interface perfil{

    username: string;

    userId: string;

}