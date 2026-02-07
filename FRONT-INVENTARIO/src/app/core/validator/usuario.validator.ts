export class UsuarioValidator {
  static esUsuarioValido(usuario: any): boolean {
    if (!usuario) return false;
    const { username, email, password } = usuario;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameValido = typeof username === 'string' && username.trim().length >= 3;
    const emailValido = emailRegex.test(email);
    const passwordValido = typeof password === 'string' && password.length >= 6;

    return usernameValido && emailValido && passwordValido;
  }
}
