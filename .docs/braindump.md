# Projeto: Buscador de repositórios no Github

O usuário digita um termo e aperta ENTER.
A aplicação faz uma busca na API do Github e exibe os resultados encontrados.

Informações do repositório para exibir:
- Nome e foto do autor
- Nome do repositório
- Descrição do repositório
- Linguagem principal utilizada
- Número de estrelas
- Link direto para o repositório

A busca só funciona ao apertar ENTER
Deve exibir um "loading state" enquanto faz a busca.
Se não tiver resultado, exibir um "empty state".
Em caso de erro, exibir mensagem amigável.

Para a requisição, utilize um fetch.
Coloque o fetch dentro de um try/catch com async/await.
Verifique statuscode para prosseguir.

Todos os eventos devem ser definidos no javascript, sem nenhum evento definido no HTML.

URL da api do Github para pesquisar repositórios:
https://api.github.com/search/repositories?q={PALAVRA-CHAVE}&sort=stars&per_page=10
- Substituir {PALAVRA-CHAVE} pelo termo que o usuário digitou.

Instruções visuais:
- Um card para o campo de busca com borda arredondada
- Um card para o resultado da busca com borda arredondada
- Fundo mais escuro que os cards.
- Página inteira centralizada com limite de largura de 700px para o conteúdo