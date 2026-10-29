# 🎨 Moodboard App

Um mural de referências visuais interativo onde o usuário pode fazer upload de imagens, editar, excluir e organizar suas inspirações através de uma interface fluida com Drag and Drop.

## 🔗 Deploy
- **Acesse o projeto:** [https://moodboard-app-mu.vercel.app](https://moodboard-app-mu.vercel.app)

## 🚀 Tecnologias Utilizadas
- **React + Vite** (Interface e gerenciamento de estado)
- **Firebase** (Autenticação e Firestore Database)
- **Cloudinary** (Upload e hospedagem de imagens)
- **Dnd-kit** (Lógica de Drag and Drop)
- **React Hot Toast** (Notificações customizadas)

## ✨ Funcionalidades
- Autenticação de usuário (Login e Cadastro).
- Upload de imagens com título.
- Grid dinâmico estilo *masonry* (quebra-cabeça).
- Arrastar e soltar (Drag and Drop) para reordenar as imagens.
- Edição e exclusão de itens.
- Layout responsivo com suporte a toque no mobile.

## 🧠 Decisões Técnicas (Destaques)
Aqui estão algumas soluções implementadas para garantir performance e boa experiência de usuário:

1. **Separação de Responsabilidades (Custom Hook):**
   Toda a lógica de manipulação de dados e escuta do banco (Firestore) foi extraída do componente principal para um hook customizado (`useMoodboard`), mantendo os componentes visuais limpos e focados apenas na interface.

2. **Transações em Lote no Banco (writeBatch):**
   Para salvar a nova ordem das imagens após o Drag and Drop, foi utilizado o `writeBatch` do Firebase. Em vez de fazer uma requisição por imagem alterada, o sistema salva todas as novas posições de uma só vez de forma atômica (tudo ou nada), evitando inconsistências de dados.

3. **Otimização de Drag and Drop para Mobile:**
   Foram implementados sensores diferentes para Desktop (`MouseSensor`) e Mobile (`TouchSensor` com delay). O atraso no sensor de toque evita que o usuário arraste um card sem querer enquanto tenta rolar a página no celular, além de bloquear o menu nativo de contexto das imagens.

4. **Segurança de Credenciais:**
   As chaves de API do Firebase e do Cloudinary foram isoladas em variáveis de ambiente (`.env`).
