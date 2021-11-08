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

  concessionario = {
    id: "",
    cpf: "",
    nome: "",
    cep: "",
    cidade: "",
    complemento: "",
    endereco: "",
    estado: "",
    numero: ""
  };

  t: any = {
    concessionario:this.concessionario
  };

  

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

        if(this.t.concessionario == null){
          this.t.concessionario = this.concessionario;
        }
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
    
    if(this.t.concessionario != null && this.t.concessionario.id != ''){

    console.log("this.t.concessionario",this.t.concessionario)
      var strC=`
      mutation tumulo{
        update_concessionario(_set: {
          cep: "$cep", 
          cidade: "$cidade", 
          complemento: "$complemento", 
          cpf: "$cpf", 
          endereco: "$endereco", 
          estado: "$estado", 
          nome: "$nome", 
          numero: "$numero"}, 
        where: {id: {_eq: "$concessionario_id"}}) {
          returning {
            id
          }
        }
      }`

      strC = strC.replace("$cep",this.t.concessionario.cep);
      strC = strC.replace("$cpf",this.t.concessionario.cpf);
      strC = strC.replace("$cidade",this.t.concessionario.cidade);
      strC = strC.replace("$complemento",this.t.concessionario.complemento);
      strC = strC.replace("$endereco",this.t.concessionario.endereco);
      strC = strC.replace("$estado",this.t.concessionario.estado);
      strC = strC.replace("$nome",this.t.concessionario.nome);
      strC = strC.replace("$numero",this.t.concessionario.numero);
      strC = strC.replace("$concessionario_id",this.t.concessionario.id);

      console.log("strC",strC)

      this.apollo.mutate({
        mutation:  gql`${strC}`
      }).subscribe(); 

      this.updateTumulo();

    }else{
      debugger;
      var strConc=`
      mutation MyMutation {
        insert_concessionario(objects: {
          cep: "$cep", 
          cidade: "$cidade", 
          complemento: "$complemento", 
          cpf: "$cpf", 
          endereco: "$endereco", 
          estado: "$estado", 
          nome: "$nome", 
          numero: "$numero"}) {
          returning {
            id
          }
        }
      }`;

      strConc = strConc.replace("$cep",this.t.concessionario.cep);
      strConc = strConc.replace("$cidade",this.t.concessionario.cidade);
      strConc = strConc.replace("$complemento",this.t.concessionario.complemento);
      strConc = strConc.replace("$endereco",this.t.concessionario.endereco);
      strConc = strConc.replace("$estado",this.t.concessionario.estado);
      strConc = strConc.replace("$nome",this.t.concessionario.nome);
      strConc = strConc.replace("$numero",this.t.concessionario.numero);
      strConc = strConc.replace("$concessionario_id",this.t.concessionario.id);


      console.log("strC",strC)

      this.apollo.mutate({
        mutation:  gql`${strConc}`
      }).subscribe((data : any) => {
        console.log('got data', data);

       this.t.concessionario.id = data.data.insert_concessionario.returning[0].id;
       console.log('got this.t.concessionario', this.t.concessionario);

      this.updateTumulo();


      },(error) => {
        console.log('there was an error sending the query', error);
      }); 
    }


  }

  updateTumulo(){

        var str=`
          mutation tumulo{
            update_tumulo(_set: {
              cpf: "$cpf", 
            data_exumacao: "$data_exumacao", 
            data_nascimento: "$data_nascimento", 
            data_sepultamento: "$data_sepultamento", 
            data_obito: "$data_obito", 
            nome: "$nome", 
            concessionario_id: "$concessionario_id",
            numero_atestado_obito: "$numero_atestado_obito", 
            numero_sepultura: "$numero_sepultura", 
            numero_gaveta: "$numero_gaveta"}, 
            where: {id: {_eq: "$tumulo_id"}}) {
              returning {
                id
              }
            }
          }`;

      var dateStr = new Date().getFullYear() + "-"+(new Date().getMonth()+1)+"-"+new Date().getDate();

      str = str.replace("$cpf",this.t.cpf);
      

      if(this.t.data_nascimento == null ||this.t.data_nascimento == undefined)
        str = str.replace("\"$data_nascimento\"","null");
      else
        str = str.replace("$data_nascimento",this.t.data_nascimento);


      if(this.t.data_sepultamento == null ||this.t.data_sepultamento == undefined)
        str = str.replace("$data_sepultamento",dateStr);
      else
          str = str.replace("$data_sepultamento",this.t.data_sepultamento);

      
      if(this.t.data_obito == null ||this.t.data_obito == undefined)
          str = str.replace("$data_obito",dateStr);
      else
          str = str.replace("$data_obito",this.t.data_obito);

      if(this.t.data_exumacao == null ||this.t.data_exumacao == undefined)
          str = str.replace("$data_exumacao",dateStr);
      else
            str = str.replace("$data_exumacao",this.t.data_exumacao);
      
      str = str.replace("$nome",this.t.nome);
      str = str.replace("$numero_atestado_obito",this.t.numero_atestado_obito);
      str = str.replace("$numero_sepultura",this.t.numero_sepultura);
      str = str.replace("$numero_gaveta",this.t.numero_gaveta);
      str = str.replace("$tumulo_id",this.t.id);
      str = str.replace("$concessionario_id",this.t.concessionario.id);

      this.apollo.mutate({
        mutation:  gql`${str}`
      }).subscribe(); 
  }



}
