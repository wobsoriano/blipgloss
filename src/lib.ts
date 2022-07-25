import { CString, ptr } from 'bun:ffi'
import { symbols } from './ffi'
import { encode } from './utils'

// type Pointer = number
type BlipglossColor = string

export class Style {
  #handle: number

  constructor(handle: number) {
    this.#handle = handle
  }

  static NewStyle() {
    return new Style(symbols.NewStyle())
  }

  private SetColorValue(key: string, value: BlipglossColor) {
    symbols.SetColorValue(this.#handle, ptr(encode(key)), ptr(encode(value)))
    return this
  }

  // private SetStringValue(key: string, value: string) {
  //   symbols.SetStringValue(this.#handle, ptr(encode(key)), ptr(encode(value)))
  //   return this
  // }

  private SetBooleanValue(key: string, value: boolean) {
    symbols.SetBooleanValue(this.#handle, ptr(encode(key)), value ? 1 : 0)
    return this
  }

  private SetIntValue(key: string, value: number) {
    symbols.SetIntValue(this.#handle, ptr(encode(key)), value)
    return this
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

  Foreground(color: BlipglossColor) {
    return this.SetColorValue('Foreground', color)
  }

  Background(color: BlipglossColor) {
    return this.SetColorValue('Background', color)
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

  BorderBackground(color: BlipglossColor) {
    return this.SetColorValue('BorderBackground', color)
  }

  GetBoolValue() {
    return symbols.GetBoolValue()
  }

  GetIntValue() {
    return symbols.GetIntValue()
  }

  GetBold(): boolean {
    return symbols.GetBoolValue(this.#handle, ptr(encode('GetBold')))
  }

  Reverse(val: boolean) {
    return this.SetBooleanValue('Reverse', val)
  }

  Render(text: string) {
    const textPtr = symbols.Render(this.#handle, ptr(encode(text)))
    const textStr = new CString(textPtr)
    symbols.FreeString(textStr.ptr)
    return textStr
  }

  Copy() {
    // Probably create a new instance and copy
    this.#handle = symbols.Copy()
    return this
  }

  FreeHandle() {
    symbols.FreeString(this.#handle)
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
