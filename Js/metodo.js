
var a;
var b;
var n;
var ecuacion;
var grafica;

var equis={
    type: 'line',
    label:"Area",
    data: [
    ],
    backgroundColor: 'rgba(255, 26, 104, 0.2)',
        borderColor: 'rgba(255, 26, 104, 1)',
        borderWidth: 3,
        pointRadius: 0
};

var funcionX = {
    type: 'line',
    label: 'F(x)',
    data: [],
    backgroundColor: 'rgb(0, 139, 139)',
    borderColor: 'rgb(0, 139, 139)',
    borderWidth: 1,
    pointRadius: 0
};

var puntos = {
    type: 'line',
    label:"Puntos",
    data: [],
    backgroundColor: 'rgba(255, 26, 104, 1)',
        borderColor: 'rgba(255, 26, 104, 1)',
        borderWidth: 0,
        pointRadius: 4
}

function graficaFX(){
    let rango, x1, y1,scope;
            rango = (b-a) / 20;
            x1 = a-(rango);
            while (x1 <=b+(rango))
            {
                scope = {
                    x: x1
                }
                y1 = math.evaluate(ecuacion,scope);
                funcionX.data.push({x:x1,y:y1});
                x1 += rango;
            }
}

var data = {
    labels:[],
    datasets: [funcionX,equis,puntos]
  };

  var config = {
    type: 'line',
    data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
        x: {
            type: 'linear',
            position: 'bottom',
            }
      }
    }
  };

function resolver(){
    try{
      if(grafica){
        funcionX.data = []
        equis.data = []
        puntos.data = []
        grafica.destroy();
    }
    a = parseFloat(document.getElementById('a').value);
    b = parseFloat(document.getElementById('b').value);
    n = parseFloat(document.getElementById('n').value);
    ecuacion = (document.getElementById('ecuacion').value);

    if(b<a)
    {
        alert("El valor de b debe ser mayor al valor de a");
    }else{
        if (n == 1)
                {
                    intervalo();
                }
                else if (n > 1)
                {
                    subintervalos();
                }else if(n<1){
                    alert("Debe haber al menos un intervalo");
                }
    }   
    }catch{
        alert("Lo sentimos. Ocurrio un error inesperado.");
    }
           
}

function intervalo(){
        
        var fxb, fxa,r;

        var scope={
            x:b
        }
        fxb = math.evaluate(ecuacion,scope);

        scope={
            x:a
        }
        fxa = math.evaluate(ecuacion,scope);

        r = (b - a)*((fxa+fxb)/2);
        document.getElementById('lbresultado').innerHTML = 'Resultado: ' + r;
        alert("La aproximacion del area es: "+r);
        graficaFX();
        equis.data.push({x:a, y:0});
        equis.data.push({x:a, y:fxa});
        equis.data.push({x:b, y:fxb});
        equis.data.push({x:b, y:0});
        equis.data.push({x:a, y:0});
        puntos.data = equis.data;

        grafica = new Chart(
            document.getElementById('grafica'),
            config
            );
    
}

function subintervalos(){
                var fx = [100];
                var x = [100];
                var h = (b - a) / n;
                var auxh = a;
                var r=0;
                var auxn = n;

                var scope={
                    x:a
                }
                fx[0] = math.evaluate(ecuacion,scope);
                r += fx[0];

                for (var i = 1;i<=n;i++)
                {
                    auxh = auxh + h;
                    x[i] = auxh;
                    scope={
                        x:auxh
                    }
                    fx[i] = math.evaluate(ecuacion,scope);
                }

                for(let j=1;j< n; j++)
                {
                    r += 2 * (fx[j]);
                }

                equis.data.push({x:a, y:0});
                for(let i = 0; i<=n; i++)
                {
                    if(i == 0)
                    {
                        equis.data.push({x:a,y:fx[i]});
                    }
                    else
                    if (i == n)
                    {
                        equis.data.push({x:b,y:fx[i]});
                    }
                    else
                    {
                        equis.data.push({x:x[i],y:fx[i]});
                    }
                }
                equis.data.push({x:b, y:0});
                equis.data.push({x:a, y:0});

                puntos.data = equis.data;

                r += fx[auxn];
                r *= (h / 2);
                document.getElementById('lbresultado').innerHTML = 'Resultado: ' + r;
                alert("La aproximacion del area es: "+r);
                graficaFX();

                grafica = new Chart(
                    document.getElementById('grafica'),
                    config
                    );
}