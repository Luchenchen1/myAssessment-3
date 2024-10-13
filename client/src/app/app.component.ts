/*
 * @Descripttion: Web-A3
 * @Author: Zhujiayao & Luchenchen
 */
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  welcomeMessage: string = "Welcome to Our Funny Funding!";
  inspiringStories: string = "Your support fuels our journey forward.";
  

}
