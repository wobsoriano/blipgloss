# blipgloss

WIP

## Install

```bash
bun add blipgloss
```

## Usage

```ts
import { blipgloss } from 'blipgloss'

const style = blipgloss.NewStyle().
  Bold(true).
  Foreground(blipgloss.Color("#FAFAFA")).
  Background(blipgloss.Color("#7D56F4")).
  PaddingTop(2).
  PaddingLeft(4).
  Width(22)

console.log(style.Render("Hello, bun."))
```

## License

MIT
