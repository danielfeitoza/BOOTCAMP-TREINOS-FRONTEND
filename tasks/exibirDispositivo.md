Siga rigorosamente as regras do projeto (.github\copilot-instructions.md, padrões de UI, tipagem, lint, arquitetura e componentes já usados). Reaproveite componentes existentes de modal/botão/card se houver.

Objetivo:
Na tela de perfil do usuário, antes do botão “Sair da conta”, criar uma seção de dispositivo vinculado com altura de 50px.

Layout obrigatório:
- Criar uma DIV container com `height: 50px`.
- Dentro dela, duas DIVs:
  1) primeira DIV com o texto: `Dispositivo vinculado:`
  2) segunda DIV com:
     - à esquerda: label com o nome do dispositivo
     - à direita: botão `Excluir`

Comportamento:
1) Ao carregar a tela de perfil, consultar dispositivo vinculado:
   - GET `/smartwatch`
2) Se houver dispositivo:
   - renderizar nome do dispositivo na label.
3) Se não houver:
   - renderizar texto apropriado (ex.: “Nenhum dispositivo vinculado”).
4) Ao clicar em `Excluir`:
   - abrir modal de confirmação com pergunta:
     “Tem certeza que deseja excluir o dispositivo?”
5) Confirmando no modal:
   - chamar DELETE `/smartwatch`
   - atualizar UI removendo dispositivo da tela
   - mostrar feedback de sucesso
6) Cancelando no modal:
   - fechar modal sem ação.

Regras de implementação:
- Criar/usar service de smartwatch:
  - `getSmartwatch()` -> GET `/smartwatch`
  - `deleteSmartwatch()` -> DELETE `/smartwatch`
- Tratar loading e erro em todas as chamadas.
- Botão `Excluir` deve ficar desabilitado durante requisição.
- Modal deve seguir padrão visual já existente no projeto.
- Não alterar o comportamento do botão “Sair da conta”.

Entregar:
- código implementado;
- lista de arquivos alterados;
- resumo curto;
- passos de teste manual.
