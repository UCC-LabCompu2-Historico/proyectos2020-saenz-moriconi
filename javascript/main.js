function resetear() {
    document.getElementById("formulario").reset();
}

function tiroparabolico(){
    var velocidad , unidadvel, unidadang, altini , angulo , velx , vely, distancia , tiempo , tiempaltmax , altmax;

    velocidad = document.getElementsByName("velocidad")[0].value;
    unidadvel = document.getElementById("unidad_velocidad").value;
    angulo = document.getElementsByName("angulo")[0].value;
    unidadang = document.getElementById("unidad_angulo").value;
    altini = document.getElementsByName("altura_incial")[0].value;




    if(isNaN(velocidad) || isNaN(angulo) || isNaN(altini)){
        alert("Los datos deben ser números");
    }

    Number(velocidad);
    Number(angulo);
    Number(altini);

    if(unidadvel === "km/h"){
        velocidad = velocidad/3.6;
    }

    if(unidadang === "Grados"){
        angulo = angulo * Math.PI / 180;
    }

    velx = Math.round(velocidad * Math.cos(angulo) *100)/100;

    vely = Math.round(velocidad * Math.sin(angulo) *100)/100;

    tiempo = Math.round(((altini+vely)/4.9)*100)/100;

    distancia = Math.round(velx * tiempo*100)/100;

    tiempaltmax = vely/9.8;

    altmax = altini + (vely*tiempaltmax) - (4.9 * Math.pow(tiempaltmax , 2));

    altmax = Math.round(altmax*100)/100;

    document.getElementById("distancia").innerHTML = " " + distancia + " m.";
    document.getElementById("tiempo").innerHTML = " " + tiempo + " s.";
    document.getElementById("alturamax").innerHTML = " " + altmax + " m.";

    console.log(altini);
}