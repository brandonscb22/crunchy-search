import { Component, OnInit, ViewChild } from '@angular/core';
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
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatGridListModule, MatCardModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatButtonModule, HttpClientModule, MatTableModule, ReactiveFormsModule, MatPaginatorModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})

export class AppComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  searchForm = new FormGroup({
    title: new FormControl(''),
    audio: new FormControl(''),
    ratings: new FormControl(''),
  });
  displayedColumns: string[] = ['poster', 'title', 'maturity_ratings', 'audio_locales', 'episode_count'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  token: any;
  totalSeries: number = 0;
  totalPaginates: number = 0;
  data: serieElement[] = [{ title: 'R' }];
  dataSource = new MatTableDataSource<serieElement>(this.data);
  title = 'crunchy-search';

  constructor(private appService: AppService) {
    this.appService.getToken().subscribe(response => {
      this.token = (response as { access_token: string; }).access_token;
      this.appService.getPaginates(0, this.token).subscribe(response => {
        this.data = (response as {
          data: { title: string }[], total: number
        }).data;
        this.totalSeries = (response as { data: object[], total: number }).total;
        this.totalPaginates = Math.ceil(this.totalSeries / 50);
        for (let i = 1; i <= this.totalPaginates; i++) {
          this.appService.getPaginates(i * 50, this.token).subscribe(rsp => {
            let data = (rsp as { data: { title: string }[] }).data;
            this.data = [...this.data, ...data];
            this.dataSource.data = this.data;
          })
        }
      })
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  async ngOnInit() {

  }

  async onSubmit() {
    console.warn(this.searchForm.value.title);
    console.warn(this.searchForm.value.ratings);
    console.warn(this.searchForm.value.audio);
    console.log('Se logro')
    const dataSearch = this.data.filter(objeto => {
      let cumpleCriterio = true;

      if (this.searchForm.value.title) {
        cumpleCriterio = objeto.title.toLowerCase().includes(this.searchForm.value.title.toLowerCase() ?? '') ?? false
      }
      // Aplicar filtro por parte de texto si la condición se cumple
      if (this.searchForm.value.ratings && cumpleCriterio) {
        cumpleCriterio = objeto.series_metadata?.maturity_ratings?.includes(this.searchForm.value.ratings ?? '') ?? false
      }

      // Aplicar filtro por categoría si la condición se cumple
      if (this.searchForm.value.audio && cumpleCriterio) {
        cumpleCriterio = objeto.series_metadata?.audio_locales?.some(subElemento => subElemento.includes(this.searchForm.value.audio ?? '')) ?? false
      }

      return cumpleCriterio;

    })
    this.dataSource.data = dataSearch;
    this.dataSource.paginator ? this.dataSource.paginator.firstPage() : ''
  }
}
export interface serieElement {
  title: string;
  images?: { poster_wide?: { source?: string }[][] };
  series_metadata?: { maturity_ratings?: string[], audio_locales?: string[], episode_count: number }
}
