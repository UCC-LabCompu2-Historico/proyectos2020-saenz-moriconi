/**
 * Funcion que calcula el tiempo en suspension, la distancia recorrida y la altura maxima que alcanza un objeto en el movimiento parabolico.
 * @method tiroParabolico.
 * @param {number} velocidad    - velocidad inicial para el objeto.
 * @param {string} unidadvel    - unidad en que se encuentra la velocidad (m/s o km/h).
 * @param {number} angulo       - angulo del objeto al ser lanzado.
 * @param {string} unidadang    - unidad en que se encuentra el angulo (grados o radiane).
 * @param {number} altini       - altura inicial del objeto en metros.
 * @return
 */
function tiroParabolico(velocidad , unidadvel , angulo , unidadang , altini){
    var distancia , tiempo , altmax , tiempoAltMax;

    //reemplazo coma por punto en la variable.
    velocidad = comaxPunto(velocidad);
    angulo = comaxPunto(angulo);
    altini = comaxPunto(altini);

    //verifico si la entrada es un numero.
    if(isNaN(velocidad) || isNaN(angulo) || isNaN(altini)){
        resetearFormulario();
        alert("Los datos deben ser números.");
        return;
    }
    Number(velocidad);
    Number(angulo);
    Number(altini);

    //verifico que los datos esten dentro de los parametros.
    if(unidadvel === "m/s") {
        if (velocidad > 50 || velocidad < 20){
            resetearFormulario();
            alert("la velocidad debe estar entre 20 y 50 m/s.");
            return;
        }
    }


    if(unidadvel === "km/h") {
        if (velocidad > 180 || velocidad < 70) {
            resetearFormulario();
            alert("la velocidad debe estar entre 70 y 180 km/h.");
            return;
        }
    }

    if(altini < 0 || altini > 40){
        resetearFormulario();
        alert("La altura inicial debe estar entre 0 y 40 metros.");
        return
    }

    if(unidadang === "Grados") {
        if(angulo <0 || angulo > 90){
            resetearFormulario();
            alert("El angulo debe estar entre 0 y 90 grados.");
            return;
        }
    }

    if(unidadang === "Radianes"){
        if(angulo <0 || angulo > 1.57){
            resetearFormulario();
            alert("El angulo debe estar entre 0 y 1.57 radianes.");
            return;
        }
    }

    //convierto de km/h a m/s.
    if (unidadvel === "km/h")
        velocidad = velocidad / 3.6;

    //convierto grados a radianes.
    if (unidadang === "Grados") {
        angulo = angulo * Math.PI / 180;
    }

    //calculo el tiempo final.
    if (altini === 0) {
        tiempo = calculoTSinAI(velocidad, angulo);
    } else {
        tiempo = calculoTConAI(velocidad, angulo, altini);
    }

    //calculo el tiempo para la altura maxima.
    tiempoAltMax = calculoTAltMax(velocidad, angulo);

    //calculo la distancia final.
    distancia = velocidad * Math.cos(angulo) * tiempo;
    distancia = Math.round(distancia * 100) / 100;

    //calculo la altura maxima.
    altmax = Number(altini) /* DUDA CON NUMBER*/ + (velocidad * Math.sin(angulo) * tiempoAltMax) - (1 / 2 * 9.8 * Math.pow(tiempoAltMax, 2));
    altmax = Math.round(altmax *100)/100;

    //redondeo tiempo.
    tiempo = Math.round(tiempo * 100) / 100;

    document.getElementById("distancia").innerHTML = " " + distancia + " [m]";
    document.getElementById("tiempo").innerHTML = " " + tiempo + " [s]";
    document.getElementById("alturamax").innerHTML = " " + altmax + " [m]";

    dibujar(distancia, altmax , altini);
}

/**
 * Funcion que dibuja los ejes de coordenadas en canvas.
 * @method dibujarEjes.
 * @return
 */
