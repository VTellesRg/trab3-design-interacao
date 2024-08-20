# Projeto de Integração de APIs

Este projeto demonstra como integrar múltiplas APIs usando JavaScript e exibir os dados em uma página web. As APIs utilizadas incluem:
- APIs BrasilApi RegistroBR, Feriados, previsão do tempo e bancos;
- API de câmbio;
- API de redes de bicicletas; 
- e algumas APIs de imagens.

## Dificuldades Encontradas

1. **Problema de CORS**: Para solucionar problemas de CORS, utilize o link [https://cors-anywhere.herokuapp.com/](https://cors-anywhere.herokuapp.com/). Abra o link e clique no botão "Request temporary access to the demo server".
2. **Filtrar Retornos das APIs**: Filtrar corretamente os retornos das APIs, atentando a detalhes como retorno de Array e de texto plano em imagens.
3. **Utilizar Lógica para Contornar Retornos Blob**: Implementar lógica para contornar retorno não JSON utilizando Blob.

## Instalação
[acesse aqui](https://vtellesrg.github.io/trab3-design-interacao/)

ou

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    ```
2. Navegue até o diretório do projeto:
    ```bash
    cd seu-repositorio
    ```
3. Abra o arquivo `index.html` no seu navegador.

## Uso

1. No topo da pagina haverão as 2 consultas fixas (registroBR e feriados)
2. Para melhor navegação utilize icone do canto superior esquerdo para navegar para as abas Consultas ou Botões
3. Nos Campos de consultas pesquise por cidades brasileiras no primeiro campo e um código de banco no segundo campo:
    - Ao informar uma cidade válida, retornará na tela data, condição climática temperaturas mínima e máxima
    - Ao informar um código de banco válido, retornará na tela Nome do Banco e ISPB
4. Para visualizar possíveis erros basta abrir o console do navegador (geralmente através da tecla de atalho f12)
5. Na seção de botões você pode clicar em "Cotação do dolar e informações" para visualizar:
    - Taxa de câmbio USD-BRL
    - Redes de bicicletas localizadas nos EUA
    - Imagem aleatória de café

## APIs Utilizadas
### API de Registro de site (Brasil API)
- URL: `https://brasilapi.com.br/api/registrobr/v1/{domain}`
- Retorna informações sobre o dominio informado em {domain} brasileiros.

### API de Registro de site (Brasil API)
- URL: `https://brasilapi.com.br/api/feriados/v1/{ano}`
- Retorna informações sobre feriados brasileiros do ano informado em {ano}.

### API de Previsão do Tempo (BrasilAPI)
- URL: `https://brasilapi.com.br/api/cptec/v1/cidade`
- Retorna a previsão do tempo para cidades brasileiras.

### API de Bancos (BrasilAPI)
- URL: `https://brasilapi.com.br/api/bank/v1`
- Retorna informações sobre bancos brasileiros.

### API de Câmbio (USD-BRL)
- URL: `https://economia.awesomeapi.com.br/last/USD-BRL`
- Retorna a taxa de câmbio atual entre USD e BRL.

### API de Redes de Bicicletas
- URL: `https://api.citybik.es/v2/networks?fields=name,location`
- Retorna uma lista de redes de bicicletas ao redor do mundo.
- Filtrado para exibir apenas as redes localizadas nos EUA.

### API de Imagens de Café
- URL: `https://coffee.alexflipnote.dev/random`
- Retorna uma imagem aleatória de café.

### API de Imagens de Keanu Reeves
- URL: `https://placekeanu.com/`
- Retorna uma imagem aleatória de Keanu Reeves.

### API de Imagens de Cachorros
- URL: `https://images.dog.ceo/breeds/image/random`
- Retorna uma imagem aleatória de cachorros.

### API de Imagens Aleatórias
- URL: `https://picsum.photos/200`
- Retorna uma imagem aleatória.

