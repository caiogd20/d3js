let dados = [205, 78, 251, 114, 299, 45, 187];
let svg = d3.select('#grafico');
let largura = parseInt(svg.style('width'));
let altura = parseInt(svg.style('height'));

// Escala para o eixo X (largura das barras)
// O domínio vai de 0 até o valor máximo nos dados
// O alcance vai de 0 até a largura do SVG
let fnx = d3.scaleLinear().domain([0, d3.max(dados)]).range([0, largura]);

// Escala para o eixo Y (posição e altura das barras)
// O domínio vai de 0 até o número de dados
// O alcance vai de 0 até a altura do SVG
let fny = d3.scaleBand()
    .domain(d3.range(dados.length))
    .range([0, altura])
    .padding(0.1); // Adiciona um pequeno espaçamento entre as barras

svg.selectAll('.barra')
    .data(dados)
    .join('rect')
    .attr('class', 'barra')
    .attr('x', 0)
    .attr('y', (d, i) => fny(i))
    .attr('width', d => fnx(d))
    .attr('height', fny.bandwidth());