function dibujarEjes() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var alturaMax = canvas.height;
    var anchoMax = canvas.width;
    var margenX = 50;
    var margenY = 60;
    var valorX = 20;
    var valorY = 20;

    //Titulo.
    ctx.beginPath();
    ctx.font = "50px Arial";
    ctx.fillStyle = "#089c8c";
    ctx.fillText("Gráfico" , anchoMax/2 - 100 , margenY);
    ctx.closePath();

    //Eje de las x.
    ctx.beginPath();
    ctx.moveTo(margenX , alturaMax - margenY);
    ctx.lineTo(anchoMax - margenX, alturaMax - margenY);
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    ctx.closePath();

    //Eje de las y.
    ctx.beginPath();
    ctx.moveTo(margenX , margenY);
    ctx.lineTo(margenX , alturaMax - margenY);
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    ctx.closePath();

    //Divisiones eje x.
    ctx.beginPath();
    for(i = margenX + 60 ; i < anchoMax - margenY; i += 60){
        ctx.moveTo(i , alturaMax + 7 - margenY );
        ctx.lineTo(i , alturaMax - margenY - 7 );
        ctx.strokeStyle = "#000000";
        ctx.stroke();
    }
    ctx.closePath();

    //Divisiones eje y.
    ctx.beginPath();
    for(var i = alturaMax - margenY - 60; i > margenY; i -= 60){
        ctx.moveTo(margenX - 7 , i);
        ctx.lineTo(margenX + 7 , i);
        ctx.strokeStyle = "#000000";
        ctx.stroke();
    }
    ctx.closePath();

    //Valores de las divisiones en eje x.
    ctx.beginPath();
    for(i = margenX + 60 ; i < anchoMax - margenY; i += 60){
        ctx.font = "15px Arial";
        ctx.fillText(valorX , i , alturaMax  - 30);
        valorX+=20;
    }
    ctx.closePath();

    //Valores de las divisiones en eje y.
    ctx.beginPath();
    for(var i = alturaMax - margenY - 60; i > margenY; i -= 60){
        ctx.font = "15px Arial";
        ctx.fillText(valorY , margenX - 35 , i);
        valorY+=20;
    }
    ctx.closePath();

    //Flechas eje x.
    ctx.beginPath();
    ctx.moveTo(anchoMax - margenX , alturaMax - margenY);
    ctx.lineTo(anchoMax - margenX - 15 , alturaMax - margenY - 5);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(anchoMax - margenX , alturaMax - margenY);
    ctx.lineTo(anchoMax - margenX - 15 , alturaMax - margenY + 5);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    //Flechas eje y.
    ctx.beginPath();
    ctx.moveTo(margenX , margenY);
    ctx.lineTo(margenX + 5 , margenY + 15);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(margenX , margenY);
    ctx.lineTo(margenX -5 , margenY + 15);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    //nombre de eje x.
    ctx.beginPath();
    ctx.font = "20px Arial";
    ctx.fillStyle = "#089c8c";
    ctx.fillText("x(m)" , anchoMax - margenX + 3 , alturaMax - margenY + 5 );
    ctx.closePath();

    //nombre de eje y.
    ctx.beginPath();
    ctx.font = "20px Arial";
    ctx.fillStyle = "#089c8c";
    ctx.fillText("y(m)" , margenX - 15 , margenY - 10);
    ctx.closePath();
}

/**
 * Funcion que resetea los inputs del formulario.
 * @method resetearFormulario.
 * @return
 */
function resetearFormulario(){
    document.getElementById("formulario").reset();
}

/**
 * Funcion que limpia el lienzo.
 * @method resetearCanvas
 * @return
 */
function resetearCanvas(){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    canvas.width = canvas.width;
    dibujarEjes();
}

/**
 * Funcion que limpia el lienzo y resetea los inputs del formulario.
 * @method resetear
 * @return
 */
function resetear() {
    resetearFormulario();
    resetearCanvas();
}

/**
 * Funcion que reemplaza la coma por un punto en el input.
 * @method comaxPunto
 * @param {number} inp - valor del input.
 * @return {number} inp - valor del input convertido.
 */
