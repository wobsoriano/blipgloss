# bun-promptx

bun-promptx is a terminal prompt library based on [bubbles](https://github.com/mritd/bubbles) via `bun:ffi`.

## Install

```bash
bun add bun-promptx
```

## Usage

### selection

A terminal single-selection list library. The `createSelection` function provides the functions of page up and down and key movement, and supports custom rendering methods.

```js
import { createSelection } from 'bun-promptx'

const result = createSelection([
  { text: 'feat', description: 'Introducing new features' },
  { text: 'fix', description: 'Bug fix' },
  { text: 'docs', description: 'Writing docs' },
  { text: 'style', description: 'Improving structure/format of the code' },
  { text: 'refactor', description: 'Refactoring code' },
  { text: 'test', description: 'Refactoring code' },
  { text: 'chore', description: 'When adding missing tests' },
  { text: 'perf', description: 'Improving performance' }
], {
  headerText: 'Select Commit Type: ',
  perPage: 5
})

console.log(result)
// { selectedIndex: 2, error: null }
```

<img src="https://i.imgur.com/DeTHCdG.gif" alt="promptx demo" />

More to come...

## License

MIT
