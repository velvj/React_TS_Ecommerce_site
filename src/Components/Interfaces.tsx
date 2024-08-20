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

//products interface
 interface Iproduct {
    productName: string;
    category: string;
    price: number;
    qty: number;
    imageFileName?: string;
    createdAt?: number;
 }

 interface IproductState{
    products:Iproduct[]
 }

export type{Iusers,IuserState,Iproduct,IproductState};