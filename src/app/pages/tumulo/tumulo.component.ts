import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import {Location} from '@angular/common';
import { windowCount } from 'rxjs';
import { TumuloDetailsComponent } from './details/tumulodetails.component';

@Component({
  selector: 'app-tumulo',
  templateUrl: './tumulo.component.html',
  styleUrls: ['./tumulo.component.scss']
})
export class TumuloComponent implements OnInit {
  tumuloLst: any[] = [];
  loading = true;
  error: any;
  filter = "";

  constructor(private apollo: Apollo, private _location: Location) {}

  ngOnInit() {
    this.apollo
    .watchQuery({
      query: gql`
        {
          tumulo(limit: 10) {
            id
            numero_gaveta
            nome
            cpf
            rg
            data_exumacao
            data_obito
            data_sepultamento
            numero_sepultura
            numero_atestado_obito
            concessionario {
              id
              cpf
              nome
            }
          }
        }
      `,
    })
    .valueChanges.subscribe((result: any) => {
      
      this.tumuloLst = result.data.tumulo;
      
      
      this.loading = result.loading;
      this.error = result.error;
    });
  }

  details(tumuloId) {
    window.location.href = "/tumulo/details/"+tumuloId;
  }

  novo() {
    window.location.href = "/tumulo/details/new";
  }

  buscar() {
    var str=`
    {
      tumulo(where: {_or: [
        {cpf: {_ilike: "%filter%"}},
        {nome: {_ilike: "%filter%"}},
        {rg: {_ilike: "%filter%"}},
        {numero_sepultura: {_ilike: "%filter%"}},
        {numero_atestado_obito: {_ilike: "%filter%"}},
        {concessionario: {nome: {_ilike: "%filter%"}}},
        {concessionario: {cpf: {_ilike: "%filter%"}}},
        {concessionario: {rg: {_ilike: "%filter%"}}}

      ]},limit: 10) {
        id
        numero_gaveta
        nome
        cpf
        rg
        data_exumacao
        data_obito
        data_sepultamento
        numero_sepultura
        numero_atestado_obito
        concessionario {
          id
          cpf
          nome
        }
      }
    }
  `;

    str = str.replace(/filter/g,this.filter);

    
    this.apollo
    .watchQuery({
      query: gql`${str}`
    })
    .valueChanges.subscribe((result: any) => {
      
      this.tumuloLst = result.data.tumulo;
      
      
      this.loading = result.loading;
      this.error = result.error;
    });
  }
}
