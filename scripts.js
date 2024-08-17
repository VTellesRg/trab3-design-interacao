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



// Primeira consulta à API
fetch('https://brasilapi.com.br/api/cnpj/v1/41030394000108')
	.then(response => response.json())
	.then(data => {
		const api1Element = document.getElementById('api1');
		api1Element.textContent = `Situação Cadastral: ${data.descricao_situacao_cadastral}`;
	})
	.catch(error => console.error('Erro na API 1:', error));

// Segunda consulta à API
fetch('https://brasilapi.com.br/api/registrobr/v1/meucarronovo.com.br')
	.then(response => response.json())
	.then(data => {
		const api2Element = document.getElementById('api2');
		api2Element.textContent = `Status: ${data.status}`;
	})
	.catch(error => console.error('Erro na API 2:', error));

// Função para consultar a API FIPE e renderizar as informações
