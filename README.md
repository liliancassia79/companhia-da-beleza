# ✂️ Cia da Beleza - Sistema de Agendamento Online e Gestão

Este é o projeto completo para o salão **Cia da Beleza**, reunindo uma Landing Page moderna com fluxo de agendamento online integrado e um **Painel de Gestão Completo** para o proprietário.

O sistema foi construído visando uma experiência premium em *Dark Mode* para os clientes e total controle gerencial e financeiro para a administração do salão.

---

## 🚀 Tecnologias Utilizadas

O projeto passou por uma modernização e agora utiliza um stack poderoso e reativo:

* **React + Vite**: Framework principal para construção da interface de forma rápida e reativa.
* **TypeScript**: Para maior segurança e escalabilidade do código.
* **Tailwind CSS**: Estilização via classes utilitárias para garantir um design consistente, responsivo e em dark mode.
* **React Router**: Para navegação ágil entre a área pública e o painel administrativo.
* **Supabase**: Backend-as-a-Service (BaaS) utilizado para autenticação segura (Auth) e banco de dados PostgreSQL.
* **Lucide React**: Biblioteca de ícones elegantes.
* **Sonner**: Para exibição de notificações (toasts) de sucesso e erro.
* **Date-fns**: Para manipulação de datas e horários na agenda.

---

## 🛠️ Funcionalidades Públicas (Para Clientes)

- ✅ **Landing Page**: Apresentação visual atraente do salão com foco em conversão e layout responsivo.
- ✅ **Fluxo de Agendamento**: Interface dinâmica onde o cliente escolhe o serviço e vê os horários.
- ✅ **Integração com Banco de Dados**: Os agendamentos feitos no site são gravados diretamente no banco de dados do salão.

---

## 🔐 Painel Administrativo (Área Restrita)

Acessível através do rodapé do site (`/admin`), o painel é protegido por login e senha e exclusivo para gestão interna.

### Módulos do Painel:

1. **Dashboard (Visão Geral)**: 
   - Cartões com métricas em tempo real (Total de Clientes na Agenda, Membros da Equipe, Total de Despesas e Total de Pagamentos/Comissões).
2. **Agenda**: 
   - Visualização completa dos agendamentos divididos por dia.
   - Identificação visual para agendamentos vindos do site ou criados manualmente.
   - Opção de adicionar clientes manualmente na agenda ou cancelar agendamentos existentes.
3. **Equipe**: 
   - Cadastro e remoção de profissionais do salão, com nome e especialidade (Essencial para cálculo de comissões).
4. **Despesas**: 
   - Controle financeiro de contas do salão (ex: conta de luz, aluguel, reposição de produtos) com somatório total em Reais.
5. **Pagamentos**: 
   - Lançamento de comissões atreladas diretamente a um membro da equipe com somatório total em Reais.

### Segurança e Controle
- O botão de cadastro no painel foi **removido** propositalmente após a criação da conta inicial do dono, transformando o painel em uma área "fechada".
- Apenas contas já aprovadas e cadastradas manualmente no banco de dados têm permissão para fazer login.

---

## 📁 Estrutura do Repositório

- `/src/app/` - Componentes visuais do site público (Landing Page, cabeçalho, rodapé, etc).
- `/src/app/components/admin/` - Todo o módulo de gestão administrativa separado por abas (`AdminPage.tsx`, `DashboardTab.tsx`, `AgendaTab.tsx`, etc).
- `/src/supabaseClient.ts` - Configuração de comunicação segura com o Supabase.

---

## ⚠️ Atenção: Integração Frontend/Backend

**Aviso Importante para a equipe de Backend:**
A lista de **Serviços** e a lista de **Profissionais** do agendamento estão configuradas de forma fixa (hardcoded) no frontend (dentro dos arquivos `servicesApi.ts` e `professionalsApi.ts`). Isso garante que o site carregue instantaneamente para o cliente, sem depender do tempo de resposta ou da disponibilidade de uma API externa.

Solicitamos expressamente ao Backend que **não modifique o código Frontend** na tentativa de conectar a aba de agendamentos a rotas dinâmicas de serviços/profissionais. O Frontend deve continuar responsável por essa camada visual, mantendo a estabilidade da interface independentemente de serviços em nuvem ou bancos de dados externos.