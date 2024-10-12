import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { FundraiserComponent } from './fundraiser/fundraiser.component';
import { DonationComponent } from './donation/donation.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // 重定向到/home
  { path: 'home', component: HomeComponent }, // 定义home路由
  { path: 'search', component: SearchComponent }, // 定义search路由
  { path: 'fundraiser', component: FundraiserComponent }, // 定义fundraiser路由
  { path: 'donation', component: DonationComponent }, // 定义donation路由
  { path: 'admin', component: AdminComponent }, // 定义admin路由

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
