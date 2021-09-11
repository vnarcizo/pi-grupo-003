import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-tumulo',
  templateUrl: './tumulo.component.html',
  styleUrls: ['./tumulo.component.scss']
})
export class TumuloComponent implements OnInit {
  tumuloLst: any[] = [];
  loading = true;
  error: any;
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
    .watchQuery({
      query: gql`
        {
          Tumulo {
            nome
            localidade
            id
          }
        }
      `,
    })
    .valueChanges.subscribe((result: any) => {
      
      this.tumuloLst = result.data.Tumulo;
      console.log(this.tumuloLst)
      
      this.loading = result.loading;
      this.error = result.error;
    });
  }

}
