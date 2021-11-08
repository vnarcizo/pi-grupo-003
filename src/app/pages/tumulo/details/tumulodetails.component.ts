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

}
