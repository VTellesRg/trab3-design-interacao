// //Mostrar/esconder o botão "Voltar ao Topo" conforme o usuário rola a página
// window.addEventListener('scroll', function () {
// 	const backToTopButton = document.querySelector('.back-to-top');
// 	if (window.scrollY > 200) {
// 		backToTopButton.style.display = 'block';
// 	} else {
// 		backToTopButton.style.display = 'none';
// 	}
// });

// //Função para retornar suavemente ao topo ao clicar no botão
// document.addEventListener('DOMContentLoaded', function () {
// 	document.querySelector('.back-to-top').addEventListener('click', function (e) {
// 		e.preventDefault();
// 		window.scrollTo({
// 			top: 0,
// 			behavior: 'smooth'
// 		});
// 	});
// });


// para todas as consultas a api realizar try cath
// section 1 - consulta ao brasil api
//nova versao: consultar minha cidade api IBGE
// primeira consulta a 2 apis sempre mostrando na tela essas 2 consultas
// 2 primeiras consultas: todos os estados do brasil!
// ddds de cada estado

// segunda consulta a 2 apis porem recebendo 2 parametros de formularios do usuario
// parametros de consulta: nome do estado (retorna cidades)
// segundo form: codigo de cidade CPTEC (retorna previsao do tempo 1 dia)
//section 2 - consulta a api de sua escolha via 2 botoes
// cada botão retorna consultas em 3 apis distintas
//primeiro botao usando promise.race para retornar a primeira consulta que retornar
//segundo botao usando promise.all para retornar todas as consultas ou mensagem de erro
// botao usando promise.all retornara api da fipe com carros com 10% de desconto via comando js Map
// também retornara 
// em todas as consultas tratar erros com fetch, contornar possiveis erros do usuario


// URL do proxy para contornar problemas de CORS
// Primeira consulta à API 
fetch(`https://brasilapi.com.br/api/feriados/v1/2024`)
	.then(response => response.json())
	.then(data => {
		//renderiza os feriados na tela
		const api1Element = document.getElementById('api1');
		data.forEach(item => {        //formata o item data para o padrao brasileiro
			const formattedDate = new Date(item.date).toLocaleDateString('pt-BR');
			api1Element.innerHTML += `
			<div style="display: flex;">
				<div style="flex: 1;">
					<div>
						<p><b>Feriado: ${item.name}</b></p>
						<p>Data: ${formattedDate}</p>
						<p>Tipo: ${item.type}</p>
					</div>
			</div>`;
		});
	})
	.catch(error => console.error('Erro na API 1:', error));

// Segunda consulta à API retorna apenas o item status da api de consulta do registrobr
fetch(`https://brasilapi.com.br/api/registrobr/v1/viagens.com.br`)
	.then(response => response.json())
	.then(data => {
		const api2Element = document.getElementById('api2');
		api2Element.textContent = `Status: ${data.status}`;
	})
	.catch(error => console.error('Erro na API 2:', error));

// Função para consultar a API de clima

document.getElementById('form-clima').addEventListener('submit', async function (e) {
	e.preventDefault();
	// Obter o valor do campo cidade
	const cidade = document.getElementById('cidade').value;
	const resultadoClima = document.getElementById('resultado-clima');
	let cidadeId; // Variável para armazenar o ID da cidade que será obtido na primeira consulta

	try {
		const climaResponse = await fetch(`https://brasilapi.com.br/api/cptec/v1/cidade/${cidade}`);
		if (!climaResponse.ok) {
			throw new Error('Cidade não encontrada');
		}
		const climaData = await climaResponse.json();
		cidadeId = climaData[0].id; // essa api retorna um array com um objeto, por isso o [0]
	} catch (error) {
		console.log('Erro na API 3:', error);
		return; // Interrompe a execução se houver um erro
	}
	// Segunda chamada à API para obter a previsão do tempo atraves do id da cidade
	try {
		const newClimaResponse = await fetch(`https://brasilapi.com.br/api/cptec/v1/clima/previsao/${cidadeId}`);
		if (!newClimaResponse.ok) {
			throw new Error('Erro ao obter a previsão do tempo');
		}
		const newClimaData = await newClimaResponse.json();
		const Clima = newClimaData.clima[0]; // essa api retorna um objeto com um array de objetos, por isso o [0]
		// console.log(Clima); //para debugar (boa parte da dificuldade foi neste ponto)
		Clima.data = new Date(Clima.data).toLocaleDateString('pt-BR'); //formatar data no formato brasileiro
		Clima.condicao_desc = new String(Clima.condicao_desc).replace(/_/g, ' '); // formatar a descrição da condição do tempo
		Clima.min = Clima.min + '°C'; //concatenar o grau celsius
		Clima.max = Clima.max + '°C';
		let html = '';
		// Exibir a previsão do tempo no elemento resultadoClima
		html += `
		<div style="display: flex;">
			<div style="flex: 1;">
				<div>
					<p><b>Data: ${Clima.data}</b></p>
					<p>Tempo: ${Clima.condicao_desc}</p>
					<p>Temperatura mínima: ${Clima.min}</p>
					<p>Temperatura máxima: ${Clima.max}</p>
				</div>
			</div>
		</div>`;
		resultadoClima.innerHTML = html;
	} catch (error) {
		console.log('Erro na API 3.1:', error);
	}
});

