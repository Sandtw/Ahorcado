let palabrita;
let cant_errores = 0; // nro de veces que me equivoque
let cant_aciertos = 0; // nro de letras acertadas
let cant_intentos = 7;
attemp = id('attemps');
attemp.innerHTML = `Intentos restantes: <strong>${cant_intentos}<strong>`;
float = id('float');

const objeto = {
    fuego: "Gracias a esto el hombre pudo generar luz, fabricar pequeños utensilios e incluso defenderse de ataques",     
    rueda: "Facilitó el transporte y la movilidad de manera global y cotidiana",     
    arado: "Cambió el desarrollo del trabajo del campo",    
    polvora: "Tuvo un primer uso bélico",      
    hormigon: "Combinación de piedras, arena y cemento fluido que al endurecerse resulta muy resistente",     
    bombilla: "Con su aparición las horas de actividad humana se han extendieron cuantitativamente",       
    imprenta: "Con ella, la cultura y la información se popularizó y llegó a todo el mundo",   
    antibioticos: "Gracias a su existencia han sido innumerables vidas las que han sido salvadas",
    telegrafo: "Todo se volvió mucho más rápido para que la información se moviese",
    telefono: "La posibilidad de comunicarse a distancia cambió las relaciones personales, sociales, comerciales y de todo ámbito de los seres humanos",
    internet: "Acaba convirtiéndose en la infraestructura esencial de la era digital"    
};

const palabras = Object.keys(objeto);

const btn = id('play');
const btn_help = id('help')
const imagen = id('image');
const btn_letras = document.querySelectorAll("#letters button")

// Click de iniciar el juego
btn.addEventListener('click', iniciar);
btn_help.addEventListener('click', pistas);
btn_help.disabled = true;

function iniciar(event){
    btn_help.disabled = false;
    float.innerHTML = '';
    id('result').innerHTML = '';
    attemp.innerHTML = `Intentos restantes: <strong>${cant_intentos}<strong>`;
    imagen.src = 'img/img0.png';
    btn.disabled = true;
    cant_errores = 0;
    cant_aciertos = 0;


    const parrafo = id('guess');
    parrafo.innerHTML = '';

    const cant_palabras = palabras.length;
    const valor_al_azar = obtener_random(0, cant_palabras);
    

    palabrita = palabras[valor_al_azar];
    const cant_letras = palabrita.length;

    for(let i = 0; i < btn_letras.length; i++){
        btn_letras[i].disabled = false;
    }

    for(let i = 0; i < cant_letras; i++){
        const span = document.createElement('span');
        parrafo.appendChild(span);
    }
}

// Click de adivinar letra
for(let i = 0; i < btn_letras.length; i++){
    btn_letras[i].addEventListener('click', click_letras);
}


function click_letras(){
    const spans = document.querySelectorAll('#guess span');
    const button = event.target;
    button.disabled = true;
    
    const letra = button.innerHTML.toLowerCase();
    const palabra = palabrita.toLowerCase();

    let acerto = false;
    for(let i = 0; i<palabra.length; i++){
        if(letra == palabra[i]){
            spans[i].innerHTML = letra;
            cant_aciertos++;
            acerto = true;
        }
    }

    if(acerto==false){
            cant_errores++;
            attemp.innerHTML = `Intentos restantes: <strong>${cant_intentos - cant_errores}<strong>`;
            const source = `img/img${cant_errores}.png`;
            imagen.src = source;
    }

    if(cant_errores == 7){
        id('result').innerHTML = "Perdiste, la palabra era " + palabrita;
        cant_intentos = 7;
        game_over();
    }
    else if(cant_aciertos == palabrita.length){
        id('result').innerHTML = "Ganaste!!!";
        cant_intentos = 7;
        game_over();
    }

}

function pistas(event){
    float.innerHTML = objeto[palabrita];
    btn_help.disabled = true;
}

// Fin del juego
function game_over(){
    for(let i = 0; i < btn_letras.length; i++){
        btn_letras[i].disabled = true;
    }

    btn.disabled = false;
}

game_over();