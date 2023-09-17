import { dlopen, FFIType, suffix } from 'bun:ffi'

const { platform, arch } = process

let filename: string

if (arch === 'x64') {
  filename = `../release/blipgloss-${platform}-amd64.${suffix}`
} else {
  filename = `../release/blipgloss-${platform}-${arch}.${suffix}`
}

const location = new URL(filename, import.meta.url).pathname

export const { symbols } = dlopen(location, {
  NewStyle: {
    args: [],
    returns: FFIType.ptr
  },
  Render: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr
  },
  String: {
    args: [FFIType.ptr],
    returns: FFIType.ptr
  },
  Copy: {
    args: [FFIType.ptr],
    returns: FFIType.ptr
  },
  SetColorValue: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr, FFIType.int],
    returns: FFIType.void
  },
  SetIntValue: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.int],
    returns: FFIType.void
  },
  SetStringValue: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
    returns: FFIType.void
  },
  SetBooleanValue: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.bool],
    returns: FFIType.void
  },
  GetBoolValue: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.bool
  },
  GetIntValue: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.int
  },
  HasDarkBackground: {
    args: [],
    returns: FFIType.bool
  },
  UnsetRule: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void
  },
  JoinHorizontal: {
    args: [FFIType.f64, FFIType.ptr],
    returns: FFIType.ptr
  },
  JoinVertical: {
    args: [FFIType.f64, FFIType.ptr],
    returns: FFIType.ptr
  },
  Width: {
    args: [FFIType.ptr],
    returns: FFIType.int
  },
  Height: {
    args: [FFIType.ptr],
    returns: FFIType.int
  },
  Align: {
    args: [FFIType.ptr, FFIType.float],
    returns: FFIType.void
  },
  Margin: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void
  },
  Padding: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void
  },
  Border: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.bool, FFIType.bool, FFIType.bool, FFIType.bool],
    returns: FFIType.void
  },
  BorderStyle: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void
  },
  CustomBorder: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void
  },
  FreeString: {
    args: [FFIType.ptr],
    returns: FFIType.void
  },
  Inherit: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.void
  },
  WithWhitespaceChars: {
    args: [FFIType.ptr],
    returns: FFIType.ptr
  },
  WithWhitespaceBackground: {
    args: [FFIType.ptr, FFIType.int],
    returns: FFIType.ptr
  },
  WithWhitespaceForeground: {
    args: [FFIType.ptr, FFIType.int],
    returns: FFIType.ptr
  },
  Place: {
    args: [FFIType.int, FFIType.int, FFIType.f64, FFIType.f64, FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr
  }
})
