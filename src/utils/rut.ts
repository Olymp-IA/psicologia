export const validateRut = (rut: string): boolean => {
    if (!rut || typeof rut !== 'string') return false;

    // Limpiar RUT (quitar puntos y guión)
    const cleanRut = rut.replace(/[\.-]/g, '').trim().toUpperCase();

    if (cleanRut.length < 8) return false;

    // Separar cuerpo y dígito verificador
    const cuerpo = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1);

    // Validar cuerpo numérico
    if (!/^\d+$/.test(cuerpo)) return false;

    // Calcular dígito verificador esperado
    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo.charAt(i)) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const resto = suma % 11;
    let dvEsperado = 11 - resto;

    let dvCalculado = '';
    if (dvEsperado === 11) dvCalculado = '0';
    else if (dvEsperado === 10) dvCalculado = 'K';
    else dvCalculado = dvEsperado.toString();

    return dvCalculado === dv;
};

export const formatRut = (rut: string): string => {
    if (!rut) return '';

    // Eliminar caracteres no alfanuméricos excepto kK
    const cleanRut = rut.replace(/[^0-9kK]/g, '').toUpperCase();

    if (cleanRut.length <= 1) return cleanRut;

    const cuerpo = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1);

    // Formatear cuerpo con puntos
    const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return `${cuerpoFormateado}-${dv}`;
};
