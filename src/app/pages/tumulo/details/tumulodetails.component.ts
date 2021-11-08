import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Apollo, gql } from 'apollo-angular';
import { variable } from '@angular/compiler/src/output/output_ast';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tumulodetails',
  templateUrl: './tumulodetails.component.html',
  styleUrls: ['./tumulodetails.component.scss']
})
export class TumuloDetailsComponent implements OnInit {

  tumuloLst: any[] = [];
  loading = true;
  error: any;
  tumuloId: any;
  t: any = {
    concessionario:{
      "id": "",
      "cpf": "",
      "nome": "",
      "cep": "",
      "cidade": "",
      "complemento": "",
      "endereco": "",
      "estado": "",
      "numero": ""
    }
  }

  constructor(private apollo: Apollo, private _location: Location,private route:ActivatedRoute) {}

  ngOnInit() {

    this.tumuloId = this.route.snapshot.paramMap.get('tumuloId');

    var str = `
    {
        tumulo(where: {id: {_eq: "$tumuloId"}}) {
          id
          numero_gaveta
          nome
          cpf
          data_exumacao
          data_obito
          data_sepultamento
          numero_sepultura
          numero_atestado_obito
          data_nascimento
          concessionario {
            id
            cpf
            nome
            cep
            cidade
            complemento
            endereco
            estado
            numero
          }
      }
    }`
    str = str.replace("$tumuloId", this.tumuloId)

  
  

    this.apollo
    .watchQuery({query: gql`${str}`})
    .valueChanges.subscribe((result: any) => {
      
      this.tumuloLst = result.data.tumulo;
      
      if(this.tumuloLst != null && this.tumuloLst != undefined && this.tumuloLst.length > 0){
        this.t =  this.tumuloLst[0];
      }
      console.log(this.t)    
      this.loading = result.loading;
      this.error = result.error;
    });
  }

  cancel() {
    this._location.back();
  }

  Salvar() {
    console.log(this.t);
    var str=`
      mutation tumulo
      {
        update_tumulo(_set: {
          cpf: "$cpf", 
        data_exumacao: "$data_exumacao", 
        data_nascimento: "$data_nascimento", 
        data_sepultamento: "$data_sepultamento", 
        data_obito: "$data_obito", 
        nome: "$nome", 
        numero_atestado_obito: "$numero_atestado_obito", 
        numero_sepultura: "$numero_sepultura", 
        numero_gaveta: "$numero_gaveta"}, 
        where: {id: {_eq: "$tumulo_id"}}) {
          returning {
            id
          }
        }
      }
          
      
    `;
   str = str.replace("$cpf",this.t.cpf);
   str = str.replace("$data_exumacao",this.t.data_exumacao);
   str = str.replace("$data_nascimento",this.t.data_nascimento);
   str = str.replace("$data_sepultamento",this.t.data_sepultamento);
   str = str.replace("$data_obito",this.t.cpf.data_obito);
   str = str.replace("$nome",this.t.nome);
   str = str.replace("$numero_atestado_obito",this.t.numero_atestado_obito);
   str = str.replace("$numero_sepultura",this.t.numero_sepultura);
   str = str.replace("$numero_gaveta",this.t.numero_gaveta);
   str = str.replace("$tumulo_id",this.t.tumulo_id);

   this.apollo.mutate({
    mutation:  gql`${str}`
  }).subscribe(); 
  }



}
