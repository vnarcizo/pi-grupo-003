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
      console.log(this.tumuloLst)
      
      this.loading = result.loading;
      this.error = result.error;
    });
  }

  details(tumuloId) {
    window.location.href = "/tumulo/details/"+tumuloId;
  }
}
