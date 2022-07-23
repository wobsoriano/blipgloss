# blipgloss

Style definitions for nice terminal layouts. Powered by [lipgloss](https://github.com/charmbracelet/lipgloss) and `bun:ffi`.

## Install

```bash
bun add blipgloss
```

## Usage

Blipgloss takes an expressive, declarative approach to terminal rendering. Users familiar with CSS will feel at home with Blipgloss.

```ts
import { NewStyle, Color } from 'blipgloss'

const style = NewStyle().
  Bold(true).
  Foreground(Color("#FAFAFA")).
  Background(Color("#7D56F4")).
  PaddingTop(2).
  PaddingLeft(4).
  Width(22)

console.log(style.Render("Hello, bun."))
```

## License

MIT
