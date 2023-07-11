import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  sidebarActive = false;
  nomeCompleto: string;
  cadastroCompleto: boolean;
  dadosConfiguracao: boolean;

  tipoEmpresa: string;
    nomeEmpresa: string;
    cnpj: string;
    cep: string;
    endereco: string;
    bairro: string;
    estado: string;
    cidade: string;
    complemento: string;
    celular: string;
    nomeAdministrador: string;
    cpf: string;
    email: string;
    configuracaoCompleta: boolean;

  constructor(private router: Router) { }
  ngOnInit(): void {
  const dadosCadastro = localStorage.getItem('dadosCadastro');
  if (dadosCadastro) {
    const { nomeCompleto, cadastroCompleto } = JSON.parse(dadosCadastro);
    this.nomeCompleto = nomeCompleto;
    this.cadastroCompleto = cadastroCompleto;
  } else {
    this.router.navigate(['/cadastro']);
  }

  const dadosConfiguracao = localStorage.getItem('dadosConfiguracao');
  if (dadosConfiguracao) {
    // tslint:disable-next-line:max-line-length
    const {tipoEmpresa, nomeEmpresa, cnpj, cep, endereco, bairro, estado, cidade, complemento, celular, nomeAdministrador, cpf, email, configuracaoCompleta
    } = JSON.parse(dadosConfiguracao);

    this.tipoEmpresa = tipoEmpresa;
    this.nomeEmpresa = nomeEmpresa;
    this.cnpj = cnpj;
    this.cep = cep;
    this.endereco = endereco;
    this.bairro = bairro;
    this.estado = estado;
    this.cidade = cidade;
    this.complemento = complemento;
    this.celular = celular;
    this.nomeAdministrador = nomeAdministrador;
    this.cpf = cpf;
    this.email = email;
    this.configuracaoCompleta = configuracaoCompleta;
  }
 }

 iniciarConfiguracao() {
  this.router.navigate(['/configuracao']);
}

toggleSidebar(): void {
  this.sidebarActive = !this.sidebarActive;
}

editar(){
  this.router.navigate(['/configuracao']);
}


}
