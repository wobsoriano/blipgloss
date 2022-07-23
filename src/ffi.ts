import { dlopen, FFIType } from 'bun:ffi'

const location = new URL(`../release/${process.platform}-${process.arch}`, import.meta.url).pathname
export const { symbols } = dlopen(location, {
  NewStyle: {
    args: [],
    returns: FFIType.ptr
  },
  Render: {
    args: [FFIType.ptr, FFIType.ptr],
    returns: FFIType.ptr
  },
  Copy: {
    args: [],
    returns: FFIType.ptr
  },
  SetColorValue: {
    args: [FFIType.ptr, FFIType.ptr, FFIType.ptr],
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
  Color: {
    args: [FFIType.ptr],
    returns: FFIType.ptr
  },
  HasDarkBackground: {
    args: [],
    returns: FFIType.bool
  },
  FreeString: {
    args: [FFIType.ptr],
    returns: FFIType.void
  }
})
