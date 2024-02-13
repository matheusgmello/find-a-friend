# Find Friend API

## Passa a passo

> Para executar estes comandos, você deve entrar na pasta `find-a-friend/api`

### Instale as dependências

```bash
npm i
```

### Configure variáveis de ambiente

```bash
cp .env.exemple .env
```

### Rode as migrations

```bash
npx prisma migrate dev
```

### Rode a seed

```bash
npx prisma db seed
```

### Rode o servidor

```bash
npm run dev
```
