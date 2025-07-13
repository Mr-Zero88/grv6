import {default as Midi} from 'easymidi';
import { EventEmitter } from 'events';

export interface MidiControlInput extends EventEmitter {
    listen(midi: Midi.Input): void;
    close(): void;
}

export interface MidiControlOutput {
    listen(midi: Midi.Output): void;
    setControl(control: MidiControl): void;
    close(): void;
}

export interface MidiControl<T = any> extends EventEmitter {
    value: T;
    new(input: MidiControlInput, output: MidiControlOutput, options?: any);
    listen(midi: [Midi.Input, Midi.Output]): void;
    close(): void;
}