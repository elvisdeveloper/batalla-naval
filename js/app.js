'use strict'
const path = document.location.pathname;
const directory = path.substring(path.indexOf('/'), path.lastIndexOf('/'));

window.onload = function () {

    var misiles = 30
    loadCaja('misiles',misiles)

    var barcos = 10
    loadCaja('barcos',barcos)

    var btnExit = document.getElementById('exit');
    btnExit.addEventListener('click', ()=>{
        window.location.reload()
    })

    var btnPlay = document.getElementById('play')
    btnPlay.addEventListener('click', ()=>{
        document.getElementById('cardInicio').remove()
        createTable()
    })

}

function createTable(){

    var container = document.getElementById('container')
    var barcos = 5;
    for (var f = 0; f < 15; f++) {
        var row = document.createElement('div')
        row.setAttribute('class', 'row')

        for (var c = 0; c < 15; c++) {
            
            var col = document.createElement('div')
            col.setAttribute('class', 'col bg-light p-3')

            if( (parseInt(Math.random()*10)%4321==0) && (barcos > 0)){
                barcos--;
                col.setAttribute('id', true)
            }else{
                col.setAttribute('id', false)
            }

            col.style.border = '1px dashed #007bff'

            col.addEventListener('click', handleDisparo)
            col.addEventListener('mouseover', handleFoco)
            col.addEventListener('mouseout', handleSinFoco)

            row.appendChild(col)
        }
        container.appendChild(row)
    }

}


function handleDisparo(div){

    var div = div.target;
    
    var totalMisiles = totalCaja('misiles')
    var totalBarcos = totalCaja('barcos')


    if (totalMisiles > 0) {

        if (div.id=='true') {
            
            var audio = new Audio(directory+"../audio/audio.mp3");
            audio.play()
            
                alert('Exelente disparo!!')
                
                if ((totalBarcos-1)==0) {
                    alert('Felicidades!!\nDestruiste todos los barcos.')
                    window.location.reload()
                }

                updateCaja('misiles', totalMisiles-1 )
                updateCaja('barcos', totalBarcos-1 )
                div.setAttribute('class', 'col bg-dark p-3');
                div.setAttribute('id', 'boom');
            
        }
        else{
            if (div.id!='boom' && div.id!="fallaste") {
                
                var audio = new Audio(directory+"../audio/audio.mp3");
                audio.play()
                updateCaja('misiles', totalMisiles-1 )
                div.setAttribute('id', 'fallaste');
                
            }
            
        }

    } else {
        alert('Ya no puedes lanzar mas misiles.')
        window.location.reload()
    }

}

function handleFoco(div) {
    if(div.target.id=='boom'){
    div.target.setAttribute('class', 'col bg-success p-3')
    }
    else{
        if(div.target.id=='fallaste'){
            div.target.setAttribute('class', 'col bg-danger p-3')
        }
        else{
            div.target.setAttribute('class', 'col bg-dark p-3')
        }
    }

}

function handleSinFoco(div) {
    if(div.target.id=='boom'){
    div.target.setAttribute('class', 'col bg-success p-3')
    }
    else{
        if(div.target.id=='fallaste'){
            div.target.setAttribute('class', 'col bg-danger p-3')
        }
        else{
            div.target.setAttribute('class', 'col bg-light p-3')
        }

    }
    
}

function loadCaja(id,total){// esta funcion carga el total de misiles y barcos que restan

    if (total > 0) {
        document.getElementById(id).innerText = total;
    }
}

function totalCaja(id){// esta funcion retorna la cantidad de misiles y barcos que restan
    return document.getElementById(id).textContent
}

function updateCaja(id,valor){// esta funcion actualiza la cantidad de misiles y barcos
    if (id=='misiles' && valor==0 && parseInt(totalCaja('barcos'))>0) {
        alert('Fin del juego.\n.Se acabaron los misiles')
        window.location.reload()
        document.getElementById(id).innerText = valor
    }
    else{
        document.getElementById(id).innerText = valor
    }
    
}