# ORKUZ node package

Node.js package written for the purpose of the final paper.

## Installation

...

## Usage

...

## Development

### Prerequisites

- Node 18+
- pnpm 8+

### Setup

Install dependencies

```shell
pnpm install
```

#### Building the package

```shell
pnpm build
```

#### Linting

Run eslint:

```shell
pnpm lint
```

#### Unit tests

Running unit tests using Vitest:

```shell
pnpm test
```

Get tests coverage:

```shell
pnpm test:coverage
```

#### Versioning

Create new versions using `changesets` CLI:

```shell
pnpm changeset
```

This will create a new markdown file in `changeset` directory, which use can use to describe your changes.

To bump package version and update `CHANGELOG.md` run:

```shell
pnpm changeset version
```

This should trigger CI/CD pipeline (if there are any uncommited changes in changests directory), which creates a new pull request to main branch.
After merging that pull request, new version will automatically be published to npm registry.