function comaxPunto(inp){
    if(inp.includes(",")){
        inp = inp.replace("," , ".");
    }
    return inp;
}

/**
 * Funcion que calcula el tiempo en suspension del objeto, cuando este no tiene altura inicial.
 * @method calculoTSinAI
 * @param {number} velocidad    - velocidad inicial para el objeto.
 * @param {number} angulo       - angulo del objeto al ser lanzado.
 * @return {number} tiempo      - tiempo en suspension.
 */
function calculoTSinAI(velocidad , angulo) {
    var tiempo;
    tiempo = velocidad * Math.sin(angulo) / 4.9;
    return tiempo;
}

/**
 * Funcion que calcula el tiempo en suspension del objeto, cuando este tiene altura inicial
 * @method calculoTConAI.
 * @param {number} velocidad    - velocidad inicial para el objeto.
 * @param {number} angulo       - angulo del objeto al ser lanzado.
 * @param {number} alturaini    - altura inicial del objeto en metros.
 * @return {number} tiempo      - tiempo en suspension
 */
function calculoTConAI(velocidad , angulo , alturaini){
        var t1 , t2;
        t1 = (-(velocidad * Math.sin(angulo)) + Math.sqrt(((Math.pow(velocidad * Math.sin(angulo) , 2)) + (19.6 * alturaini))))/(-9.8);
        t2 = (-(velocidad * Math.sin(angulo)) - Math.sqrt(((Math.pow(velocidad * Math.sin(angulo) , 2)) + (19.6 * alturaini))))/(-9.8);
        if(t1 === t2 || t1 > 0){
            return t1;
        }
        return t2;
}

/**
 * Funcion que calcula el tiempo para cual el objeto se encuentra en su altura maxima.
 * @method calculoTAltMax
 * @param {number} velocidad        - velocidad inicial para el objeto.
 * @param {number} angulo           - angulo del objeto al ser lanzado.
 * @return {number} tiempoAltMax    - tiempo en su altura maxima.
 */
function calculoTAltMax(velocidad , angulo){
    var tiempoAltMax;
    tiempoAltMax = velocidad * Math.sin(angulo) / 9.8;
    return tiempoAltMax;
}

/**
 * Funcion que dibuja la parabola en el lienzo.
 * @method dibujar
 * @param {number} distancia    - distancia final recorrida por el objeto.
 * @param {number} altura       - altura maxima alcanzada por el objeto.
 * @param {number} altini       - altura inicial del objeto.
 * @return
 */
function dibujar(distancia , altura , altini){
    distancia = distancia *3;
    altini = altini *3;
    altura = altura *3;
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var alturaMax = canvas.height;
    var anchoMax = canvas.width;
    var margenX = 50;
    var margenY = 60;
    var color = dame_color_aleatorio();

    //Dibujo grafico.
    ctx.beginPath();
    ctx.moveTo(margenX , alturaMax - margenY - altini);
    ctx.quadraticCurveTo((distancia/2) + margenX , alturaMax - margenY - altura*2 , distancia + margenX , alturaMax - margenY);
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();
}

/**
 * Funcion que devuelve un color aleatorio en hexadecimal.
 * @method dame_color_aleatorio.
 * @return {string} color_aleatorio - color aleatorio.
 */
function dame_color_aleatorio(){
    hexadecimal = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");
    color_aleatorio = "#";
    for (i=0;i<6;i++){
        posarray = aleatorio(0,hexadecimal.length);
        color_aleatorio += hexadecimal[posarray];
    }
    return color_aleatorio;
}

/**
 * Funcion que devuelve una posicion o numero aleatorio.
 * @method aleatorio.
 * @param {number} inferior - limite inferior.
 * @param {number} superior - limite superior.
 * @return {number}         - numero aleatorio.
 */
function aleatorio(inferior,superior){
    numPosibilidades = superior - inferior;
    aleat = Math.random() * numPosibilidades;
    aleat = Math.floor(aleat);
    return parseInt(inferior) + aleat;
}
