import { CString, ptr } from 'bun:ffi'
import { symbols } from './ffi'
import { encode, whichSidesBool } from './utils'

export type AdaptiveColor = {
  Light: string
  Dark: string
}

export type CompleteColor = {
  True: string
  ANSI256: string
  ANSI: string
}

export type BlipglossColor = string | AdaptiveColor | CompleteColor

export enum Position {
  Top = 0.0,
  Bottom = 1.0,
  Center = 0.5,
  Left = 0.0,
  Right = 1.0
}

export type CustomBorder = {
  Top?: string
  Bottom?: string
  Left?: string
  Right?: string
  TopLeft?: string
  TopRight?: string
  BottomLeft?: string
  BottomRight?: string
}

export type BorderStyle = 'rounded' | 'double' | 'normal' | 'hidden' | 'thick' | CustomBorder

export class Style {
  #handle: number

  constructor(handle: number) {
    this.#handle = handle
  }

  static NewStyle() {
    return new Style(symbols.NewStyle()!)
  }

  private SetColorValue(key: string, value: BlipglossColor) {
    const isObject = typeof value !== 'string'
    const color = isObject ? ptr(encode(JSON.stringify(value))) : ptr(encode(value))

    if (isObject) {
      if ('Light' in value) {
        // Adaptive color
        symbols.SetColorValue(this.#handle, ptr(encode(key)), color, 2)
      } else {
        // Complete color
        symbols.SetColorValue(this.#handle, ptr(encode(key)), color, 3)
      }
    } else {
      symbols.SetColorValue(this.#handle, ptr(encode(key)), color, 1)
    }

    return this
  }

  private SetStringValue(key: string, value: string) {
    symbols.SetStringValue(this.#handle, ptr(encode(key)), ptr(encode(value)))
    return this
  }

  private SetBooleanValue(key: string, value: boolean) {
    symbols.SetBooleanValue(this.#handle, ptr(encode(key)), value)
    return this
  }

  private SetIntValue(key: string, value: number) {
    symbols.SetIntValue(this.#handle, ptr(encode(key)), value)
    return this
  }

  SetString(text: string) {
    return this.SetStringValue('SetString', text)
  }

  String() {
    const textPtr = symbols.String(this.#handle)
    const textStr = new CString(textPtr!)
    symbols.FreeString(textStr.ptr)
    return textStr.toString()
  }

  Bold(val: boolean) {
    return this.SetBooleanValue('Bold', val)
  }

  Strikethrough(val: boolean) {
    return this.SetBooleanValue('Strikethrough', val)
  }

  Italic(val: boolean) {
    return this.SetBooleanValue('Italic', val)
  }

  Width(val: number) {
    return this.SetIntValue('Width', val)
  }

  Height(val: number) {
    return this.SetIntValue('Height', val)
  }

  Foreground(color: BlipglossColor) {
    return this.SetColorValue('Foreground', color)
  }

  Background(color: BlipglossColor) {
    return this.SetColorValue('Background', color)
  }

  Padding(...values: number[]) {
    symbols.Padding(this.#handle, ptr(encode(JSON.stringify(values))))
    return this
  }

  PaddingTop(padding: number) {
    return this.SetIntValue('PaddingTop', padding)
  }

  PaddingBottom(padding: number) {
    return this.SetIntValue('PaddingBottom', padding)
  }

  PaddingLeft(padding: number) {
    return this.SetIntValue('PaddingLeft', padding)
  }

  PaddingRight(padding: number) {
    return this.SetIntValue('PaddingRight', padding)
  }

  Margin(...values: number[]) {
    symbols.Margin(this.#handle, ptr(encode(JSON.stringify(values))))
    return this
  }

  MarginTop(padding: number) {
    return this.SetIntValue('MarginTop', padding)
  }

  MarginBottom(padding: number) {
    return this.SetIntValue('MarginBottom', padding)
  }

  MarginLeft(padding: number) {
    return this.SetIntValue('MarginLeft', padding)
  }

  MarginRight(padding: number) {
    return this.SetIntValue('MarginRight', padding)
  }

  MarginBackground(color: BlipglossColor) {
    return this.SetColorValue('MarginBackground', color)
  }

  Blink(val: boolean) {
    return this.SetBooleanValue('Blink', val)
  }

  BorderTopBackground(color: BlipglossColor) {
    return this.SetColorValue('BorderTopBackground', color)
  }

  BorderBottomBackground(color: BlipglossColor) {
    return this.SetColorValue('BorderBottomBackground', color)
  }

  BorderLeftBackground(color: BlipglossColor) {
    return this.SetColorValue('BorderLeftBackground', color)
  }

  BorderRightBackground(color: BlipglossColor) {
    return this.SetColorValue('BorderRightBackground', color)
  }

  BorderTopForeground(color: BlipglossColor) {
    return this.SetColorValue('BorderTopForeground', color)
  }

  BorderBottomForeground(color: BlipglossColor) {
    return this.SetColorValue('BorderBottomForeground', color)
  }

  BorderLeftForeground(color: BlipglossColor) {
    return this.SetColorValue('BorderLeftForeground', color)
  }

  BorderRightForeground(color: BlipglossColor) {
    return this.SetColorValue('BorderRightForeground', color)
  }

  Border(style: BorderStyle, ...args: boolean[]) {
    let [top, right, bottom, left, ok] = whichSidesBool(...args)

    if (!ok) {
      top = true
      right = true
      bottom = true
      left = true
    }

    symbols.Border(this.#handle, ptr(encode(style)), top, right, bottom, left)
    return this
  }

  BorderStyle(style: BorderStyle) {
    if (typeof style === 'string') {
      symbols.BorderStyle(this.#handle, ptr(encode(style)))
    } else {
      symbols.CustomBorder(this.#handle, ptr(encode(JSON.stringify(style))))
    }
    return this
  }

  BorderTop(val: boolean) {
    return this.SetBooleanValue('BorderTop', val)
  }

  BorderBottom(val: boolean) {
    return this.SetBooleanValue('BorderBottom', val)
  }

  BorderLeft(val: boolean) {
    return this.SetBooleanValue('BorderLeft', val)
  }

  BorderRight(val: boolean) {
    return this.SetBooleanValue('BorderRight', val)
  }

  BorderForeground(color: BlipglossColor) {
    return this.SetColorValue('BorderForeground', color)
  }

  BorderBackground(color: BlipglossColor) {
    return this.SetColorValue('BorderBackground', color)
  }

  // GetBoolValue() {
  //   return symbols.GetBoolValue()
  // }

  // GetIntValue() {
  //   return symbols.GetIntValue()
  // }

  GetBold(): boolean {
    return symbols.GetBoolValue(this.#handle, ptr(encode('GetBold')))
  }

  Reverse(val: boolean) {
    return this.SetBooleanValue('Reverse', val)
  }

  Align(position: Position | number) {
    symbols.Align(this.#handle, position)
    return this
  }

  Render(text: string) {
    const textPtr = symbols.Render(this.#handle, ptr(encode(text)))
    const textStr = new CString(textPtr!)
    symbols.FreeString(textStr.ptr)
    return textStr.toString()
  }

  Copy() {
    return new Style(symbols.Copy(this.#handle)!)
  }

  FreeHandle() {
    symbols.FreeString(this.#handle)
  }

  // Unset rules

  private UnsetRule(key: string) {
    symbols.UnsetRule(this.#handle, ptr(encode(key)))
    return this
  }

  UnsetAlign() {
    return this.UnsetRule('UnsetAlign')
  }

  UnsetBackground() {
    return this.UnsetRule('UnsetBackground')
  }

  UnsetBlink() {
    return this.UnsetRule('UnsetBlink')
  }

  UnsetBold() {
    return this.UnsetRule('UnsetBold')
  }

  UnsetBorderBackground() {
    return this.UnsetRule('UnsetBorderBackground')
  }

  UnsetBorderBottom() {
    return this.UnsetRule('UnsetBorderBottom')
  }

  UnsetBorderBottomBackground() {
    return this.UnsetRule('UnsetBorderBottomBackground')
  }

  UnsetBorderBottomForeground() {
    return this.UnsetRule('UnsetBorderBottomForeground')
  }

  UnsetBorderForeground() {
    return this.UnsetRule('UnsetBorderForeground')
  }

  // Enforcing Rules

  Inline(val: boolean) {
    return this.SetBooleanValue('Inline', val)
  }

  MaxWidth(val: number) {
    return this.SetIntValue('MaxWidth', val)
  }

  MaxHeight(val: number) {
    return this.SetIntValue('MaxHeight', val)
  }

  WithWhitespaceBackground(color: BlipglossColor) {
    return this.SetColorValue('WithWhitespaceBackground', color)
  }

  WithWhitespaceForeground(color: BlipglossColor) {
    return this.SetColorValue('WithWhitespaceForeground', color)
  }

  /**
   * Sets the characters to be rendered in the whitespace.
   */
  WithWhitespaceChars(char: string) {
    return this.SetStringValue('WithWhitespaceChars', char)
  }

  Inherit(style: Style) {
    symbols.Inherit(this.#handle, ptr(encode(style.#handle)))
    return this
  }
}

export function NewStyle() {
  return Style.NewStyle()
}

/**
 * Returns whether or not the terminal has a dark background.
 */
export function HasDarkBackground(): boolean {
  return symbols.HasDarkBackground()
}

// Utilities

function combineArgs(args: string[]) {
  return args.join(",");
}

export function JoinHorizontal(position: Position | number, ...paragraphs: string[]) {
  const textPtr = symbols.JoinHorizontal(position, ptr(encode(combineArgs(paragraphs))))
  const textStr = new CString(textPtr!)
  symbols.FreeString(textStr.ptr)
  return textStr.toString()
}

export function JoinVertical(position: Position | number, ...paragraphs: string[]) {
  const textPtr = symbols.JoinVertical(position, ptr(encode(combineArgs(paragraphs))))
  const textStr = new CString(textPtr!)
  symbols.FreeString(textStr.ptr)
  return textStr.toString()
}

export function Width(text: string): number {
  return symbols.Width(ptr(encode(text)))
}

export function Height(text: string): number {
  return symbols.Height(ptr(encode(text)))
}
