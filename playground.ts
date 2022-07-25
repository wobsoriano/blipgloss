import * as blipgloss from './src'

// const style = new Style()

const style = blipgloss.NewStyle()
.Bold(true)
.Foreground("#FAFAFA")
.Background("#7D56F4")
.PaddingTop(2)
.PaddingBottom(2)
.PaddingLeft(4)
.Width(20)

console.log(style.Render("Hello, bun."))

// style.FreeString()
