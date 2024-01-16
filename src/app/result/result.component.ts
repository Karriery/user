import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../services/document.service';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private documentService: DocumentService
  ) {}
  document: any;
  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: any) => {
      console.log(queryParams);
      this.documentService.getById(queryParams.id).subscribe((data) => {
        console.log(data);
        this.document = data;
      });
    });
  }
  formatImageUrl(name: any) {
    if (!name || name === 'NC') {
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/NA_cap_icon.svg/1200px-NA_cap_icon.svg.png';
    } else {
      return '../../assets/images/' + name + '.png';
    }
  }
  navto(){
    window.open('https://powerforms.docusign.net/83b3c6ae-e2de-4c77-9bfc-dda161d4de9c?env=eu&acct=54861fdd-188a-4beb-a046-82b8161a75c6&accountId=54861fdd-188a-4beb-a046-82b8161a75c6', '_blank');
  }
  bookCall() {
    this.router.navigate(['/bookcall'], {
      queryParams: { id: this.document._id },
    });
  }
}
