
        // Configuração global dos gráficos
        Chart.defaults.font.family = 'Arial';
        Chart.defaults.font.size = 12;

        // Cores vibrantes para os gráficos
        const colors = [
                '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
                '#DDA0DD', '#98D8E8', '#F7DC6F', '#BB8FCE', '#85C1E9',
                '#F8C471', '#82E0AA', '#F1948A', '#85C1E9'
        ];

        // Gráfico de Setores
        const sectorsData = {
            labels:  ["Educação", "Entretenimento", "Ciência", "Política", "Saúde", "Economia", "Agricultura", "Direitos", "Meio Ambiente", "Justiça", "Transporte", "Publicidade", "Computação"],
            datasets: [{
                data: [24.594594594594597, 12.972972972972974, 12.972972972972974, 11.081081081081082, 10.54054054054054, 10.54054054054054, 4.054054054054054, 4.054054054054054, 3.783783783783784, 2.7027027027027026, 2.1621621621621623, 0.2702702702702703, 0.2702702702702703],
                backgroundColor: 'rgba(54, 162, 235, 0.7)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        }

        //Dados top
        const otimismoTop = ["Alinhamento aos valores humanos", "Ado\u00e7\u00e3o por profissionais (sa\u00fade/educa\u00e7\u00e3o)", "Ampliar produtividade em setores diversos", "Reduzir desigualdades regionais/sociais", "Promover equidade no recrutamento"]
        const receioTop = ["Combater manipula\u00e7\u00e3o de vulner\u00e1veis.", "Solu\u00e7\u00f5es alinhadas \u00e0 realidade brasileira.", "Orientar uso sem comprometer empregos.", "Conter defasagem tecnol\u00f3gica internacional.", "Desenvolvimento com valores democr\u00e1ticos."]

        // Histograma de Receios e Otimismos
        const labels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        const receiosData = [3.225806451612903, 2.4193548387096775, 7.258064516129033, 4.838709677419355, 5.64516129032258, 19.35483870967742, 9.67741935483871, 16.93548387096774, 16.129032258064516, 4.032258064516129, 10.483870967741936]
        const otimismosData = [1.574803149606299, 1.574803149606299, 5.511811023622047, 0.7874015748031495, 6.299212598425196, 18.89763779527559, 8.661417322834646, 7.086614173228346, 23.62204724409449, 8.661417322834646, 17.322834645669293]
        const yLimit = 28

        // Gráfico de Definições de IA
        const definitionsData = [{"category": "Processamento de Dados / Algoritmos", "count": 27, "example": "Um algoritmo probabilística que está em constante trabalho de acertar a maioria das vezes"}, {"category": "Aprendizado / Inteligência", "count": 15, "example": "Inteligência Artificial, que é um ramo da ciência da computação que busca criar sistemas capazes de simular a inteligência humana."}, {"category": "Assistente / Facilitador", "count": 15, "example": "É uma ferramenta que agiliza atividades e aumenta a acessibilidade de conhecimentos"}, {"category": "Criação / Conteúdo", "count": 12, "example": "Conjunto de tecbologias com profundo potencial de suporte para criação de conhecimento e desenvolvimento da humanidade."}, {"category": "Base de dados / Pesquisa", "count": 4, "example": "É como uma rede de pesquisa, mas que pode entender e responder como uma “pessoa”. Podendo gerar conversas  e ao mesmo tempo trazer resultados de pesquisas em forma de conversa."}]

        const futureDirectionsData = {"Produtividade vs Competividade": {"opcao1": "Ampliar produtividade em setores diversos", "opcao2": "Conter defasagem tecnológica internacional.", "valor1": 63, "valor2": 37}, "Impacto Social vs Proteção Trabalhista": {"opcao1": "Adoção por profissionais (saúde/educação)", "opcao2": "Orientar uso sem comprometer empregos.", "valor1": 60, "valor2": 40}, "Inclusão Social vs Autonomia Tecnológica": {"opcao1": "Reduzir desigualdades regionais/sociais", "opcao2": "Soluções alinhadas à realidade brasileira.", "valor1": 55, "valor2": 45}, "Ética Individual vs Ética Democrática": {"opcao1": "Alinhamento aos valores humanos", "opcao2": "Desenvolvimento com valores democráticos.", "valor1": 75, "valor2": 25}, "Equidade no Trabalho vs Proteção de Vulneráveis": {"opcao1": "Promover equidade no recrutamento", "opcao2": "Combater manipulação de vulneráveis.", "valor1": 25, "valor2": 75}}


        // Mapear ícones e classes CSS para cada categoria
        const categoryConfig = {
                'Processamento de Dados / Algoritmos': { icon: '💾', class: 'processing-card' },
                'Base de dados / Pesquisa': { icon: '📊', class: 'research-card' },
                'Assistente / Facilitador': { icon: '👥', class: 'assistant-card' },
                'Aprendizado / Inteligência': { icon: '🎓', class: 'learning-card' },
                'Criação / Conteúdo': { icon: '🎨', class: 'creation-card' },
                'Definição Técnica': { icon: '🔬', class: 'tech-card' },
                'Analogia com Humanos': { icon: '👤', class: 'human-card' },
                'Aplicações Práticas': { icon: '⚙️', class: 'practical-card'},
                'Conceito Simples': { icon: '💡', class: 'simple-card' },
                'Visão Futurista': { icon: '🚀', class: 'future-card' },
                // Adicione mais mapeamentos conforme necessário
                'Conceito Geral': { icon: '🧠', class: 'general-card' },
                'Impacto Social': { icon: '🌍', class: 'social-card' },
                'Automação': { icon: '🤖', class: 'automation-card' },
        };

        new Chart(document.getElementById('sectorsChart'), {
            type: 'bar',
            data: sectorsData,
            options: {
                indexAxis: "y",
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ctx.raw + "%" } }},
                scales: { x: { ticks: { callback: v => v + "%" } }}
            }
        });



        new Chart(document.getElementById('receiosHistogram'), {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: '',
                    data: receiosData,
                    backgroundColor: 'rgba(225, 112, 85, 0.7)',
                    borderColor: 'rgba(225, 112, 85, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { title: { display: true, text: 'Distribuição de Preocupações (Escala 1-10)'}, legend: { display: false}},
                scales: { y: { beginAtZero: true, max:yLimit, title: { display: true, text: `Proporção de Respostas (%)`}},
                       x: {title: { display: true, text: 'Intensidade (1=Baixa, 10=Alta)'}}
                }
            }
        });

  

        new Chart(document.getElementById('otimismosHistogram'), {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: '',
                    data: otimismosData,
                    backgroundColor: 'rgba(0, 184, 148, 0.7)',
                    borderColor: 'rgba(0, 184, 148, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: true, text: 'Distribuição de Otimismo (Escala 1-10)'},
                    legend: { display: false}
                },
                scales: { y: { beginAtZero: true, max: yLimit, title: { display: true, text: 'Proporção de Respostas (%)'}},
                    x: {title: { display: true, text: 'Intensidade (1=Baixa, 10=Alta)'}}
                }
            }
        });

        // Inserir perfil demográfico
        document.addEventListener('DOMContentLoaded', function() {
            const container = document.getElementById('demographicsContainer');
            if(container) {
                 container.innerHTML = `
                        <div class="demo-card">
<h4>🎂 Faixa Etária</h4>

            <div class="demo-item">
                <span class="demo-label">18-24 anos</span>
                <div class="demo-bar" style="width: 100px;"></div>
                <span class="demo-perc">64.6%</span>
            </div>
           
            
            <div class="demo-item">
                <span class="demo-label">25-34 anos</span>
                <div class="demo-bar" style="width: 20px;"></div>
                <span class="demo-perc">13.4%</span>
            </div>
           
            
            <div class="demo-item">
                <span class="demo-label">35-44 anos</span>
                <div class="demo-bar" style="width: 18px;"></div>
                <span class="demo-perc">11.8%</span>
            </div>
           
            
            <div class="demo-item">
                <span class="demo-label">45-54 anos</span>
                <div class="demo-bar" style="width: 7px;"></div>
                <span class="demo-perc">4.7%</span>
            </div>
           
            
            <div class="demo-item">
                <span class="demo-label">55-64 anos</span>
                <div class="demo-bar" style="width: 4px;"></div>
                <span class="demo-perc">3.1%</span>
            </div>
           
            
            <div class="demo-item">
                <span class="demo-label">18- anos</span>
                <div class="demo-bar" style="width: 1px;"></div>
                <span class="demo-perc">0.8%</span>
            </div>
           
            
            <div class="demo-item">
                <span class="demo-label">65+ anos</span>
                <div class="demo-bar" style="width: 1px;"></div>
                <span class="demo-perc">0.8%</span>
            </div>
           
            
            <div class="demo-item">
                <span class="demo-label">Não informar</span>
                <div class="demo-bar" style="width: 1px;"></div>
                <span class="demo-perc">0.8%</span>
            </div>
           
            </div>

                        <div class="demo-card">
<h4>👤 Gênero</h4>

            <div class="demo-item">
                <span class="demo-label">Masculino</span>
                <div class="demo-bar" style="width: 100px;"></div>
                <span class="demo-perc">57.1%</span>
            </div>
           
            
            <div class="demo-item">
                <span class="demo-label">Feminino</span>
                <div class="demo-bar" style="width: 68px;"></div>
                <span class="demo-perc">38.9%</span>
            </div>
           
            
            <div class="demo-item">
                <span class="demo-label">Não binário</span>
                <div class="demo-bar" style="width: 4px;"></div>
                <span class="demo-perc">2.4%</span>
            </div>
           
            
            <div class="demo-item">
                <span class="demo-label">Gênero fluído </span>
                <div class="demo-bar" style="width: 1px;"></div>
                <span class="demo-perc">0.8%</span>
            </div>
           
            
            <div class="demo-item">
                <span class="demo-label">Não informar</span>
                <div class="demo-bar" style="width: 1px;"></div>
                <span class="demo-perc">0.8%</span>
            </div>
           
            </div>
 
                        <div class="demo-card">
<h4>📍 Estado</h4>

            <div class="demo-item">
                <span class="demo-label">MG</span>
                <div class="demo-bar" style="width: 100px;"></div>
                <span class="demo-perc">40.5%</span>
            </div>
           
            
            <div class="demo-item">
                <span class="demo-label">RS</span>
                <div class="demo-bar" style="width: 27px;"></div>
                <span class="demo-perc">11.1%</span>
            </div>
           
            
            <div class="demo-item">
                <span class="demo-label">AM</span>
                <div class="demo-bar" style="width: 27px;"></div>
                <span class="demo-perc">11.1%</span>
            </div>
           
            
            <div class="demo-item">
                <span class="demo-label">AL</span>
                <div class="demo-bar" style="width: 27px;"></div>
                <span class="demo-perc">11.1%</span>
            </div>
           
            
            <div class="demo-item">
                <span class="demo-label">CE</span>
                <div class="demo-bar" style="width: 11px;"></div>
                <span class="demo-perc">4.8%</span>
            </div>
           
            
            <div class="demo-item">
                <span class="demo-label">SE</span>
                <div class="demo-bar" style="width: 9px;"></div>
                <span class="demo-perc">4.0%</span>
            </div>
           
            
            <div class="demo-item">
                <span class="demo-label">PB</span>
                <div class="demo-bar" style="width: 9px;"></div>
                <span class="demo-perc">4.0%</span>
            </div>
           
            
            <div class="demo-item">
                <span class="demo-label">BA</span>
                <div class="demo-bar" style="width: 7px;"></div>
                <span class="demo-perc">3.2%</span>
            </div>
           
            
            <div class="demo-item">
                <span class="demo-label">GO</span>
                <div class="demo-bar" style="width: 5px;"></div>
                <span class="demo-perc">2.4%</span>
            </div>
           
            
            <div class="demo-item">
                <span class="demo-label">SP</span>
                <div class="demo-bar" style="width: 5px;"></div>
                <span class="demo-perc">2.4%</span>
            </div>
           
            
            <div class="demo-item">
                <span class="demo-label">RJ</span>
                <div class="demo-bar" style="width: 3px;"></div>
                <span class="demo-perc">1.6%</span>
            </div>
           
            
            <div class="demo-item">
                <span class="demo-label">RN</span>
                <div class="demo-bar" style="width: 1px;"></div>
                <span class="demo-perc">0.8%</span>
            </div>
           
            
            <div class="demo-item">
                <span class="demo-label">PE</span>
                <div class="demo-bar" style="width: 1px;"></div>
                <span class="demo-perc">0.8%</span>
            </div>
           
            
            <div class="demo-item">
                <span class="demo-label">PA</span>
                <div class="demo-bar" style="width: 1px;"></div>
                <span class="demo-perc">0.8%</span>
            </div>
           
            
            <div class="demo-item">
                <span class="demo-label">TO</span>
                <div class="demo-bar" style="width: 1px;"></div>
                <span class="demo-perc">0.8%</span>
            </div>
           
            
            <div class="demo-item">
                <span class="demo-label">SC</span>
                <div class="demo-bar" style="width: 1px;"></div>
                <span class="demo-perc">0.8%</span>
            </div>
           
            </div>
 
                        <div class="demo-card">
<h4>💼 Profissão</h4>

            <div class="demo-item">
                <span class="demo-label">Graduação</span>
                <div class="demo-bar" style="width: 100px;"></div>
                <span class="demo-perc">69.0%</span>
            </div>
           
            
            <div class="demo-item">
                <span class="demo-label">Docente</span>
                <div class="demo-bar" style="width: 22px;"></div>
                <span class="demo-perc">15.9%</span>
            </div>
           
            
            <div class="demo-item">
                <span class="demo-label">Pós Graduação</span>
                <div class="demo-bar" style="width: 9px;"></div>
                <span class="demo-perc">6.3%</span>
            </div>
           
            
            <div class="demo-item">
                <span class="demo-label">Técnico-científico</span>
                <div class="demo-bar" style="width: 5px;"></div>
                <span class="demo-perc">4.0%</span>
            </div>
           
            
            <div class="demo-item">
                <span class="demo-label">Pesquisador</span>
                <div class="demo-bar" style="width: 2px;"></div>
                <span class="demo-perc">1.6%</span>
            </div>
           
            
            <div class="demo-item">
                <span class="demo-label">Técnica de tecnologia da ufmg</span>
                <div class="demo-bar" style="width: 1px;"></div>
                <span class="demo-perc">0.8%</span>
            </div>
           
            
            <div class="demo-item">
                <span class="demo-label">Não informar</span>
                <div class="demo-bar" style="width: 1px;"></div>
                <span class="demo-perc">0.8%</span>
            </div>
           
            
            <div class="demo-item">
                <span class="demo-label">Bacharel em filosofia, estudando ti independentemente</span>
                <div class="demo-bar" style="width: 1px;"></div>
                <span class="demo-perc">0.8%</span>
            </div>
           
            
            <div class="demo-item">
                <span class="demo-label">Estudante de ensino médio/técnico</span>
                <div class="demo-bar" style="width: 1px;"></div>
                <span class="demo-perc">0.8%</span>
            </div>
           
            </div>
 
                                 
                 `;
            }
        });

        //Top Otimismos
         document.getElementById('otimismoTop10').innerHTML = otimismoTop
            .map((item, index) => `
                <div class='top-item'>
                    <span>${item}</span>
                    <span class='rank-badge'>${index + 1}</span>
                </div>
            `).join('');

        //Top Receios
        document.getElementById('receioTop10').innerHTML = receioTop
            .map((item, index) => `
                <div class='top-item'>
                    <span>${item}</span>
                    <span class='rank-badge'>${index + 1}</span>
                </div>
            `).join('');


        // Função para criar cards dinamicamente
        function createDefinitionsCards() {
        
            const container = document.getElementById('definitionsGrid');
        
            definitionsData.forEach(item => {
                const card = document.createElement('div');
                card.className = 'definition-card';
            
                card.innerHTML = `
                    <h4>${item.category}</h4>
                    <div class="definition-count">${item.count}</div>
                    <p>"${item.example}"</p>
                `;
            
                container.appendChild(card);
            });
        }

        // Gerar cards de direções futuras
        function createFutureDirectionsCards() {
            const container = document.getElementById('futureDirectionsGrid');
            
            Object.entries(futureDirectionsData).forEach(([title, data]) => {
                const card = document.createElement('div');
                card.className = 'direction-card';
                
                card.innerHTML = `
                    <h4>${title}</h4>
                    <div style="display: flex; flex-direction: column; gap: 15px; margin: 20px 0;">
                        <div style="text-align: center; padding: 15px; background: rgba(102, 126, 234, 0.1); border-radius: 8px;">
                            <div style="font-weight: bold; color: #667eea; margin-bottom: 8px;">${data.opcao1}</div>
                            <div class="direction-percentage">${data.valor1}%</div>
                        </div>
                        <div style="text-align: center; font-weight: bold; color: #999;">vs</div>
                        <div style="text-align: center; padding: 15px; background: rgba(118, 75, 162, 0.1); border-radius: 8px;">
                            <div style="font-weight: bold; color: #764ba2; margin-bottom: 8px;">${data.opcao2}</div>
                            <div class="direction-percentage">${data.valor2}%</div>
                        </div>
                    </div>
                `;
                
                container.appendChild(card);
            });
        }




        // Chamar a função para criar os cards
        function createSankey(nodesData, linksData, containerId, width=900, height=500) {
            const container = document.getElementById(containerId);
            container.innerHTML = "";
            const svg = d3.select(container)
                .append('svg')
                .attr('width', width)
                .attr('height', height);
            const sankeyGenerator = d3.sankey()
                .nodeWidth(20)
                .nodePadding(10)
                .extent([[1, 1], [width - 1, height - 6]]);
            const graph = sankeyGenerator({ 
                nodes: nodesData.map(d => Object.assign({}, d)),
                links: linksData.map(d => Object.assign({}, d))
            });

            // Links
            svg.append('g')
                .selectAll('path')
                .data(graph.links)
                .join('path')
                .attr('d', d3.sankeyLinkHorizontal())
                .attr('stroke-width', d => Math.max(1, d.width))
                .attr('stroke', '#69b3a2')
                .attr('fill', 'none')
                .attr('opacity', 0.5);

            // Nós
            svg.append('g')
                .selectAll('rect')
                .data(graph.nodes)
                .join('rect')
                .attr('x', d => d.x0)
                .attr('y', d => d.y0)
                .attr('height', d => d.y1 - d.y0)
                .attr('width', sankeyGenerator.nodeWidth())
                .attr('fill', '#4e79a7')
                .attr('stroke', '#000');

            //Labels
            svg.append('g')
                .selectAll('text')
                .data(graph.nodes)
                .join('text')
                .attr('x', d => d.x0 - 6)
                .attr('y', d => (d.y1 + d.y0) / 2)
                .attr('dy', '0.35em')
                .attr('text-anchor', 'end')
                .style('font-size', d => d.targetLinks.length > 0 ? '11px' : '14px')
                .text(d => {
                    const total = d.targetLinks ? d.targetLinks.reduce((sum, l) => sum + l.value, 0) : 0;
                    return d.name + (total > 0 ? ' ( ' + total + ')' : '');
                })
                .filter(d => d.x0 < width / 2)
                .attr('x', d => d.x1 + 6)
                .attr('text-anchor', 'start');
        };




        // Inicializar ao carregar a página
        document.addEventListener("DOMContentLoaded", function() {
            //createDemographicsCards();
            createFutureDirectionsCards();
            createDefinitionsCards();

            if (typeof createSankey === "function") {
                if (typeof sankeyFearsData !== "undefined") {
                    createSankey(sankeyFearsData.nodes, sankeyFearsData.links, "sankeyContainerFears", 900, 500);
                }
                if (typeof sankeyHopesData !== "undefined") {
                    createSankey(sankeyHopesData.nodes, sankeyHopesData.links, "sankeyContainerHopes", 900, 500);
                }
            }

        });

    