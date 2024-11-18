import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {petInterface} from '../interface/pet-interface'

@Injectable({
  providedIn: 'root'
})
export class ApiPetService {

  constructor(
    private http:HttpClient
  ) { }

    obtenerPets(){
      return this.http.get<petInterface>('https://huachitos.cl/api/animales');
      }
      
    }