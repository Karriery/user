import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Swal from 'sweetalert2';
import { MeetingsService } from '../services/meetings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../services/document.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-bookcall',
  templateUrl: './bookcall.component.html',
  styleUrl: './bookcall.component.scss',
})
export class BookcallComponent {
  constructor(
    private meetingService: MeetingsService,
    private route: ActivatedRoute,
    private router: Router,
    private documentService: DocumentService,
    private loaderService: LoaderService
  ) {}
  checkTime(i: any) {
    return i < 10 ? '0' + i : i;
  }
  today: any = new Date(new Date().getTime() + 30 * 60 * 1000);
  document: any;
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay',
    },
    locale: 'fr',
    dateClick: async (date) => {
      console.log(date.dateStr);
      var n =
        date.dateStr +
        'T' +
        this.checkTime(new Date().getHours()) +
        ':' +
        this.checkTime(new Date().getMinutes());
      var m =
        date.dateStr +
        'T' +
        this.checkTime(this.today.getHours()) +
        ':' +
        this.checkTime(this.today.getMinutes());
      console.log(n, m);
      const { value: res } = await Swal.fire({
        title: 'Choisis une date',
        input: 'time',
        inputLabel: 'Temp',
        inputValue: n.split('T')[1].slice(0, 5),
      });
      if (res) {
        n = date.dateStr + 'T' + res;
        var dateObject = new Date(n);

        // Adding 30 minutes
        var end = new Date(dateObject.getTime() + 30 * 60000);

        // Convert the modified date object to a string
        var e = this.formatDate(end);
        Swal.fire({
          title: 'Es-tu sûr?',
          text: 'votre rendez-vous sera le ' + date.dateStr + ' à ' + res,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Oui, confirme-le!',
        }).then((result) => {
          if (result.isConfirmed) {
            this.meetingService
              .post({
                start: n,
                end: e,
                document: this.document._id,
              })
              .subscribe((data) => {
                console.log(data);
                Swal.fire({
                  title: "C'est Confirmer!",
                  text: 'Confirmer.',
                  icon: 'success',
                });
                this.router.navigateByUrl('/');
              });
          }
        });
      }
    },
    initialView: 'dayGridMonth',
    eventClick: (info) => {
      console.log(info.event.id);
      info.el.style.borderColor = 'red';
    },
    events: [],
    eventColor: 'rgb(59, 66, 115)',
  };

  ngOnInit() {
    // @ts-ignore
    this.route.queryParams.subscribe((queryParams: any) => {
      // @ts-ignore
      window.Calendly.initInlineWidget({
        url: 'https://calendly.com/diagflashretraite/30min',
        parentElement: document.getElementById('calendly'),
        prefill: {},
        customAnswers: {
          a1: 'a1',
          a2: 'a2',
        },
        utm: {},
        locale: 'fr',
      });
      // @ts-ignore
      window.addEventListener('calendly:event-scheduled', function (event) {
        // your event handling code here
        console.log('schedualeddddd');
        // Redirect to your desired URL after the event is scheduled
        window.location.href = 'http://localhost:4200';
      });

      this.documentService.getById(queryParams.id).subscribe((data) => {
        console.log(data);
        this.document = data;
      });
    });
    this.meetingService.get().subscribe((data: any) => {
      for (var i = 0; i < data.length; i++) {
        data[i].display = 'block';
        data[i].color = 'rgb(59, 66, 115)';
        // this.closestEvent.start > data[i].start
        //   ? 'rgb(230, 183, 83)'
        //   : 'rgb(59, 66, 115)';
        data[i].id = data[i]._id;
      }
      var d = data.map((e: any) => {
        return { ...e, title: 'Booked', id: e._id };
      });
      this.calendarOptions.events = d;
    });
  }
  private formatDate(date: Date): string {
    const pad = (n: number) => (n < 10 ? '0' + n : n);
    return (
      date.getFullYear() +
      '-' +
      pad(date.getMonth() + 1) +
      '-' +
      pad(date.getDate()) +
      ' ' +
      pad(date.getHours()) +
      ':' +
      pad(date.getMinutes())
    );
  }
}
