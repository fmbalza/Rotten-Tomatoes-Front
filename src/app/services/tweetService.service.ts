import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TweetService {
  constructor(private storage: Storage, private http:HttpClient ) {this.init();}

  async init() {
    await this.storage.create();
  }


  async saveIdMovie(id: string): Promise<void> {
    try{
      await this.storage.set('id', id);
      console.log("id de la movie fue gardado")
    }catch(error){
      console.log('Error al guardar el id:', error);
    throw error;
    }
  }

  async getIdMovie(): Promise<string> {
    try {
      const idMovie = await this.storage.get('id');
      if (!idMovie) {
        throw new Error('No se encontró ningún id');
      }
      return idMovie;
    } catch (error) {
      console.log('Error al obtener el id:', error);
      throw error;
    }
  }

  async deleteIdMovie(): Promise<void> {
    try {
      await this.storage.remove('id');
      console.log('ID de la movie eliminado');
    } catch (error) {
      console.log('Error al eliminar el ID de la movie:', error);
      throw error;
    }
  }




}
