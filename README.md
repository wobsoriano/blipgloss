# blipgloss

WIP

## Install

```bash
bun add blipgloss
```

## Usage

```ts
import { Style } from 'blipgloss'

const style = lipgloss.NewStyle().
  Bold(true).
  Foreground("#FAFAFA").
  Background("#7D56F4").
  PaddingTop(2).
  PaddingLeft(4).
  Width(22)

console.log(style.Render("Hello, bun."))
```

## License

MIT
