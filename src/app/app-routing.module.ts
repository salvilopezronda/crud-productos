import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaProductoPageComponent } from './productos/pages/consulta-producto-page/consulta-producto-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'usuarios'
  },
  {
    path: 'usuarios',
    component: ConsultaProductoPageComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'main'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
