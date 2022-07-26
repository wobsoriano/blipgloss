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

const style2 = style.Copy()
.Width(30)

console.log(style2.Render("Hello, bun 2."))

const style3 = style2.Copy()
.Width(40)

console.log(style3.Render("Hello, bun 3."))

// style.FreeString()
