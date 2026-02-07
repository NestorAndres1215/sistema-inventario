export class ReclamoValidator {

  static esReclamoValido(reclamo: any): boolean {
    if (!reclamo) return false;

    const { nombreCliente, descripcion, fecha } = reclamo;

    const nombreValido = typeof nombreCliente === 'string' && nombreCliente.trim().length >= 3;
    const descripcionValida = typeof descripcion === 'string' && descripcion.trim().length >= 5;
    const fechaValida = typeof fecha === 'string' && fecha.trim().length > 0;

    return nombreValido && descripcionValida && fechaValida;
  }

  static esMensajeValido(mensaje: string): boolean {
    return typeof mensaje === 'string' && mensaje.trim().length > 5;
  }
}
