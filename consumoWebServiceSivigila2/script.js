var headers = new Headers();

function generaCajas() {
    //obtenemos los datos ingresados en la caja de texto
    var datoIngresado = document.getElementById("dato").value;
    //validamos que sea un número, y que no esté vacío
    if (isNaN(datoIngresado) || datoIngresado == "") {
        alert("Debe ingresar un número.No puede quedar vacío ni escribir letras.");
    } else {
        alert("El número digitado fue: " + datoIngresado);





        // crea un nuevo div 
        // y añade contenido 
        var newParentDiv = document.createElement("div");
        newParentDiv.setAttribute('class', 'd-inline-flex flex-wrap');
        // añade el elemento creado y su contenido al DOM 
        var currentDiv = document.getElementById("div");
        document.body.insertBefore(newParentDiv, currentDiv);
        //el ciclo creará cajas hasta el límite determinado por el dato ingresado
        //debe comenzar en 1 el ciclo para que funcione bien con los datos ingresados por teclado
        for (var i = 1; i <= datoIngresado; i++) {
            // crea un nuevo div 
            // y añade contenido 
            var newDiv = document.createElement("div");
            var newContent = document.createTextNode("Campo: " + i);
            newDiv.appendChild(newContent); //añade texto al div creado.  
            // añade el elemento creado y su contenido al DOM 
            var currentDiv = document.getElementById("div");
            document.body.insertBefore(newDiv, currentDiv);


            //creamos elemento de tipo input
            var input = document.createElement("input");
            //establecemos el tipo texto
            input.setAttribute('type', 'text');
            input.name = "caja" + i;
            input.id = "caja" + i;
            //campos en linea
            //input.setAttribute('class', 'd-sm-inline-flex');
            input.setAttribute('class', 'd-sm-flex');


            //le damos bordes al div
            newDiv.setAttribute('style', 'border: thin solid black');

            //asignamos un color a los div pares y otro a los impares
            if (i % 2 == 0) {
                //color azul turquesa a los pares
                newDiv.setAttribute('class', 'p-2 bg-light');
            }
            else {
                //color amarillo a los impares
                newDiv.setAttribute('class', 'p-2 bg-secondary');
            }

            newDiv.appendChild(input); //añade la caja de texto al div creado recientemente. 
            //se crearán tantos div como el número que se haya ingresado en la caja de texto
            newParentDiv.appendChild(newDiv); //añadimos cada div a su padre
        }


    }



}

/*
GET CON HTTPREQUEST
function UserAction() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             alert(this.responseText);
         }
    };
    xhttp.open("GET", "json/personas.json", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send("Your JSON Data Here");
}
*/

/* GET CON FETCH */
function UserAction() {
    //fetch toma como argumento la ruta del recurso que quiere obtener
    // fetch('json/personas.json')     --DESCOMENTARIAR SI SE USA EL JSON PERSONAS COMO ARCHIVO


    // LAS SIGUIENTES LINEAS SON PARA EVITAR EL CORS CUANDO ESTÁ EN EL MISMO SERVIDOR
    var requestOptions = {
        method: 'GET',
        headers: headers,
        mode: 'no-cors',
        cache: 'default'
    };


    fetch('http://localhost:52320/consultaTablaTipoEventoWS.asmx/GetData', requestOptions)
        .then(function (response) {
            //devuelve un objeto promise conteniendo la respuesta, el objeto response
            //response es una respuesta http y no el archivo json, por tanto, usamos el método json() para extraer el contenido
            //return response.json();
            return response;
        })
        .then(function (myJson) {
            //luego de obtener la respuesta  con el contenido del json, lo mostramos en consola
            console.log(myJson);
            //stringify convierte el objeto en json para ser visualizado por el alert, o si no  solo se observa object object
            alert(JSON.stringify(myJson));
        });
}


