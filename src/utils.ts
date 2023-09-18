import { BlipglossColor } from './lib';

const utf8e = new TextEncoder();

export function encode<T>(data: T): Uint8Array {
	return utf8e.encode(`${data}\0`);
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

export function getColorType(value: BlipglossColor) {
	if (typeof value === 'string') {
		return 1;
	}

	if ('Light' in value && 'Dark' in value) {
		if (
			typeof value.Light !== 'string' &&
			'True' in value.Light &&
			'ANSI256' in value.Light &&
			'ANSI' in value.Light &&
			typeof value.Dark !== 'string' &&
			'True' in value.Dark &&
			'ANSI256' in value.Dark &&
			'ANSI' in value.Dark
		) {
			// CompleteAdaptiveColor
			return 4;
		}

		// AdaptiveColor
		return 2;
	}

	if ('True' in value && 'ANSI256' in value && 'ANSI' in value) {
		// CompleteColor
		return 3;
	}

	throw new Error(
		'Incorrect color type: Must be of type string, AdaptiveColor, CompleteColor, or CompleteAdaptiveColor.',
	);
}
