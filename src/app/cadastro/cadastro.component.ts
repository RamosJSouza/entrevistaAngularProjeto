import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  nomeCompleto: string;
  email: string;
  senha: string;
  confirmacaoSenha: string;
  aceiteContrato: boolean;

  constructor(private router: Router) { }

  // tslint:disable-next-line:typedef
  criarConta() {
    if (this.senha !== this.confirmacaoSenha) {
      alert('As senhas não conferem.');
      return;
    }

    // Validar o e-mail com regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      alert('O e-mail é inválido.');
      return;
    }

    // Armazenar os dados no localStorage
    const dadosCadastro = {
      nomeCompleto: this.nomeCompleto,
      email: this.email,
      senha: this.senha,
      cadastroCompleto: false
    };
    localStorage.setItem('dadosCadastro', JSON.stringify(dadosCadastro));

    this.router.navigate(['/dashboard']);
  }
}
