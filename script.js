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
let tituloX = 'Tipo de pastéis'
let tituloY = 'Quantidade de vendas'

let margem ={
    e: 70,
    d: 20,
    s: 40,
    i: 100
}

let larguraPlotagem = largura - margem.e - margem.d
let alturaPlotagem = altura - margem.s - margem.i

let plotagem = svg.append('g')
    .attr('width',larguraPlotagem)
    .attr('height',alturaPlotagem)
    .attr('transform', 'translate('+margem.e+', '+margem.s+')');


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

let eixoX = d3.axisBottom(fnx)
plotagem.append('g')
    .attr('transform', 'translate(0,'+alturaPlotagem+')')
    .attr('id','eixoX')
    .call(eixoX);

let eixoy = d3.axisLeft(fny)
plotagem.append('g')
    .attr('id','eixoY')
    .call(eixoy);

let grade = d3.axisRight(fny)
    .tickSize(larguraPlotagem)
    .tickFormat('');
plotagem.append('g')
    .attr('id','grade')
    .call(grade);

svg.append('text')
    .attr('x',0)
    .attr('y',0)
    .style('text-anchor', 'middle')
    .attr('transform', 'translate(30,'+(margem.s+alturaPlotagem/2)+') rotate(-90)')
    .text(tituloY);

svg.append('text')
    .attr('x',margem.e)
    .attr('y',margem.s+alturaPlotagem)
    .style('text-anchor', 'middle')
    .attr('transform', 'translate('+larguraPlotagem/2+',80)')
    .text(tituloX);

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