 interface Iusers {
    firstName:string ;
    lastName:string ;
    email:string ;
    Password:string; 
    confirmPassword:string; 
    phone:number;
}

interface IuserState{
    users:Iusers[]
}

export type{Iusers,IuserState};