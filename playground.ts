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
.Padding(1, 4, 2)
.Align(blipgloss.Position.Right)
.BorderStyle({
  Top:         "._.:*:",
  Bottom:      "._.:*:",
  Left:        "|*",
  Right:       "|*",
  TopLeft:     "*",
  TopRight:    "*",
  BottomLeft:  "*",
  BottomRight: "*",
})

console.log(style.Render("Hello, bun clone."))
