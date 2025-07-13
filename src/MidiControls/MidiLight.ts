import {default as Midi, Note} from 'easymidi';
import {EventEmitter} from 'events';
import { MidiControl, MidiControlOutput } from './MidiIO';

export interface MidiLightOptions {
}
export class MidiLight implements MidiControlOutput {
    private channel: number;
    private buttonId: number;
    private options: MidiLightOptions;
    private midi?: Midi.Output | null;
    private control: MidiControl;

    public constructor(channel: number, buttonId: number, options: MidiLightOptions = {}) {
        this.channel = channel;
        this.buttonId = buttonId;
        this.options = options;
    }

    public listen(midi: Midi.Output) {
        this.midi = midi;
        this.midi.send("noteon", {
            channel: this.channel,
            note: this.buttonId,
            velocity: this.control.value ? 127 : 0
        } as Note);
    }

    public setControl(control: MidiControl): void {
        this.control = control;
        control.on('valueChanged', (value: number) => {
            if (this.midi) {
                this.midi.send("noteon", {
                    channel: this.channel,
                    note: this.buttonId,
                    velocity: value ? 127 : 0
                } as Note);
            }
        });
    }

    public close() {
        this.midi = null;
    }
}