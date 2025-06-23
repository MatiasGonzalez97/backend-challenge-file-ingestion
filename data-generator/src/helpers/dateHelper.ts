function isValidDate(fechaStr: string): boolean {
    if (!fechaStr) return false;

    const parts = fechaStr.split('/');

    if (parts.length !== 3) return false;

    const [monthStr, dayStr, yearStr] = parts;
    const mes = parseInt(monthStr, 10);
    const dia = parseInt(dayStr, 10);
    const anio = parseInt(yearStr, 10);

    if (isNaN(mes) || isNaN(dia) || isNaN(anio)) return false;

    if (mes < 1 || mes > 12) return false;
    if (dia < 1 || dia > 31) return false;
    if (anio < 1900 || anio > 2100) return false; //aca podriamos cambiar las fechas si es necesario

    const date = new Date(anio, mes - 1, dia);

    return (
        date.getFullYear() === anio &&
        date.getMonth() === mes - 1 &&
        date.getDate() === dia
    );
}
export default isValidDate;