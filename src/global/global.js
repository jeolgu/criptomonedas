export function getFecha(){

    var fecha = new Date(new Date().getTime())
    var year = new Date(fecha - (24*60*60*1000)).getFullYear()
    var month = new Date(fecha - (24*60*60*1000)).getMonth() + 1

    if(month < 10 ) { month = "0"+month}
    var day = new Date(fecha - (24*60*60*1000)).getDate()
    var fecha_completa = year.toString() + "-" + month.toString() + "-" + day.toString()

    return fecha_completa;
}
