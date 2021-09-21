import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produtos } from '../_models/Produtos';

@Injectable({
  providedIn: 'root'
})

export class ProdutosService {
  baseUrl = 'http://localhost:5000/api/Produtos';

  constructor(private http: HttpClient) { }

  getAllProdutos(): Observable<Produtos[]> {
    return this.http.get<Produtos[]>(this.baseUrl);
  }

  getEventoByTema(nome: string): Observable<Produtos[]> {
    return this.http.get<Produtos[]>(`${this.baseUrl}/getByNome/${nome}`);
  }

  getProdutoById(id: number): Observable<Produtos> {
    return this.http.get<Produtos>(`${this.baseUrl}/${id}`);
  }
  //Cria evento
  postProdutos(evento: Produtos) {
    return this.http.post(this.baseUrl, evento)
  }
  //Atualiza evento
  putProdutos(produto: Produtos) {
    return this.http.put(`${this.baseUrl}/${produto.id}` , produto)
  }
  //Deleta o Produtos
  deleteProduto(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
