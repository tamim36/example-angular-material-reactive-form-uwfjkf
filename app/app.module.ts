import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { WorkoutService } from "./service.service";
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from "./material.module";
import { AppComponent } from "./app.component";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [WorkoutService],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
