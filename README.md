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

## Colors

Blipgloss supports the following color profiles:

### ANSI 16 colors (4-bit)

```js
import { Color } from 'blipgloss'

Color("5")  // magenta
Color("9")  // red
Color("12") // light blue
```

### ANSI 256 colors (8-bit)

```js
import { Color } from 'blipgloss'

Color("86")  // aqua
Color("201") // hot pink
Color("202") // orange
```

### True Color (16,777,216 colors; 24-bit)

```js
import { Color } from 'blipgloss'

Color("#0000FF") // good ol' 100% blue
Color("#04B575") // a green
Color("#3C3C3C") // a dark gray
```

## License

MIT