//segunda chamada da api para encontrar o codigo do  banco

document.getElementById('form-banco').addEventListener('submit', async function (e) {
	e.preventDefault();
	const banco = document.getElementById('banco').value;
	const resultadoBanco = document.getElementById('resultado-banco');

	try {
		const bancoResponse = await fetch(`https://brasilapi.com.br/api/banks/v1/${banco}`);
		if (!bancoResponse.ok) {
			throw new Error('Estado não encontrado');
		}
		const bancoData = await bancoResponse.json();
		// console.log(bancoData);

		let html = '';
		// Exibir informacao do banco no campo resultadoBanco
		html += `
		<div style="display: flex;">
			<div style="flex: 1;">
				<div>
					<p><b>Nome: ${bancoData.fullName}</b></p>
					<p>ISPB: ${bancoData.ispb}</p>
				</div>
			</div>
		</div>`;
		resultadoBanco.innerHTML = html;
	} catch (error) {
		console.log('Erro na API 3:', error);
	}
});


// seçao 2 promise.all promise.race
//primeiro botao promise.race
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
document.getElementById('botao2').addEventListener('click', async function () {
	let resultadoPromiseRace = document.getElementById('resultado-botao2');
	resultadoPromiseRace.innerHTML = '';
	Promise.race([
		fetch(`${proxyUrl}https://placekeanu.com/500/300/`),
		fetch('https://images.dog.ceo/breeds/terrier-scottish/n02097298_4162.jpg'),
		fetch('https://picsum.photos/id/237/200/300')
	])
		.then(res => {
			const contentType = res.headers.get('content-type');
			if (contentType && contentType.includes('application/json')) {
				return res.json();
			} else {
				return res.blob(); // ou res.text() dependendo do tipo de resposta esperada
			}
		})
		.then(data => {
			if (data instanceof Blob) {
				const imageUrl = URL.createObjectURL(data);
				resultadoPromiseRace.innerHTML = `
            <div style="display: flex;">
                <div style="flex: 1;">
                    <div>
                        <img src="${imageUrl}" alt="Imagem aleatória">
                    </div>
                </div>
            </div>`;
			} else {
				resultadoPromiseRace.innerHTML = `
            <div style="display: flex;">
                <div style="flex: 1;">
                    <div>
                        <img src="${data.message}" alt="Imagem aleatória">
                    </div>
                </div>
            </div>`;
			}
		})
		.catch(err => console.error('Erro na API imagens aleatorias', err))
});

//segundo botao promise.all
document.getElementById('botao1').addEventListener('click', async function () {
	let resultadoPromiseAll = document.getElementById('resultado-botao1');
	resultadoPromiseAll.innerHTML = '';
	Promise.all([
		fetch('https://economia.awesomeapi.com.br/last/USD-BRL'),
		fetch('https://api.citybik.es/v2/networks?fields=name,location'),
		fetch(`${proxyUrl}https://coffee.alexflipnote.dev/random`)
	])
		.then(responses => {
			return Promise.all(responses.map(response => {
				const contentType = response.headers.get('content-type');
				if (response.ok) {
					if (contentType && contentType.includes('application/json')) {
						return response.json();
					} else {
						return response.blob();
					}
				} else {
					return Promise.reject(response.status);
				}
			}));
		})
		.then(([usdBrlData, cityBikesData, coffeeData]) => {
			// Tratar a resposta da API de câmbio USD-BRL
			const usdBrl = usdBrlData.USDBRL;
			const usdBrlHtml = `
            <div>
                <h3>Câmbio USD-BRL</h3>
                <p>Compra: ${usdBrl.bid}</p>
                <p>Venda: ${usdBrl.ask}</p>
                <p>Variação: ${usdBrl.varBid}</p>
            </div>
        `;
			// Filtrar e tratar a resposta da API de redes de bicicletas para exibir apenas locações dos EUA
			const usCityBikes = cityBikesData.networks.filter(network => network.location.country === 'US');
			const cityBikesHtml = usCityBikes.map(network => `
				<div>
					<h3>Rede de Bicicletas</h3>
					<p>Nome: ${network.name}</p>
					<p>Localização: ${network.location.city}, ${network.location.country}</p>
				</div>
  			`).join('');


			// Tratar a resposta da API de imagens de café
			let coffeeHtml = '';
			if (coffeeData instanceof Blob) {
				const imageUrl = URL.createObjectURL(coffeeData);
				coffeeHtml = `
                <div>
                    <h3>Imagem de Café</h3>
                    <img src="${imageUrl}" alt="Imagem de Café">
                </div>
            `;
			} else {
				coffeeHtml = `
                <div>
                    <h3>Imagem de Café</h3>
                    <img src="${coffeeData.file}" alt="Imagem de Café">
                </div>
            `;
			}

			// Atualizar o HTML com os dados de todas as APIs
			resultadoPromiseAll.innerHTML = usdBrlHtml + cityBikesHtml + coffeeHtml;
		})
		.catch(err => console.error('Erro na API', err))
});