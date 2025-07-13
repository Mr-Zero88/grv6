import { default as Midi } from 'easymidi';
import { EventEmitter } from 'events';
import { MidiControl } from './MidiIO';
import { MidiButton } from './MidiButton';

export interface MidiControlerOptions {
}
export class MidiControler extends EventEmitter {
	private options: MidiControlerOptions;
	protected controls: Map<string, MidiControl> = new Map([]);
	private midi?: [Midi.Input, Midi.Output] | null;

	public constructor(options: MidiControlerOptions = {}) {
		super();
		this.options = options;
	}

	public listen(midi: [Midi.Input, Midi.Output]) {
		this.midi = midi;
		this.controls.forEach((control, key) => {
			control.listen(midi);
		});
	}

	public close() {
		this.controls.forEach((control) => {
			control.close();
		});
		if (this.midi) {
			this.midi[0].close();
			this.midi[1].close();
			this.midi = null;
		}
	}
}