/* funcion que genera cajas de acuerdo al json leido */
function leerJson() {
    var datoLeido = 0;
    //fetch toma como argumento la ruta del recurso que quiere obtener
    //fetch('json/personas.json')  --DESCOMENTARIAR SI SE USA EL JSON PERSONAS COMO ARCHIVO

    // LAS SIGUIENTES LINEAS SON PARA EVITAR EL CORS CUANDO ESTÁ EN EL MISMO SERVIDOR
    var requestOptions = {
        method: 'GET',
        headers: headers,
        mode: 'no-cors',
        cache: 'default'
    };

    fetch('http://localhost:52320/consultaTablaTipoEventoWS.asmx/GetData', requestOptions)
        .then(function (response2) {
            //devuelve un objeto promise conteniendo la respuesta, el objeto response
            //response es una respuesta http y no el archivo json, por tanto, usamos el método json() para extraer el contenido
            //return response2.json();
            return response2;
        })
        .then(function (myJson2) {

            //contamos la cantidad de elementos que tiene el json en el objeto "personas" y lo guardamos en datoIngresado
            //si no especificamos el objeto, el json solamente tiene un elemento, es decir, solamente tiene el objeto personas
            //datoLeido=Object.keys(myJson2.personas).length ;  --DESCOMENTARIAR SI SE USA EL JSON PERSONAS

            //contamos la cantidad de elementos que tiene el json en el objeto "campos" y lo guardamos en datoIngresado
            //si no especificamos el objeto, el json solamente tiene un elemento, es decir, solamente tiene el objeto personas
            datoLeido = Object.keys(myJson2.table).length;
            //luego de obtener la respuesta  con el contenido del json, lo mostramos en consola. Podemos mostrarlo sin ningún tratamiento ya que la consola permite ver objetos
            console.log(myJson2);
            // console.log('La cantidad de elementos que tiene el json en el objeto "personas" es : '+datoLeido);    ---DESCOMENTARIAR SI SE USA EL JSON PERSONAS
            console.log('La cantidad de elementos que tiene el json en el objeto "campos" es : ' + datoLeido);
            //stringify convierte el objeto en json para ser visualizado por el alert, o si no  solo se observa object object
            alert(JSON.stringify(myJson2));
            // alert('La cantidad de elementos que tiene el json en el objeto "personas" es : '+datoLeido);    --DESCOMENTARIAR SI SE USA EL JSON PERSONAS
            alert('La cantidad de elementos que tiene el json en el objeto "campos" es : ' + datoLeido);

            // crea un nuevo div 
            // y añade contenido 
            var newParentDiv2 = document.createElement("div");
            newParentDiv2.setAttribute('class', 'd-inline-flex flex-wrap');
            // añade el elemento creado y su contenido al DOM 
            var currentDiv2 = document.getElementById("div");
            document.body.insertBefore(newParentDiv2, currentDiv2);
            //el ciclo creará cajas hasta el límite determinado por el dato ingresado
            //el for cuando se trabaja con json si comienza en cero, a diferencia del otro dato que se ingresaba por teclado, donde debia comenzar en uno, ademas la comparación ya no es menor o igual, es solo menor
            for (var i2 = 0; i2 < datoLeido; i2++) {
                // crea un nuevo div 
                // y añade contenido 
                var newDiv2 = document.createElement("div");
                //var newContent2 = document.createTextNode("Campo: "+i2);  --DESCOMENTARIAR SI SE QUIERE CONTENEDOR GENERICO

                // alert(myJson2.campos[i2].nombreCampo);      --DESCOMENTARIAR SI SE QUIERE VER CADA NOMBRE DE CAMPO EN UN ALERT
                //asignamos el nombre del campo de acuerdo al contenido del json
                var newContent2 = document.createTextNode(myJson2.campos[i2].nombreCampo);
                newDiv2.appendChild(newContent2); //añade texto al div creado.  
                // añade el elemento creado y su contenido al DOM 
                var currentDiv2 = document.getElementById("div");
                document.body.insertBefore(newDiv2, currentDiv2);


                //creamos elemento de tipo input
                var input2 = document.createElement("input");
                //establecemos el tipo texto
                //input2.setAttribute('type', 'text'); --DESCOMENTARIAR SI SE QUIERE UN CONTENEDOR GENERICO DE TIPO TEXT

                //asignamos el tipo de dato, de acuerdo al json
                input2.setAttribute('type', myJson2.campos[i2].tipoCampo);
                //input2.name = "caja"+i2; --DESCOMENTARIRAR SI SE QUIERE UN NAME GENERICO
                //input2.id="caja"+i2;   --DESCOMENTARIAR SI SE QUIERE UN ID GENERICO

                //asignamos como name e id, la información del nombre del campo proveniente del json
                input2.name = myJson2.campos[i2].nombreCampo;
                input2.id = myJson2.campos[i2].nombreCampo;

                //campos en linea
                //input.setAttribute('class', 'd-sm-inline-flex');
                input2.setAttribute('class', 'd-sm-flex');
                //le damos bordes al div
                //insertamos función javascript al elemento con el evento onblur, es decir, cuando pierde el foco
                input2.setAttribute('onblur', myJson2.funciones[i2].codigoFuncion);


                newDiv2.setAttribute('style', 'border: thin solid black');
                //asignamos un color a los div pares y otro a los impares
                if (i2 % 2 == 0) {
                    //color azul turquesa a los pares
                    newDiv2.setAttribute('class', 'p-2 bg-light');
                }
                else {
                    //color amarillo a los impares
                    newDiv2.setAttribute('class', 'p-2 bg-secondary');
                }

                newDiv2.appendChild(input2); //añade la caja de texto al div creado recientemente. 
                //se crearán tantos div como el número que se haya ingresado en la caja de texto
                newParentDiv2.appendChild(newDiv2); //añadimos cada div a su padre
            }




        });


}