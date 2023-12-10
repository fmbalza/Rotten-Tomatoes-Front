import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storage: Storage) {   this.init(); }
  
  async init() {
    await this.storage.create();
  }
  
  async getToken(): Promise<string> {
    try {
      const tokenAuth = await this.storage.get('token');
      if (!tokenAuth) {
        throw new Error('No se encontró ningún token');
      }
      return tokenAuth;
    } catch (error) {
      console.log('Error al obtener el token:', error);
      throw error;
    }
  }

  async saveToken(token: string): Promise<void> {
    try {
      await this.storage.set('token', token);
      console.log('Token guardado correctamente');
    } catch (error) {
      console.log('Error al guardar el token:', error);
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
