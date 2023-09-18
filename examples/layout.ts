import * as blipgloss from '../src'
import Color from 'color'
import type { AdaptiveColor, CustomBorder } from '../src'

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
  .Padding(0, 1)
  .Foreground(subtle)
  .Render('•')

const url = (text: string) => blipgloss.NewStyle().Foreground(special).Render(text)

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
  Foreground('#FFF7DB')
  // SetString('Lip Gloss')

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

const listHeader = (text: string) => blipgloss.NewStyle().
  BorderStyle('normal').
  BorderBottom(true).
  BorderForeground(subtle).
  MarginRight(2).
  Render(text)

const listItem = (text: string) => blipgloss.NewStyle().PaddingLeft(2).Render(text)

const checkMark = blipgloss.NewStyle().
  Foreground(special).
  PaddingRight(1).
  Render("✓")

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

let docStyle = blipgloss.NewStyle().Padding(1, 2, 1, 2)

function init() {
  const doc: string[] = []
  const physicalWidth = 106

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
    // console.log('gap', gap)
    row = blipgloss.JoinHorizontal(blipgloss.Position.Bottom, row, gap)
    doc.push(row)
  }

  // Title
  {
    const colors = colorGrid(1, 5)
    let title = ''
    const offset = 2

    for (let i = 0; i < colors.length; i++) {
      const c = colors[i][0]
      const marginLeft = i * offset;

      title += titleStyle.Copy().MarginLeft(marginLeft).Background(c).Render('Lip Gloss')

      if (i < colors.length - 1) {
        title += '\n';
      }
    }

    const desc = blipgloss.JoinVertical(blipgloss.Position.Left,
			descStyle.Render("Style Definitions for Nice Terminal Layouts"),
			infoStyle.Render("From Charm" + divider + url("https://github.com/charmbracelet/lipgloss")),
		)

		const row = blipgloss.JoinHorizontal(blipgloss.Position.Top, title, desc)
    doc.push(row)
  }

  // // Dialog
  {
    const okButton = activeButtonStyle.Render('Yes')
    const cancelButton = buttonStyle.Render('Maybe')

    const question = blipgloss.NewStyle().Width(50).Align(blipgloss.Position.Center).Render("Are you sure you want to eat marmalade?")
    const buttons = blipgloss.JoinHorizontal(blipgloss.Position.Top, okButton, cancelButton)
    const ui = blipgloss.JoinVertical(blipgloss.Position.Center, question, buttons)

    const dialog = blipgloss.Place(width, 9,
      blipgloss.Position.Center, blipgloss.Position.Center,
      dialogBoxStyle.Render(ui),
      blipgloss.WithWhitespaceChars("猫咪"),
      blipgloss.WithWhitespaceForeground(subtle),
    )

    doc.push(dialog)
  }

  // Color grid
  {
    const colors = (() => {
      const colors = colorGrid(14, 8);
      let b = ''
    
      for (const row of colors) {
        for (const color of row) {
          const s = blipgloss.NewStyle().Background(color)
          b += s.Render("  ")
        }
        b += '\n';
      }
    
      return b;
    })();
    
    const lists = blipgloss.JoinHorizontal(blipgloss.Position.Top,
      list.Render(
        blipgloss.JoinVertical(blipgloss.Position.Left,
          listHeader("Citrus Fruits to Try"),
          listDone("Grapefruit"),
          listDone("Yuzu"),
          listItem("Citron"),
          listItem("Kumquat"),
          listItem("Pomelo"),
        ),
      ),
      list.Copy().Width(columnWidth).Render(
        blipgloss.JoinVertical(blipgloss.Position.Left,
          listHeader("Actual Lip Gloss Vendors"),
          listItem("Glossier"),
          listItem("Claire‘s Boutique"),
          listDone("Nyx"),
          listItem("Mac"),
          listDone("Milk"),
        ),
      ),
    )

    doc.push(blipgloss.JoinHorizontal(blipgloss.Position.Top, lists, colors))
  }

  // Marmalade history
  {
    const historyA = "The Romans learned from the Greeks that quinces slowly cooked with honey would “set” when cool. The Apicius gives a recipe for preserving whole quinces, stems and leaves attached, in a bath of honey diluted with defrutum: Roman marmalade. Preserves of quince and lemon appear (along with rose, apple, plum and pear) in the Book of ceremonies of the Byzantine Emperor Constantine VII Porphyrogennetos.";
    const historyB = "Medieval quince preserves, which went by the French name cotignac, produced in a clear version and a fruit pulp version, began to lose their medieval seasoning of spices in the 16th century. In the 17th century, La Varenne provided recipes for both thick and clear cotignac.";
    const historyC = "In 1524, Henry VIII, King of England, received a “box of marmalade” from Mr. Hull of Exeter. This was probably marmelada, a solid quince paste from Portugal, still made and sold in southern Europe today. It became a favourite treat of Anne Boleyn and her ladies in waiting.";

    doc.push(blipgloss.JoinHorizontal(
      blipgloss.Position.Top,
      historyStyle.Copy().Align(blipgloss.Position.Right).Render(historyA),
      historyStyle.Copy().Align(blipgloss.Position.Center).Render(historyB),
      historyStyle.Copy().MarginRight(0).Render(historyC),
    ))
  }

  // Status bar
  {
    const w = blipgloss.Width

    const statusKey = statusStyle.Render("STATUS")
    const encoding = encodingStyle.Render("UTF-8")
    const fishCake = fishCakeStyle.Render("🍥 Fish Cake")
    const statusVal = statusText.Copy().
      Width(width - w(statusKey) - w(encoding) - w(fishCake)).
      Render("Ravishing")

    const bar = blipgloss.JoinHorizontal(blipgloss.Position.Top,
      statusKey,
      statusVal,
      encoding,
      fishCake,
    )

    doc.push(statusBarStyle.Width(width).Render(bar))
  }

	if (physicalWidth > 0) {
		docStyle = docStyle.MaxWidth(physicalWidth)
	}

  console.log(docStyle.Render(doc.join('\n\n')))
}

init()

function colorGrid(xSteps: number, ySteps: number) {
  const x0y0 = Color('#F25D94');
  const x1y0 = Color('#EDFF82');
  const x0y1 = Color('#643AFF');
  const x1y1 = Color('#14F9D5');

  const x0 = new Array(ySteps);
  for (let i = 0; i < ySteps; i++) {
    x0[i] = x0y0.mix(x0y1, i / ySteps);
  }

  const x1 = new Array(ySteps);
  for (let i = 0; i < ySteps; i++) {
    x1[i] = x1y0.mix(x1y1, i / ySteps);
  }

  const grid = new Array(ySteps);
  for (let x = 0; x < ySteps; x++) {
    const y0 = x0[x];
    grid[x] = new Array(xSteps);
    for (let y = 0; y < xSteps; y++) {
      grid[x][y] = y0.mix(x1[x], y / xSteps).hex();
    }
  }

  return grid;
}
