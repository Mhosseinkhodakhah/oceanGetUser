export interface tokenizationInterface{
    id : string | String | undefined,
    email : string | String | undefined,
    fullName : string | String | undefined,
    country : string | String | undefined,
    language :  string | String | undefined,
}


export interface user {
    _id : string,
    fullName :  string,
    
    userName :  string,
    
    email :  string,
    
    country :  string,

    school : string,

    password :  string,
    language:string,
    resetPasswordToken: string,
    points : any,
    getLicense : boolean
}


export interface pointDB{
    points : number,
    pointsLogs : {}[],
    user : any
}