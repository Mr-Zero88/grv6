import { EventEmitter } from "events";
import {default as Midi} from 'easymidi';
import { MidiControl, MidiControlInput, MidiControlOutput } from "./MidiIO";
import { MidiButton } from "./MidiButton";
import { MidiLight } from "./MidiLight";

export class MidiBoolean extends EventEmitter implements MidiControl {
    private input?: MidiControlInput | null;
    private output?: MidiControlOutput | null;
    private value: boolean;

    constructor(input: MidiControlInput | null, output: MidiControlOutput | null, options?: null) {
        super();
        this.input = input;
        this.output = output;
        this.output?.setControl(this);
        // You can use options if needed
    }
    
    public listen(midi: [Midi.Input, Midi.Output]): void {
        this.input?.listen(midi[0]);
        this.output?.listen(midi[1]);

        if (this.input instanceof MidiButton) {
            this.input.on("pressed", () => {
                this.value = !this.value;
                this.emit("valueChanged", this.value);
            });
        }
    }

    close(): void {
        this.input?.close();
        this.output?.close();
    }
}