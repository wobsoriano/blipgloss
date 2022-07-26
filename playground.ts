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
.Background({
  Light: "#2B2D42",
  Dark: "#F8F32B"
})
.Width(30)

console.log(style2.Render("Hello, bun clone."))

// style.FreeString()
