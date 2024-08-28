import { Routes } from '@angular/router';
import { HomeComponent } from './website/home/home.component';
import { SobreNosotrosComponent } from './website/sobre-nosotros/sobre-nosotros.component';
import { GraduadosComponent } from './website/graduados/graduados.component';
import { CursosComponent } from './website/cursos/cursos.component';
import { ConveniosComponent } from './website/convenios/convenios.component';
import { ContactoComponent } from './website/contacto/contacto.component';
import { ActividadesComponent } from './website/actividades/actividades.component';
import { GastronomiaComponent } from './website/cursos/gastronomia/gastronomia.component';
import { Gastronomia2Component } from './website/cursos/gastronomia2/gastronomia2.component';
import { AtencionAlClienteComponent } from './website/cursos/atencion-al-cliente/atencion-al-cliente.component';
import { CocteleriaComponent } from './website/cursos/cocteleria/cocteleria.component';
import { ComputacionComponent } from './website/cursos/computacion/computacion.component';
import { DiseODimensionalComponent } from './website/cursos/diseño-dimensional/diseño-dimensional.component';
import { MarketingDigitalComponent } from './website/cursos/marketing-digital/marketing-digital.component';
import { PeluqueriaComponent } from './website/cursos/peluqueria/peluqueria.component';
import { ReparacionCelularesComponent } from './website/cursos/reparacion-celulares/reparacion-celulares.component';
import { IniciarSesionComponent } from './website/iniciar-sesion/iniciar-sesion.component';
import { MainAdminPageComponent } from './admin/main-admin-page/main-admin-page.component';
import { ContactUsComponent } from './website/contact-us/contact-us.component';
import {GastronomiaVirtualComponent} from "./website/cursos/gastronomia-virtual/gastronomia-virtual.component";
import {RecetaFiletMignonComponent} from "./website/Recetas/receta-filet-mignon/receta-filet-mignon.component";
import { AuthGuard } from './guard/auth.guard';


export const routes: Routes = [
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
    { path: 'home',        component: HomeComponent },
    { path: 'contact-us',        component: ContactUsComponent },
    { path: 'sobre-nosotros',        component: SobreNosotrosComponent },
    { path: 'graduados',        component: GraduadosComponent },
    { path: 'cursos',        component: CursosComponent },
    { path: 'convenios',        component: ConveniosComponent },
    { path: 'contacto',        component: ContactoComponent },
    { path: 'actividades',        component: ActividadesComponent },
    { path: 'cursos/gastronomia',        component: GastronomiaComponent },
    { path: 'cursos/gastronomia2',        component: Gastronomia2Component },
    { path: 'cursos/gastronomia-virtual',        component: GastronomiaVirtualComponent },
    { path: 'cursos/atencion-al-cliente',        component: AtencionAlClienteComponent },
    { path: 'cursos/cocteleria',        component: CocteleriaComponent },
    { path: 'cursos/computacion',        component: ComputacionComponent },
    { path: 'cursos/diseño-dimensional',        component: DiseODimensionalComponent },
    { path: 'cursos/marketing-digital',        component: MarketingDigitalComponent },
    { path: 'cursos/peluqueria',        component: PeluqueriaComponent },
    { path: 'cursos/reparacion-de-celulares',        component: ReparacionCelularesComponent },
    { path: 'recetas/filet-mignon',        component:  RecetaFiletMignonComponent},
    { path: 'iniciar-sesion',        component: IniciarSesionComponent },
    { path: 'admin',
        loadComponent: () => import('./admin/main-admin-page/main-admin-page.component')
        .then(m => m.MainAdminPageComponent),
        canActivate: [AuthGuard] }
];
