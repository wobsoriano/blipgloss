import { CString } from 'bun:ffi'
import { symbols } from './ffi'

const utf8e = new TextEncoder()

export function encode<T>(data: T): Uint8Array {
  return utf8e.encode(data + "\0")
}

export function toString(ptr: any): string {
  const str = new CString(ptr)
  symbols.FreeString(str.ptr)
  return str.toString()
}

export function whichSidesBool(...args: boolean[]) {
  let [top, right, bottom, left, ok] = [false, false, false, false, false];

  switch (args.length) {
    case 1:
      top = args[0];
      bottom = args[0];
      left = args[0];
      right = args[0];
      ok = true;
      break;
    case 2:
      top = args[0];
      bottom = args[0];
      left = args[1];
      right = args[1];
      ok = true;
      break;
    case 3:
      top = args[0];
      left = args[1];
      right = args[1];
      bottom = args[2];
      ok = true;
      break;
    case 4:
      top = args[0];
      right = args[1];
      bottom = args[2];
      left = args[3];
      ok = true;
      break;
  }

  return [top, right, bottom, left, ok];
}
