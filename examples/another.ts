import { NewStyle } from '../src'

// Then try the original style
const style = NewStyle()
  .Bold(true)
  .Foreground("#FAFAFA")
  .Background("#7D56F4")
  .PaddingTop(2)
  .PaddingLeft(4)
  .Width(22)

console.log(style.Render("Hello, bun."))
