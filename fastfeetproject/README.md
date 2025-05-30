Nesse desafio desenvolveremos uma API para controle de encomendas de uma transportadora fictícia, a FastFeet.

criar apostila 
[] - import/providers para implementar classes 
[] - Config Module
[] - configuracao env
[] - docker-compose
[] - criacao ambiente prisma
[] - configuracao vitest + configuracao ambiente isolado
[] - configuracao auth
[] - configuracao tsconfig
[] - configuracao eslint
[] - configuracao useguard
[] - configuracao mappers e presenters

falta 
[] - criar teste unitario para destinatario
[] - criar teste unitario para usuário 

[] - mappers
[] - repositorios prisma

duvidas
[] - rever video zod validation pipe
[] - rever authentication

passo a passo testes E2E
- instalar vitest swc $ npm i --save-dev vitest unplugin-swc @swc/core @vitest/coverage-v8
- criar vitest.config.ts
- criar banco de dados isolados 

## Encomenda ( order )
* Quando a encomenda é criada, ela começa no estado AVAILABLE ( aguardando retirada ) - WAITING_PICKUP
* O Entregador pode clicar na encomenda disponivel e clicar em retirar, e a encomendo fica com status 'AGUARDANDO' WAITING
* Quando entregar ficara com status 'delivered'

[x] - Deve ser possível realizar o CRUD das encomendas
[x] - Deve ser possível marcar uma encomenda como aguardando (Disponível para retirada)
[x] - Deve ser possível retirar uma encomenda
[x] - Deve ser possível marcar uma encomenda como entregue
[x] - Deve ser possível marcar uma encomenda como devolvida
[] - Deve ser possível listar as encomendas do entregador
[] - Deve ser possível listar as encomendas com endereços de entrega próximo ao local do entregador

### Regras da aplicação

[x] - A aplicação deve ter dois tipos de usuário, entregador e/ou admin
[x] - Deve ser possível realizar login com CPF e Senha
[] - Deve ser possível realizar o CRUD dos entregadores
[] - Deve ser possível realizar o CRUD dos destinatários
[] - Deve ser possível alterar a senha de um usuário
[] - Deve ser possível listar as entregas de um usuário
[] - Deve ser possível notificar o destinatário a cada alteração no status da encomenda

### Regras de negócio

[] - Somente usuário do tipo admin pode realizar operações de CRUD nas encomendas
[] - Somente usuário do tipo admin pode realizar operações de CRUD dos entregadores
[] - Somente usuário do tipo admin pode realizar operações de CRUD dos destinatários
[] - Para marcar uma encomenda como entregue é obrigatório o envio de uma foto
[x] - Somente o entregador que retirou a encomenda pode marcar ela como entregue
[] - Somente o admin pode alterar a senha de um usuário
[] - Não deve ser possível um entregador listar as encomendas de outro entregador

### Conceitos que pode praticar

[] - DDD, Domain Events, Clean Architecture
[] - Autenticação e Autorização (RBAC)
[] - Testes unitários e e2e
[] - Integração com serviços externos

### Contexto da aplicação

É comum ao estar desenvolvendo uma API, imaginar como esses dados vão estar sendo utilizados pelo cliente web e/ou mobile.

Por isso, deixamos abaixo o link para o layout da aplicação que utilizaria essa API.

[FastFeet](https://www.figma.com/file/hn0qGhnSHDVst7oaY3PF72/FastFeet?type=design&node[] -id=0:1&mode=design&t=eLVBsXQU7wYugimZ[] -1)
r
## Entrega

Após concluir o desafio, você deve enviar a URL do seu código no GitHub para a plataforma.

Além disso, que tal fazer um post no LinkedIn compartilhando o seu aprendizado e contando como foi a experiência?

É uma excelente forma de demonstrar seus conhecimentos e atrair novas oportunidades!

Feito com 💜 por Rocketseat 👋
