# ORKUZ frontend

Frontend build for the purpose of the final paper.

## Prerequisites

- Node.js 18.17+
- pnpm 8+

## Setup

Create `.npmrc` file with the following content:

```ini
@alschn:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=<YOUR_GITHUB_TOKEN>
```

You will be able to authenticate and install packages from GitHub Packages registry.

Install dependencies:

```shell
pnpm install
```

Create `.env` file with env variables:

```dotenv
NEXT_PUBLIC_API_URL="http://127.0.0.1:8000"
```

Start dev server:

```shell
pnpm dev
```

By default, application will be available at port 3000.

### Useful commands

Building assets:

```shell
pnpm build
```

Starting production server:

```shell
pnpm start
```

Linting:

```shell
pnpm lint
```

Running unit tests:

```shell
pnpm test
```

```shell
pnpm test:watch
```

Running integration tests:

```shell
pnpm e2e
```

```shell
pnpm e2e:ui
```
