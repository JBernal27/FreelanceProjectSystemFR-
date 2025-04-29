import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: false,
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  public isActive: boolean = false;

  constructor(private readonly loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loaderService.getLoaderState().subscribe((state) => {
      this.isActive = state;
    });
  }
}
