import {default as Midi} from 'easymidi';
import {EventEmitter} from 'events';
import { MidiControlInput } from './MidiIO';

export interface MidiButtonOptions {
	noteoff?: boolean; // Whether to listen for note off events or velocity 0
}
export class MidiButton extends EventEmitter implements MidiControlInput {
	private channel: number;
	private buttonId: number;
	private options: MidiButtonOptions;
    private midi?: Midi.Input | null;
    private midiListeners: Array<[string, (...args: any[]) => void]> = [];

	public constructor(channel: number, buttonId: number, options: MidiButtonOptions = {}) {
		super();
		this.channel = channel;
		this.buttonId = buttonId;
		this.options = options;
	}

	public listen(midi: Midi.Input) {
        this.midi = midi;
        let noteOn = ({channel, note, velocity}) => {
			if (channel != this.channel || note != this.buttonId) return;
			if (!this.options.noteoff && velocity === 0) {
				this.emit("released");
			} else {
				this.emit("pressed");
			}
		};
        this.midiListeners.push(["noteon", noteOn]);
        midi.on("noteon", noteOn);
        if (this.options.noteoff) {
            let noteOff = ({channel, note}) => {
                if (channel != this.channel || note != this.buttonId) return;
                this.emit("released");
            };
            this.midiListeners.push(["noteoff", noteOff]);
            midi.on("noteoff", noteOff);
        }
	}

    public close() {
        if (this.midi) {
            this.midiListeners.forEach(([event, listener]) => {
                this.midi?.removeListener(event, listener);
            });
            this.midi = null;
        }
        this.removeAllListeners();
    }
}