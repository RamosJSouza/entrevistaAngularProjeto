import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Inputmask from 'inputmask';

@Component({
  selector: 'app-formulario-configuracao',
  templateUrl: './formulario-configuracao.component.html',
  styleUrls: ['./formulario-configuracao.component.css']
})
export class FormularioConfiguracaoComponent {
  formulario: FormGroup;
  error: string;
  dadosConfiguracao: any;


  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) { }

 ngOnInit(): void {
  this.dadosConfiguracao = JSON.parse(localStorage.getItem('dadosConfiguracao')) || {};

    // tslint:disable-next-line:align
    this.formulario = this.formBuilder.group({
      tipoEmpresa: [this.dadosConfiguracao.tipoEmpresa || '', Validators.required],
      nomeEmpresa: [this.dadosConfiguracao.nomeEmpresa || '', Validators.required],
      cnpj: [this.dadosConfiguracao.cnpj || '', [Validators.required, this.validarCNPJ]],
      cep: [this.dadosConfiguracao.cep || ''],
      endereco: [this.dadosConfiguracao.endereco || ''],
      bairro: [this.dadosConfiguracao.bairro || ''],
      estado: [this.dadosConfiguracao.estado || ''],
      cidade: [this.dadosConfiguracao.cidade || ''],
      complemento: [this.dadosConfiguracao.complemento || ''],
      celular: [this.dadosConfiguracao.celular || ''],
      nomeAdministrador: [this.dadosConfiguracao.nomeAdministrador || ''],
      cpf: [this.dadosConfiguracao.cpf || '', [Validators.required, this.validarCPF]],
      email: [this.dadosConfiguracao.email || '', [Validators.required, Validators.email]]
    });
  }

  ngAfterViewInit(): void {
    Inputmask().mask(document.getElementById('cnpj'));
    Inputmask().mask(document.getElementById('celular'));
    Inputmask().mask(document.getElementById('cpf'));
  }


  validarCNPJ(control) {
    const cnpj = control.value;

    if (cnpj) {
      const validacao = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/.test(cnpj);
      return validacao ? null : { cnpjInvalido: true };
    }

    return null;
  }

  validarCPF(control) {
    const cpf = control.value;

    if (cpf) {
      const validacao = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(cpf);
      return validacao ? null : { cpfInvalido: true };
    }

    return null;
  }

  buscarCEP(): void {
    const cep = this.formulario.get('cep').value;

    this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe((data: any) => {
      this.formulario.patchValue({
        endereco: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf
      });
      this.error = ''; // Limpa o erro caso a busca seja bem-sucedida
    },
    (error) => {
      this.error = 'CEP não encontrado. Verifique o CEP digitado.'; // Define a mensagem de erro
    }
  );
}

  salvarFormulario(): void {
    if (this.formulario.valid) {
      // Armazenar os dados no localStorage
    const dadosCadastroConfiguracao = {
      tipoEmpresa: this.formulario.value.tipoEmpresa,
      nomeEmpresa: this.formulario.value.nomeEmpresa,
      cnpj: this.formulario.value.cnpj,
      cep: this.formulario.value.cep,
      endereco: this.formulario.value.endereco,
      bairro: this.formulario.value.bairro,
      estado: this.formulario.value.estado,
      cidade: this.formulario.value.cidade,
      complemento: this.formulario.value.complemento,
      celular: this.formulario.value.celular,
      nomeAdministrador: this.formulario.value.nomeAdministrador,
      cpf: this.formulario.value.cpf,
      email: this.formulario.value.email,
      configuracaoCompleta: true
    };
    localStorage.setItem('dadosConfiguracao', JSON.stringify(dadosCadastroConfiguracao));

    this.router.navigate(['/dashboard']);
    } else {
      // Exiba mensagens de erro ou realize outras ações para formulário inválido
      console.log("algo mais");
    }
  }


  cancelarConfiguracao() {
    this.router.navigate(['/dashboard']);
  }


}
