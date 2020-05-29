function tiroParabolico(velocidad , unidadvel , angulo , unidadang , altini){
    var distancia , tiempo , altmax , tiempoAltMax;

    //reemplazo coma por punto en la variable.
    velocidad = comaxPunto(velocidad);
    angulo = comaxPunto(angulo);
    altini = comaxPunto(altini);

    //verifico si la entrada es un numero.
    if(isNaN(velocidad) || isNaN(angulo) || isNaN(altini)){
        alert("Los datos deben ser números");
    }


    Number(velocidad);
    Number(angulo);
    Number(altini);

    //convierto km/h a m/s.
    if(unidadvel === "km/h"){
        velocidad = velocidad/3.6;
    }

    //convierto grados a radianes.
    if(unidadang === "Grados"){
        angulo = angulo * Math.PI / 180;
    }

    //calculo el tiempo final.
    if(altini === 0){
        tiempo = calculoTSinAI(velocidad , angulo);
    }
    else{
        tiempo = calculoTConAI(velocidad , angulo , altini);
    }

    //calculo el tiempo para la altura maxima.
    tiempoAltMax = calculoTAltMax(velocidad , angulo);

    //calculo la distancia final.
    distancia = velocidad * Math.cos(angulo) * tiempo;

    //calculo la altura maxima.
    altmax = Number(altini) /* DUDA CON NUMBER*/ + (velocidad * Math.sin(angulo) * tiempoAltMax) - (1/2 * 9.8 * Math.pow(tiempoAltMax , 2));

    document.getElementById("distancia").innerHTML = " " + (Math.round(distancia * 100) / 100) + " m.";
    document.getElementById("tiempo").innerHTML = " " + (Math.round(tiempo * 100) / 100) + " s.";
    document.getElementById("alturamax").innerHTML = " " + (Math.round(altmax * 100) / 100) + " m.";
}

function comaxPunto(inp){
    if(inp.includes(",")){
        inp = inp.replace("," , ".");
    }
    return inp;
}

function kmhAMs(){

}

function calculoTSinAI(velocidad , angulo) {
    var tiempo;
    tiempo = velocidad * Math.sin(angulo) / 4.9;
    return tiempo;
}

function calculoTConAI(velocidad , angulo , alturaini){
        var t1 , t2;
        t1 = (-(velocidad * Math.sin(angulo)) + Math.sqrt(((Math.pow(velocidad * Math.sin(angulo) , 2)) + (19.6 * alturaini))))/(-9.8);
        t2 = (-(velocidad * Math.sin(angulo)) - Math.sqrt(((Math.pow(velocidad * Math.sin(angulo) , 2)) + (19.6 * alturaini))))/(-9.8);
        if(t1 === t2 || t1 > 0){
            return t1;
        }
        return t2;
}

function calculoTAltMax(velocidad , angulo){
    var tiempoAltMax;
    tiempoAltMax = velocidad * Math.sin(angulo) / 9.8;
    return tiempoAltMax;
}

function resetear() {
    document.getElementById("formulario").reset();
}