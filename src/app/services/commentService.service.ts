import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {

constructor(private storage: Storage, private http:HttpClient ) {this.init();}

  async init() {
    await this.storage.create();
  }
  createComment(userId: string, content: string) {
    // Aquí puedes agregar la lógica para crear el tweet utilizando el userId y el contenido del tweet.
    // Puedes hacer una solicitud HTTP al backend o guardar el tweet en una base de datos local, por ejemplo.
    console.log('Creando tweet:', userId, content);
  }
  
  private selectedTweetId: string | null = null;

  async saveIdComment(_id: string): Promise<void> {
    try{
      await this.storage.set('_id', _id);
      console.log("id de tweet fue guardado")
    }catch(error){
      console.log('Error al guardar el id:', error);
    throw error;
    }
  }

  async getIdComment(): Promise<string> {
    try {
      const idTweet = await this.storage.get('_id');
      if (!idTweet) {
        throw new Error('No se encontró ningún _id');
      }
      return idTweet;
    } catch (error) {
      console.log('Error al obtener el _id:', error);
      throw error;
    }
  }

  async deleteIdComment(): Promise<void> {
    try {
      await this.storage.remove('_id');
      console.log('ID del tweet eliminado');
    } catch (error) {
      console.log('Error al eliminar el ID del tweet:', error);
      throw error;
    }
  }

}
