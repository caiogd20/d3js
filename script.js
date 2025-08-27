let dados = [205, 78, 251, 114, 299, 45, 187];
let svg = d3.select('#grafico');
let largura = parseInt(svg.style('width'));
let altura = parseInt(svg.style('height'));

let larguraPlotagem = largura-40
let alturaPlotagem = altura-40

let plotagem = svg.append('g')
    .attr('width',larguraPlotagem)
    .attr('height',alturaPlotagem)
    .attr('transform', 'translate(20, 20)')


// Escala para o eixo X (largura das barras)
// O domínio vai de 0 até o valor máximo nos dados
// O alcance vai de 0 até a largura do SVG
let fnx = d3.scaleLinear()
    .domain([0, dados.length])
    .range([0, larguraPlotagem]);

// Escala para o eixo Y (posição e altura das barras)
// O domínio vai de 0 até o número de dados
// O alcance vai de 0 até a altura do SVG
let fny = d3.scaleLinear()
    .domain([0,d3.max(dados)])
    .range([alturaPlotagem,0])

plotagem.selectAll('.coluna')
    .data(dados)
    .join('rect')
    .attr('class', 'coluna')
    .attr('x', (d, i) => fnx(i))
    .attr('y', (d) => fny(d))
    .attr('width', fnx(1) * 0.9) 
    .attr('height', (d) => alturaPlotagem - fny(d));
plotagem.selectAll('.rotulo')
    .data(dados)
    .enter()
    .append('text')
    .attr('class', 'rotulo')
    .text((d)=>d)
    .attr('x', (d,i)=>fnx(i))
    .attr('dx', ()=>fnx(1)*0.5)
    .attr('y', (d) => fny(d))
    .attr('dy',-5);
    