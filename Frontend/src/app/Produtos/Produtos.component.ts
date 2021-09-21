import { BsModalService } from 'ngx-bootstrap/modal';
import { ProdutosService } from './../_services/produtos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Produtos } from '../_models/Produtos';


@Component({
  selector: 'app-Produtos',
  templateUrl: './Produtos.component.html',
  styleUrls: ['./Produtos.component.css']
})

export class ProdutosComponent implements OnInit {

  pageOfItems?: Array<string>;

  produtosFiltrados!: Produtos[];
  produtos: Produtos[] = []

  produto!: Produtos;
  modoSalvar = 'post';

  registerForm!: FormGroup;
  bodyDeletarProdutos = '';

  _filtrarLista = '';

  ngOnInit() {
    this.validation();
    this.getProdutos();
    this.produtos = Array(150).fill(0).map((x, i) => ({ id: (i + 1), nome: `Item ${i + 1}`, preco: (i + 1)}));
  }

  onChangePage(produtosFiltrados: any) {
    this.produtosFiltrados = produtosFiltrados;
  }

  constructor(
    private produtosService: ProdutosService,
    private modalService: BsModalService,
    private fb: FormBuilder,
  ) { }

  get filtrarLista(): string {
    return this._filtrarLista;
  }

  set filtrarLista(value: string) {
    this._filtrarLista = value;
    this.produtosFiltrados = this.filtrarLista ? this.filtrarProdutos(this.filtrarLista): this.produtos;
  }

  filtrarProdutos(filtrarPor: string): Produtos[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.produtos.filter(
      (produto: { nome: string; }) => produto.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  validation() {
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      preco: ['', Validators.required],
    });
  }

  openModal(templete: any) {
    this.registerForm.reset();
    templete.show();
  }

  novoProduto(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  editarProduto(produto: Produtos, template: any) {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.produto = produto;
    this.registerForm.patchValue(produto);
  }

  excluirEvento(produto: Produtos, template: any) {
    this.openModal(template);
    this.produto = produto;
    this.bodyDeletarProdutos = `Tem certeza que deseja excluir o produto: ${produto.nome}, Código: ${produto.id}`;
  }

  confirmeDelete(template: any) {
    this.produtosService.deleteProduto(this.produto.id).subscribe (
      () => {
        template.hide();
        this.getProdutos();
      }, error => {
        console.log(error)
      }
    );
  }

  salvarAlteracao(template: any) {
    if (this.registerForm.valid){
      if (this.modoSalvar === 'post') {
        this.produto = Object.assign({}, this.registerForm.value);

        this.produtosService.postProdutos(this.produto).subscribe(
          () => {
            template.hide();
            this.getProdutos()
          }, error => {
          console.log(error);
          }
        );
      } else {
        this.produto = Object.assign({id: this.produto.id}, this.registerForm.value);
        this.produtosService.putProdutos(this.produto).subscribe(
          () => {
            template.hide();
            this.getProdutos()
          }, error => {
          console.log(error);
          }
        );
      }
    }
  }

  getProdutos() {
    this.produtosService.getAllProdutos().subscribe(
      (_produtos: Produtos[]) => {
        this.produtos = _produtos;
        this.produtosFiltrados = this.produtos;
        console.log(this.produtos);
      }, error => {
        console.log(error);
      }
    );
  }
}
