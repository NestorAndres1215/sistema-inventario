export class EntradaValidator {

  static esListaValida(listaDetalleEntrada: any[]): boolean {
    return Array.isArray(listaDetalleEntrada) && listaDetalleEntrada.length > 0;
  }


  static esDetalleValido(detalle: any): boolean {
    if (!detalle) return false;

    const { productoId, cantidad, precio } = detalle;

    const productoValido = Number.isInteger(productoId) && productoId > 0;
    const cantidadValida = Number.isInteger(cantidad) && cantidad > 0;
    const precioValido = !isNaN(precio) && Number(precio) >= 0;

    return productoValido && cantidadValida && precioValido;
  }
}
