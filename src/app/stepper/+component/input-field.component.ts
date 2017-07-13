import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
})
export class InputFieldComponent implements OnInit {
  @Input() value: string;
  @Input() verification: string;
  @Input() placeholder: string;
  @Input() type: string = 'password';
  @Input() minLength: number;
  @Input() maxLength: number;
  @Input() pattern: string;
  @Input() patternError: string = 'invalid characters are not allowed';

  @Output() changed: EventEmitter<boolean> = new EventEmitter<boolean>();

  form: FormGroup;
  verified: boolean = false;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const validations: Validators[] = [Validators.required];

    if (this.minLength) {
      validations.push(Validators.minLength(this.minLength));
    }

    if (this.maxLength) {
      validations.push(Validators.maxLength(this.maxLength));
    }

    if (this.pattern) {
      validations.push(Validators.pattern(this.pattern));
    }

    this.form = this._formBuilder.group({
      value: [this.value, validations],
      verification: [this.verification, Validators.required],
    });

    this.form.valueChanges.subscribe((data: any) => this.triggerChanged(data));

    this.triggerChanged({
      value: this.value,
      verification: this.verification,
    });
  }

  triggerChanged(data: any): void {
    const ctrls: any = (<any>this.form.controls);
    const valid: boolean = ctrls.value.valid;

    data.valid = valid;

    if (this.isVerificationRequired) {
      this.verified = (data.value === data.verification);
      data.valid = data.valid && this.verified;
    }

    this.changed.next(data);
  }

  get isVerificationRequired(): boolean {
    return this.verification !== undefined;
  }
}
