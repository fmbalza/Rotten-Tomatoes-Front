export interface comment{
   
    movieId:string;
    userId:string;
    text:string;
  }


  export interface createComment{
   
    apiId:string;
    userId:string;
    text:string;
  }

  export interface createrating{
   
    apiId:string;
    userId:string;
    rating:number ;
  }