export interface movieInterface{
    id: string;
    original_title: string;
    poster_path: string;
    video: boolean;
    vote_average: string;
    backdrop_path:string;

}

export interface movieTopRated{
    id: string;
    original_title: string;
    poster_path: string;
    video: boolean;
    vote_average: string;
    backdrop_path:string;

}
export interface series{
    id: string;
    original_title: string;
    poster_path: string;
    video: boolean;
    vote_average: string;
    backdrop_path:string;

}
export interface movieCommedy{
    id: string;
    original_title: string;
    poster_path: string;
    video: boolean;
    vote_average: string;
    backdrop_path:string;

}
export interface movieAction{
    id: string;
    original_title: string;
    poster_path: string;
    video: boolean;
    vote_average: string;
    backdrop_path:string;

}
export interface movieLastest{
    id: string;
    original_title: string;
    poster_path: string;
    video: boolean;
    vote_average: string;
    backdrop_path:string;

}

export interface movieDetail{
    id: string;
    original_title: string;
    poster_path: string;
    video: boolean;
    vote_average: string;
    backdrop_path:string;
    overview:string;
    popularity: string;
    release_date: string;
    original_language: string;
}


export interface Genre {
    id: number;
    name: string;
  }


  export interface movies{
 
    
    title: string;
    id: string
}