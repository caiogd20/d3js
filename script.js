let dataset = [10, 20, 30, 40];

// 1. Seleciona todos os 'divs' que têm a classe 'barra' dentro do '#grafico'.
let grafico = d3.select('#grafico').selectAll('div.barra');

// 2. Vincula os dados e gera as três seleções: 'update', 'enter' e 'exit'.
let graficoupdate = grafico.data(dataset);

// 3. SELEÇÃO DE ENTER: Adiciona novos 'divs' para os dados que não têm um elemento correspondente.
//    (Os dados 30 e 40, neste caso)
graficoupdate.enter().append('div')
    .attr('class', 'barra') // Adiciona a classe 'barra' para aplicar os estilos do CSS
    .text((d) => d)
    .style('width', (d) => d * 10 + 'px');

// 4. SELEÇÃO DE UPDATE: Atualiza os 'divs' que já existem na página.
//    (Os dados 10 e 20)
graficoupdate
    .text((d) => d)
    .style('width', (d) => d * 10 + 'px');

// 5. SELEÇÃO DE EXIT: Remove os 'divs' que não têm mais dados correspondentes.
graficoupdate.exit().remove();