import { blipgloss } from './src'

// const style = new Style()

const style = blipgloss.NewStyle()
.Bold(true)
.Foreground(blipgloss.Color("#FAFAFA"))
.Background(blipgloss.Color("#7D56F4"))
.PaddingTop(2)
.PaddingBottom(2)
.PaddingLeft(4)
.Width(20)
.Render("Hello, bun.")

// console.log(style.GetBold())

// style.FreeString()
