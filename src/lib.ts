import { ptr } from 'bun:ffi'
import { symbols } from './ffi'
import { encode } from './utils'

type Pointer = number

class Style {
  #handle: number

  constructor(handle: number) {
    this.#handle = handle
  }

  static NewStyle() {
    return new Style(symbols.NewStyle())
  }

  private SetColorValue(key: string, value: Pointer) {
    symbols.SetColorValue(this.#handle, ptr(encode(key)), value)
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

  Foreground(color: Pointer) {
    return this.SetColorValue('Foreground', color)
  }

  Background(color: Pointer) {
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

  BorderTopBackground(color: Pointer) {
    return this.SetColorValue('BorderTopBackground', color)
  }

  BorderBottomBackground(color: Pointer) {
    return this.SetColorValue('BorderBottomBackground', color)
  }

  BorderLeftBackground(color: Pointer) {
    return this.SetColorValue('BorderLeftBackground', color)
  }

  BorderRightBackground(color: Pointer) {
    return this.SetColorValue('BorderRightBackground', color)
  }

  BorderTopForeground(color: Pointer) {
    return this.SetColorValue('BorderTopForeground', color)
  }

  BorderBottomForeground(color: Pointer) {
    return this.SetColorValue('BorderBottomForeground', color)
  }

  BorderLeftForeground(color: Pointer) {
    return this.SetColorValue('BorderLeftForeground', color)
  }

  BorderRightForeground(color: Pointer) {
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

  BorderBackground(color: Pointer) {
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

  Render(text: string) {
    symbols.Render(this.#handle, ptr(encode(text)))
    symbols.FreeString(this.#handle)
    return this
  }

  Copy() {
    // Probably create a new instance and copy
    this.#handle = symbols.Copy()
    return this
  }

  FreeString() {
    symbols.FreeString(this.#handle)
  }
}

function Color(color: string) {
  return symbols.Color(ptr(encode(color)))
}

export const lipgloss = {
  NewStyle: Style.NewStyle,
  Color
}
