import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class searchService {

  constructor(private storage: Storage) {   this.init(); }
  
  async init() {
    await this.storage.create();
  }
  
  async getMovieId(): Promise<string> {
    try {
      const tokenAuth = await this.storage.get('id');
      if (!tokenAuth) {
        throw new Error('No se encontró ningún ID');
      }
      return tokenAuth;
    } catch (error) {
      console.log('Error al obtener el ID:', error);
      throw error;
    }
  }

  async saveMovieId(id: string): Promise<void> {
    try {
      await this.storage.set('id', id);
      console.log('UserID guardado correctamente');
    } catch (error) {
      console.log('Error al guardar el userID:', error);
      throw error;
    }
  }

  async deleteToken(): Promise<void> {
    try {
      await this.storage.remove('token');
      console.log('Token eliminado correctamente');
    } catch (error) {
      console.log('Error al eliminar el token:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.deleteToken();
      console.log('Sesión cerrada correctamente');
    } catch (error) {
      console.log('Error al cerrar sesión:', error);
      throw error;
    }
  }
}
