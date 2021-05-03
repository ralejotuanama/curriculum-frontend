import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Persona } from '../../_model/persona';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PersonaService } from '../../_service/persona.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {


  displayedColumns = ['id', 'nombres', 'apellidos' , 'acciones'];
  dataSource: MatTableDataSource<Persona>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  persona : Persona;
  form : FormGroup;

  constructor( private personaService: PersonaService,
    private snackBar: MatSnackBar,
    public route: ActivatedRoute) { }

    ngOnInit(): void {
      this.personaService.personaCambio.subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  
      this.personaService.mensajeCambio.subscribe(data => {
        this.snackBar.open(data, 'Aviso', {
          duration: 2000,
        });
      });
  
      this.personaService.listar().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  
      
    }



    eliminar(persona: Persona) {
      this.personaService.eliminar(persona.idPersona).pipe(switchMap(() => {
        return this.personaService.listar();
      })).subscribe(data => {
        this.personaService.personaCambio.next(data);
        this.personaService.mensajeCambio.next('Se eliminó');
      });
    }



}
