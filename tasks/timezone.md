Implemente no frontend a integração de timezone do usuário com o backend, considerando que a API já expõe PATCH /me/timezone e espera payload { timezone: string } com timezone IANA válido (ex.: America/Sao_Paulo).

Contexto importante:

Projeto frontend: Next.js App Router + TypeScript.
Auth com Better Auth (authClient).
API base em NEXT_PUBLIC_API_URL.
Já existe sessão via Google login.
Backend já persiste user.timezone e valida timezone IANA.
A implementação deve ser resiliente e não degradar UX.
Objetivo funcional:

Após login concluído e sessão ativa, detectar timezone do dispositivo no frontend com:
Intl.DateTimeFormat().resolvedOptions().timeZone
Enviar esse valor para PATCH /me/timezone autenticado.
Funcionar tanto para usuário novo quanto existente (upsert no backend).
Evitar chamadas desnecessárias repetidas a cada render/rota.
Requisitos técnicos obrigatórios:

Não quebrar fluxo atual de login.
Não bloquear navegação se essa atualização falhar.
Não exibir erro invasivo para o usuário caso PATCH falhe.
Fazer no máximo 1 chamada por sessão/dispositivo (ou política equivalente de deduplicação).
Garantir envio apenas quando houver sessão autenticada.
Validar localmente se timezone detectado não é vazio antes de enviar.
Se possível, comparar com último timezone já enviado (localStorage/sessionStorage/cookie) para não repetir PATCH sem necessidade.
Usar fetch com credentials: "include" (ou camada padrão existente que já envia cookies).
Respeitar arquitetura do projeto (componentes globais em components/, componentes de rota em app/.../_components, etc.).
O que implementar (passo a passo):

Criar util/função client para detectar timezone:

retorna string IANA ou null.
tratar casos onde Intl falha.
Criar função client para chamar API:

endpoint: PATCH /me/timezone
body: { timezone }
headers JSON
incluir credenciais/cookies.
tratar erros silenciosamente (log técnico opcional).
Definir ponto de execução após autenticação:

usar componente client que já sabe estado de sessão (authClient.useSession()), preferencialmente global para usuários autenticados.
executar efeito quando session.user existir e isPending for false.
Implementar deduplicação:

chave local ex.: fitai:last-sent-timezone.
só chamar PATCH se timezone atual for diferente do último enviado.
após sucesso do PATCH, atualizar chave local.
em caso de erro, não atualizar chave (permitindo retry futuro).
Garantir que não rode em páginas públicas sem sessão:

ex.: auth page, not-found, etc. (de acordo com arquitetura atual do app).
Não alterar contratos da API:

payload deve permanecer exatamente { timezone: string }.
não enviar campos extras.
Critérios de aceite:

Usuário loga com Google e, com sessão ativa, frontend envia timezone uma vez.
Reabrir/ navegar no app não dispara PATCH repetidamente sem mudança de timezone.
Se timezone mudar (ex.: usuário viaja / muda config do sistema), novo PATCH é enviado.
Falha no endpoint não impede uso da aplicação.
Build/lint do frontend passam.
Nenhuma regressão no fluxo de login.
Entregáveis esperados:

Lista dos arquivos alterados.
Explicação curta da estratégia de deduplicação usada.
Comandos de validação executados (lint/build).
Observações de risco (se houver).
Importante:

Adapte aos padrões já existentes do projeto (não force arquitetura nova).
Priorize simplicidade, previsibilidade e compatibilidade com o que a API espera hoje.