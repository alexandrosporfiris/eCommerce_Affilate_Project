import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchTerm: string;

  constructor(private router: Router, public activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.searchTerm = this.activatedroute.snapshot.queryParams.searchTerm;
  }

  search() {
    this.router.navigateByUrl('/αναζητηση?searchTerm=' + this.searchTerm);
  }

}
