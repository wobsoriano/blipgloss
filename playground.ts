import { lipgloss } from './src'

// const style = new Style()

const style = lipgloss.NewStyle()
.Bold(true)
.Foreground(lipgloss.Color("#FAFAFA"))
.Background(lipgloss.Color("#7D56F4"))
.PaddingTop(2)
.PaddingBottom(2)
.PaddingLeft(4)
.Width(20)
.Render("Hello, bun.")

// console.log(style.GetBold())

// style.FreeString()
