// src/app/models/auth/login.dto.ts

export class LoginDTO {
  constructor(
    public correo: string = '',
    public password: string = ''
  ) {}

  isValid(): boolean {
    return this.correo.trim() !== '' && this.password.trim() !== '';
  }
}
