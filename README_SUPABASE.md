# Configuração do Modo Colaborativo

## Como conectar o app ao Supabase (sincronização em tempo real)

### Passo 1 — Criar conta no Supabase
1. Acesse https://supabase.com e crie uma conta gratuita
2. Clique em "New Project"
3. Preencha nome do projeto (ex: csn-automacao), senha e região (South America)
4. Aguarde o projeto ser criado (1-2 minutos)

### Passo 2 — Criar a tabela no banco de dados
1. No painel do Supabase, vá em **SQL Editor**
2. Cole e execute o SQL abaixo:

```sql
CREATE TABLE relatorios (
  proto TEXT PRIMARY KEY,
  data TEXT,
  tipo TEXT,
  resp TEXT,
  cargo TEXT,
  hh TEXT,
  om TEXT,
  dds TEXT,
  equip TEXT,
  status TEXT DEFAULT 'enviado',
  conteudo TEXT,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE relatorios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Acesso publico equipe" ON relatorios
  FOR ALL USING (true) WITH CHECK (true);
```

### Passo 3 — Obter as credenciais
1. Vá em **Settings > API**
2. Copie:
   - **Project URL** (ex: https://abcxyz.supabase.co)
   - **anon public key** (começa com eyJ...)

### Passo 4 — Configurar no App
1. No app, vá em **Perfil**
2. Toque em **Sincronização com Equipe**
3. Cole a URL e a Chave Anon
4. Toque em **Testar Conexão** para verificar
5. Toque em **Conectar e Sincronizar**

### Resultado
- ✅ Relatórios enviados ficam visíveis para toda a equipe
- ✅ Rascunho em andamento é sincronizado a cada 3 segundos
- ✅ Qualquer membro pode retomar e completar um relatório
- ✅ Histórico compartilhado em tempo real
- ✅ Funciona offline também (salva local e sincroniza quando voltar)

### Plano gratuito do Supabase inclui:
- 500 MB de banco de dados
- 2 GB de banda
- Realtime ilimitado
- Suficiente para centenas de relatórios por mês
