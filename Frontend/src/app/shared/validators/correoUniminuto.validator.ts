import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function correoUniminuto(domain: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        const valid = value && value.endsWith(domain);
        return valid ? null : { domain: { value: control.value } };
    };
}