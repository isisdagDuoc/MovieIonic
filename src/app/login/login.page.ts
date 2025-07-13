import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SQLiteService } from '../services/DB/sql-lite.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

    state: any;
    texto: string = '';

    constructor(private router: Router,private db: SQLiteService) {
    if(this.router.getCurrentNavigation()?.extras.state)
      this.state = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit() {
      this.db.dbState().subscribe({
      next: async () => {
        this.texto = await this.db.obtenerTexto()
      }
    }); 
  }

  irARegistro() {
    this.router.navigate(['/agregar']);
  }

}
