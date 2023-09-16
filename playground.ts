import * as blipgloss from './src'
import type { AdaptiveColor, CustomBorder } from './src'

const width = 96
const columnWidth = 30

// Style definitions.

// General
const subtle: AdaptiveColor = {
  Light: '#D9DCCF',
  Dark: '#383838'
}
const highlight: AdaptiveColor = {
  Light: '#874BFD',
  Dark: '#7D56F4'
}
const special: AdaptiveColor = {
  Light: '#43BF6D',
  Dark: '#73F59F'
}

const divider = blipgloss.NewStyle()
  .SetString('.')
  .Padding(0, 11)
  .Foreground(subtle)
// .String()

const url = blipgloss.NewStyle().Foreground(special).Render

// Tabs.

const activeTabBorder: CustomBorder = {
  Top: "─",
  Bottom: " ",
  Left: "│",
  Right: "│",
  TopLeft: "╭",
  TopRight: "╮",
  BottomLeft: "┘",
  BottomRight: "└",
}

const tabBorder: CustomBorder = {
  Top: "─",
  Bottom: "─",
  Left: "│",
  Right: "│",
  TopLeft: "╭",
  TopRight: "╮",
  BottomLeft: "┴",
  BottomRight: "┴",
}

const tab = blipgloss.NewStyle()
  .Border(tabBorder, true)
  .BorderForeground(highlight)
  .Padding(0, 1)

const activeTab = tab.Copy().Border(activeTabBorder, true)

const tabGap = tab.Copy()
  .BorderTop(false)
  .BorderLeft(false)
  .BorderRight(false)

// Title.

const titleStyle = blipgloss.NewStyle().
  MarginLeft(1).
  MarginRight(5).
  Padding(0, 1).
  Italic(true).
  Foreground('#FFF7DB').
  SetString('Lip Gloss')

const descStyle = blipgloss.NewStyle().MarginTop(1)

const infoStyle = blipgloss.NewStyle().
  BorderStyle('normal').
  BorderTop(true).
  BorderForeground(subtle)

// Dialog.

const dialogBoxStyle = blipgloss.NewStyle().
  Border('rounded').
  BorderForeground('#874BFD').
  Padding(1, 0).
  BorderTop(true).
  BorderLeft(true).
  BorderRight(true).
  BorderBottom(true)

const buttonStyle = blipgloss.NewStyle().
  Foreground('#FFF7DB').
  Background('#888B7E').
  Padding(0, 3).
  MarginTop(1)

const activeButtonStyle = buttonStyle.Copy().
  Foreground('#FFF7DB').
  Background('#F25D94').
  MarginRight(2).
  Underline(true)

// List.

const list = blipgloss.NewStyle().
  Border('normal', false, true, false, false).
  BorderForeground(subtle).
  MarginRight(2).
  Height(8).
  Width(columnWidth + 1)

const listHeader = blipgloss.NewStyle().
  BorderStyle('normal').
  BorderBottom(true).
  BorderForeground(subtle).
  MarginRight(2).
  Render

const listItem = blipgloss.NewStyle().PaddingLeft(2).Render

const checkMark = blipgloss.NewStyle().SetString("✓").
  Foreground(special).
  PaddingRight(1).
  String()

function listDone(s: string) {
  return checkMark + blipgloss.NewStyle().
    Strikethrough(true).
    Foreground({ Light: "#969B86", Dark: "#696969" }).
    Render(s)
}

// Paragraphs/History.

const historyStyle = blipgloss.NewStyle().
  Align(blipgloss.Position.Left).
  Foreground('#FAFAFA').
  Background(highlight).
  Margin(1, 3, 0, 0).
  Padding(1, 2).
  Height(19).
  Width(columnWidth)

// Status Bar.

const statusNugget = blipgloss.NewStyle().
  Foreground('#FFFDF5').
  Padding(0, 1)

const statusBarStyle = blipgloss.NewStyle().
  Foreground({ Light: "#343433", Dark: "#C1C6B2" }).
  Background({ Light: "#D9DCCF", Dark: "#353533" })

const statusStyle = blipgloss.NewStyle().
  Inherit(statusBarStyle).
  Foreground('#FFFDF5').
  Background('#FF5F87').
  Padding(0, 1).
  MarginRight(1)

const encodingStyle = statusNugget.Copy().
  Background('#A550DF').
  Align(blipgloss.Position.Right)

const statusText = blipgloss.NewStyle().Inherit(statusBarStyle)

const fishCakeStyle = statusNugget.Copy().Background('#6124DF')

// Page.

const docStyle = blipgloss.NewStyle().Padding(1, 2, 1, 2)

function init() {
  const doc: string[] = []

  // Tabs
  {
    let row = blipgloss.JoinHorizontal(
      blipgloss.Position.Top,
      activeTab.Render("Lip Gloss"),
      tab.Render("Blush"),
      tab.Render("Eye Shadow"),
      tab.Render("Mascara"),
      tab.Render("Foundation"),
    )
    const gapWidth = Math.max(0, width - blipgloss.Width(row) - 2);
    const gap = tabGap.Render(Array(gapWidth).fill(" ").join(""))
    row = blipgloss.JoinHorizontal(blipgloss.Position.Bottom, row, gap)
    doc.push(row + "\n\n")
  }
}

init()
