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
// const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
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

// Função para consultar a API estado cidades e clima da capital

document.getElementById('cidade').addEventListener('submit', async function (e) {
		e.preventDefault();
		// Consulta ao CPTEC para obter a previsão do tempo da capital
		// primeira chamada da api para encontrar o id da cidade

	try{	
		const climaResponse = await fetch(`https://brasilapi.com.br/api/cptec/v1/cidade/${cidade}`);
		const climaData = climaResponse.json();
		const cidadeId = climaData.id;
		const NewclimaResponse = await fetch(`https://brasilapi.com.br/api/cptec/v1/clima/previsao/${cidadeId}`);
		const NewclimaData = await NewclimaResponse.json();
		NewclimaData.clima.forEach(item => {
		const api3Element = document.getElementById('resultado');
		api3Element.innerHTML += `
		<div style="display: flex;">
		<div style="flex: 1;">
		<div>
		<p><b>Data: ${item.data}</b></p>
		<p>Tempo: ${item.condicao_desc}</p>
		<p>Temperatura mínima: ${item.min}°C</p>
		<p>Temperatura máxima: ${item.max}°C</p>
		</div>
		</div>`;
		});
		console.log(NewclimaResponse);
	}catch(error){
		console.log('Erro na API 3:', error);
		
	}
	console.log(cidadeId);
	});


//segunda chamada da api para encontrar o clima da cidade
// async function consultarClima(cidadeId) {
	
// 	// Consulta ao CPTEC para obter a previsão do tempo da capital
// 	const climaResponse = await fetch(`https://brasilapi.com.br/api/cptec/v1/clima/previsao/${cidadeId}`);
// 	const climaData = await climaResponse.json();
// 	climaData.clima.forEach(item => {
// 		const api3Element = document.getElementById('resultado');
// 		api3Element.innerHTML += `
// 		<div style="display: flex;">
// 		<div style="flex: 1;">
// 		<div>
// 		<p><b>Data: ${item.data}</b></p>
// 		<p>Tempo: ${item.condicao_desc}</p>
// 		<p>Temperatura mínima: ${item.min}°C</p>
// 		<p>Temperatura máxima: ${item.max}°C</p>
// 		</div>
// 		</div>`;
// 	});
// 	console.log(climaResponse);
// 	console.log(climaData);
// 	console.log(cidadeId);
	
	
	
// }
