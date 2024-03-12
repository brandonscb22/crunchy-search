import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatGridListModule, MatCardModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatButtonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent implements OnInit {
  token: any;
  totalSeries: number = 0;
  totalPaginates: number = 0;
  public series: { title: string }[] = [{ title: 'R' }];
  title = 'crunchy-search';
  constructor(private appService: AppService) {
    this.appService.getToken().subscribe(response => {
      this.token = (response as { access_token: string; }).access_token;
      console.log(this.token);
      this.appService.getPaginates(0, this.token).subscribe(response => {
        this.series = (response as { data: { title: string }[], total: number }).data;
        this.totalSeries = (response as { data: object[], total: number }).total;
        this.totalPaginates = Math.ceil(this.totalSeries / 50);
        console.log(this.series.length);
        for (let i = 1; i <= this.totalPaginates; i++) {
          console.log(i * 50);
          this.appService.getPaginates(i * 50, this.token).subscribe(rsp => {
            let data = (rsp as { data: { title: string }[] }).data;
            this.series = [...this.series, ...data];
            console.log('series', this.series.length);
            console.log('serie0', this.series[1]['title'])
          })
        }
      })
    });
  }

  async ngOnInit() {

  }
}
