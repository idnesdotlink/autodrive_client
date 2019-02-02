import {Component, OnInit, Input, OnDestroy} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {Location} from '@angular/common'

// import { Member } from '@interfaces';
import {MembersService} from '@services/members.service'
import {AuthenticationService} from '@services/authentication.service'

@Component({
  selector: 'member-detail',
  templateUrl: 'template.html',
  styleUrls: ['style.scss'],
  providers: [MembersService, AuthenticationService]
})
export class DetailComponent implements OnInit, OnDestroy {

  // @Input() member: Member;
  memberId: string;
  allowEmptyString: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private MembersService: MembersService,
    private location: Location,
    private auth: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const memberId = this.route.snapshot.paramMap.get('id');
    this.MembersService.get_one(memberId).subscribe(
      (val) => {
        this.memberId = val;
    },
    response => console.log(`POST call in error, ${response}`),
    () => console.log('Complete')
    );

  }

  ngOnDestroy(): void {

  }

  ck() {
    console.log(this.auth.user_role);
  }

  clickBack(e) {
    this.router.navigate(['/admin/members']);
  }

  getMember(): void {
    // const id = +this.route.snapshot.paramMap.get('id');
    // this.MembersService.getMember(id)
    // .subscribe(member => this.member = member);
  }

  goBack(): void {
    this.location.back();
  }
}
