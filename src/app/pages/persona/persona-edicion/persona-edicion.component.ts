import { Component, OnInit } from '@angular/core';
import { Persona } from '../../../_model/persona';
import { FormGroup, FormControl } from '@angular/forms';
import { PersonaService } from '../../../_service/persona.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-persona-edicion',
  templateUrl: './persona-edicion.component.html',
  styleUrls: ['./persona-edicion.component.css']
})
export class PersonaEdicionComponent implements OnInit {


  id: number;
  persona: Persona;
  form: FormGroup;
  edicion: boolean = false;

  
  constructor(
    private personaService: PersonaService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {

    this.persona = new Persona();

    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombres': new FormControl(''),
      'apellidos' : new FormControl(''),
      'dni': new FormControl(''),
      'direccion' : new FormControl(''),
      'telefono': new FormControl(''),
      'celular' : new FormControl(''),
      'nombrescontacto' : new FormControl(''),
      'apellidoscontacto' : new FormControl(''),
      'telefonocontacto' : new FormControl(''),
      'celularcontacto' : new FormControl(''),

    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      this.personaService.listarPorId(this.id).subscribe(data => {
        let id = data.idPersona;
        let nombres = data.nombres;
        let apellidos = data.apellidos;
        let dni = data.dni;
        let direccion = data.direccion;
        let telefono = data.telefono;
        let celular = data.celular;
        let nombrescontacto = data.nombrescontacto;
        let apellidoscontacto = data.apellidoscontacto;
        let telefonocontacto = data.telefonocontacto;
        let celularcontacto = data.celularcontacto;

        this.form = new FormGroup({
          'id': new FormControl(id),
          'nombres': new FormControl(nombres),
          'apellidos': new FormControl(apellidos),
          'dni': new FormControl(dni),
          'direccion': new FormControl(direccion),
          'telefono': new FormControl(telefono),
          'celular': new FormControl(celular),
          'nombrescontacto' : new FormControl(nombrescontacto),
          'apellidoscontacto' : new FormControl(apellidoscontacto),
          'telefonocontacto' : new FormControl(telefonocontacto),
          'celularcontacto' : new FormControl(celularcontacto)

        });
      });
    }
  }


  operar() {
    this.persona.idPersona= this.form.value['id'];
    this.persona.nombres = this.form.value['nombres'];
    this.persona.apellidos = this.form.value['apellidos'];
    this.persona.dni = this.form.value['dni'];
    this.persona.direccion = this.form.value['direccion'];
    this.persona.telefono = this.form.value['telefono'];
    this.persona.celular = this.form.value['celular'];
    this.persona.nombrescontacto = this.form.value['nombrescontacto'];
    this.persona.apellidoscontacto = this.form.value['apellidoscontacto'];
    this.persona.telefonocontacto = this.form.value['telefonocontacto'];
    this.persona.celularcontacto = this.form.value['celularcontacto'];

    if (this.persona != null && this.persona.idPersona > 0) {
      //BUENA PRACTICA
      this.personaService.modificar(this.persona).pipe(switchMap(() => {
        return this.personaService.listar();
      })).subscribe(data => {
        this.personaService.personaCambio.next(data);
        this.personaService.mensajeCambio.next("Se modificó");
      });

    } else {
      //PRACTICA COMUN
      this.personaService.registrar(this.persona).subscribe(data => {
        this.personaService.listar().subscribe(persona => {
          this.personaService.personaCambio.next(persona);
          this.personaService.mensajeCambio.next("Se registró");
        });
      });
    }

    this.router.navigate(['persona']);
  }

}
