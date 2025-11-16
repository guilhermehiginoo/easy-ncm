# Easy NCM - Estrutura das Páginas Principais

## 📁 Arquivos Criados

### Componentes (`resources/js/Components/`)

-   **Button.jsx** - Botão reutilizável com variantes primary e secondary
-   **ChatBubble.jsx** - Componente de mensagem de chat (usuário e IA)
-   **SearchInput.jsx** - Input de busca com ícone de lupa
-   **Header.jsx** - Cabeçalho da aplicação com navegação e avatar

### Layouts (`resources/js/Layouts/`)

-   **MainLayout.jsx** - Layout principal para páginas autenticadas (com Header)

### Páginas (`resources/js/Pages/`)

-   **Classify.jsx** - Página principal de classificação NCM com chat
-   **History.jsx** - Página de histórico de classificações

### Backend (`app/`)

-   **Controllers/ClassifyController.php** - Controller para classificação
-   **Controllers/HistoryController.php** - Controller para histórico
-   **Models/Classification.php** - Model de classificação

### Database

-   **migrations/...\_create_classifications_table.php** - Migration para tabela de classificações

### Estilos

-   **resources/css/app.css** - Estilos customizados (scrollbar, autofill, fonte)

## 🛣️ Rotas Criadas

```php
// Autenticadas
GET  /classificar       - Página de classificação
POST /classificar       - Enviar classificação
GET  /historico         - Listagem do histórico
GET  /historico/{id}    - Detalhes de uma classificação
```

## 🗄️ Estrutura do Banco de Dados

### Tabela: classifications

```sql
- id (bigint, auto-increment)
- user_id (foreignId -> users.id)
- product_description (text)
- ncm_code (string)
- tipi_code (string, nullable)
- justification (text, nullable)
- created_at (timestamp)
- updated_at (timestamp)

Índices:
- user_id
- created_at
```

## 🚀 Próximos Passos

1. **Executar a migration:**

    ```bash
    php artisan migrate
    ```

2. **Integração com IA:**

    - Implementar a lógica real de classificação no método `classifyWithAI()` do `ClassifyController`
    - Substituir a simulação por uma chamada real de API de IA

3. **Funcionalidades Adicionais:**

    - Página de detalhes do histórico (`HistoryDetail.jsx`)
    - Sistema de feedback
    - Exportação de histórico
    - Filtros avançados no histórico

4. **Melhorias:**
    - Adicionar validações mais robustas
    - Implementar sistema de cache para classificações comuns
    - Adicionar testes automatizados

## 🎨 Paleta de Cores

-   Background: `#111a22`
-   Cards: `#233648`
-   Primary Blue: `#1172d4`
-   Text Secondary: `#92adc9`
-   Border: `#324d67`

## 📝 Notas Importantes

-   O avatar do usuário é gerado dinamicamente usando DiceBear API baseado no email
-   O histórico recente na sidebar mostra os últimos 10 registros
-   A funcionalidade de copiar NCM está implementada usando Clipboard API
-   Todos os componentes são responsivos e seguem o design system fornecido
