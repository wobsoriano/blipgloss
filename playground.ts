import * as blipgloss from './src'

// const style = new Style()

const style = blipgloss.NewStyle()
.Bold(true)
.Foreground("#FAFAFA")
.Background("#7D56F4")
// .PaddingTop(2)
// .PaddingBottom(2)
// .PaddingLeft(4)
.Width(30)
.Align(blipgloss.Position.Right)

// console.log(style.Render("Hello, bun."))

const style2 = style.Copy()
.Background({
  Light: "#2B2D42",
  Dark: "#F8F32B"
})
.Width(20)
.Align(blipgloss.Position.Top)

console.log(style.Render("Hello, bun clone."))
