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
  .String(subtle)

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
