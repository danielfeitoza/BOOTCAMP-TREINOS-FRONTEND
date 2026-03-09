Siga rigorosamente as regras do projeto (.github\copilot-instructions.md, padrões de código, tipagem, lint, arquitetura existente e componentes já usados no app). Não invente fluxo paralelo.

Objetivo:
Implementar o fluxo de pareamento do smartwatch no frontend web, lendo os parâmetros da URL:
- deviceCode (UUID)
- deviceName (string)

Cenário:
Quando o usuário acessar uma URL como:
`/parear?deviceCode=123e4567-e89b-12d3-a456-426614174000&deviceName=Amazfit%20GTS%204`
o app deve:
1) verificar se o usuário está logado;
2) se não estiver logado, redirecionar para login e garantir retorno para a mesma URL de pareamento;
3) após login, chamar a API para vincular o dispositivo ao usuário autenticado;
4) mostrar feedback de sucesso/erro;
5) evitar chamadas repetidas em loop.

API a ser usada (backend já pronto):
- POST `/smartwatch/pair`
- Body JSON:
{
  "deviceCode": "uuid",
  "deviceName": "string"
}
- Requer autenticação por sessão/cookie (better-auth já existente no projeto).

Regras de implementação:
- Criar/usar service específico para smartwatch (ex.: `pairSmartwatch`).
- Validar parâmetros da URL antes da chamada:
  - `deviceCode` obrigatório e formato UUID.
  - `deviceName` obrigatório (decode URL).
- Em caso de erro 409 (`SMARTWATCH_DEVICE_CODE_IN_USE`), mostrar mensagem amigável.
- Em caso de erro 401, redirecionar para login preservando retorno.
- Em sucesso, exibir estado de “Dispositivo vinculado com sucesso”.
- Manter padrões de UI e navegação já existentes no projeto.
- Não quebrar rotas atuais.

Entregar:
- código implementado;
- lista de arquivos alterados;
- breve resumo técnico;
- como testar manualmente.
