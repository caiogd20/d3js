let dados = [
    {chave: 'Frango', valor: 56},
    {chave: 'Carne', valor: 73},
    {chave: 'Vegetariano', valor: 29},
    {chave: 'Queljo', valor: 135},
    {chave: 'Golabada', valor: 44},
    {chave: 'Banana', valor: 60},
    {chave: 'Calabresa', valor: 33}
];
let svg = d3.select('#grafico');
let largura = parseInt(svg.style('width'));
let altura = parseInt(svg.style('height'));

let larguraPlotagem = largura-40
let alturaPlotagem = altura-40

let plotagem = svg.append('g')
    .attr('width',larguraPlotagem)
    .attr('height',alturaPlotagem)
    .attr('transform', 'translate(20, 20)');


// Escala para o eixo X (largura das barras)
// O domínio vai de 0 até o valor máximo nos dados
// O alcance vai de 0 até a largura do SVG
let fnx = d3.scaleBand()
    .domain(dados.map(d=>d.chave))
    .range([0, larguraPlotagem])
    .padding(0.1);

// Escala para o eixo Y (posição e altura das barras)
// O domínio vai de 0 até o número de dados
// O alcance vai de 0 até a altura do SVG
let fny = d3.scaleLinear()
    .domain([0,d3.max(dados.map(d=>d.valor))])
    .range([alturaPlotagem,0])

let fnCores =d3.scaleLinear()
    .domain([0,d3.max(dados.map(d=>d.valor))])
    .range(['#edf8e9','#005a32'])

plotagem.selectAll('.coluna')
    .data(dados)
    .join('rect')
    .attr('class', 'coluna')
    .attr('x', (d) => fnx(d.chave))
    .attr('y', (d) => fny(d.valor))
    .attr('width', fnx.bandwidth()) 
    .attr('height', (d) => alturaPlotagem - fny(d.valor))
    .attr('fill',(d)=>fnCores(d.valor));
plotagem.selectAll('.rotulo')
    .data(dados)
    .enter()
    .append('text')
    .attr('class', 'rotulo')
    .text((d)=>d.valor)
    .attr('x', (d)=>fnx(d.chave))
    .attr('dx', fnx.bandwidth()*0.5)
    .attr('y', (d) => fny(d.valor))
    .attr('dy',-5);