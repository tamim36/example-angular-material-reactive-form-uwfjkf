import { Component } from "@angular/core";
import { WorkoutService } from "./service.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  formGroup: FormGroup;
  titleAlert: string = "This field is required";
  post: any = "";
  data: any;
  output: any;
  postData: any = {
    fullname: "tamim arefin anik",
    ProgramsId: 1,
    ExamTypeId: 1,
    BoardId: 2,
    PassingYearId: 1,
    GPA: 3.4
  };

  programs = [];
  sscexams = [];
  hscexams = ["hsc", "diploama", "equivalent"];
  boards = ["dhaka", "rajshahi", "sylhet"];
  passingyears = ["2021", "2020", "2019"];
  constructor(
    private formBuilder: FormBuilder,
    private workoutService: WorkoutService
  ) {}

  ngOnInit() {
    this.createForm();
    this.setChangeValidate();
    this.workoutService.get().subscribe((data: any) => {
      console.log(data.data);
      var output = [];
      for (var i = 0; i < data.data.length; ++i) {
        output.push(data.data[i].programName);
      }
      this.data = data.data;
      this.programs = output;
      console.log(output);
    });
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.formGroup = this.formBuilder.group({
      email: [
        null,
        [Validators.required, Validators.pattern(emailregex)],
        this.checkInUseEmail
      ],
      name: [null, Validators.required],
      fullName: [null, Validators.required],
      fatherName: [null, Validators.required],
      motherName: [null, Validators.required],
      guardianname: [null, Validators.required],
      stcontactno: [null, Validators.required],
      prcontactno: [null, Validators.required],
      nationalid: [null, Validators.required],
      address: [null, Validators.required],
      sscboard: [null, Validators.required],
      sscreg: [null, Validators.required],
      sscgpa: [null, Validators.required],
      // nationalid: [null, Validators.required],
      // address: [null, Validators.required],
      // sscboard: [null, Validators.required],
      // sscreg: [null, Validators.required],
      //password: [null, [Validators.required, this.checkPassword]],
      /*description: [
        null,
        [Validators.required, Validators.minLength(5), Validators.maxLength(10)]
      ],*/
      validate: ""
    });
  }
  onSubmitButton() {
    console.log("test");
  }

  setChangeValidate() {
    this.formGroup.get("validate").valueChanges.subscribe(validate => {
      if (validate == "1") {
        this.formGroup
          .get("name")
          .setValidators([Validators.required, Validators.minLength(3)]);
        this.titleAlert = "You need to specify at least 3 characters";
      } else {
        this.formGroup.get("name").setValidators(Validators.required);
      }
      this.formGroup.get("name").updateValueAndValidity();
    });
  }

  get name() {
    return this.formGroup.get("name") as FormControl;
  }

  checkPassword(control) {
    let enteredPassword = control.value;
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return !passwordCheck.test(enteredPassword) && enteredPassword
      ? { requirements: true }
      : null;
  }

  checkInUseEmail(control) {
    // mimic http database access
    let db = ["tony@gmail.com"];
    return new Observable(observer => {
      setTimeout(() => {
        let result =
          db.indexOf(control.value) !== -1 ? { alreadyInUse: true } : null;
        observer.next(result);
        observer.complete();
      }, 4000);
    });
  }

  getErrorEmail() {
    return this.formGroup.get("email").hasError("required")
      ? "Field is required"
      : this.formGroup.get("email").hasError("pattern")
      ? "Not a valid emailaddress"
      : this.formGroup.get("email").hasError("alreadyInUse")
      ? "This emailaddress is already in use"
      : "";
  }

  getErrorPassword() {
    return this.formGroup.get("password").hasError("required")
      ? "Field is required (at least eight characters, one uppercase letter and one number)"
      : this.formGroup.get("password").hasError("requirements")
      ? "Password needs to be at least eight characters, one uppercase letter and one number"
      : "";
  }
  postStudentData(payload) {
    this.workoutService
      .add(payload)
      .subscribe(joggingRecord => console.log("text", joggingRecord));
  }

  onSubmit(post) {
    this.post = post;
    console.log(post);
    this.postStudentData(post);
  }
}