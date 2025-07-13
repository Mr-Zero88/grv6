import { default as Midi, Note, ControlChange } from 'easymidi';
import { EventEmitter } from 'events';
import { MidiControler } from './MidiControls/MidiControler';
import { MidiButton } from './MidiControls/MidiButton';
import { MidiControl } from './MidiControls/MidiIO';
import { MidiBoolean } from './MidiControls/MidiBoolean';
import { MidiLight } from './MidiControls/MidiLight';
import hid from 'node-hid';

export default class GRV6 extends MidiControler {
	private connected: boolean = false;

	controls: Map<string, MidiControl> = new Map([
		// M7 CH CUE
		['channel.0.cue', new MidiBoolean(new MidiButton(0, 84), new MidiLight(0, 84))],
		['channel.1.cue', new MidiBoolean(new MidiButton(1, 84), new MidiLight(1, 84))],
		['channel.2.cue', new MidiBoolean(new MidiButton(2, 84), new MidiLight(2, 84))],
		['channel.3.cue', new MidiBoolean(new MidiButton(3, 84), new MidiLight(3, 84))],
		// M7 CH CUE (shift) Stem ISO
		['channel.0.stemiso', new MidiBoolean(new MidiButton(0, 57), new MidiLight(0, 57))],
		['channel.1.stemiso', new MidiBoolean(new MidiButton(1, 57), new MidiLight(1, 57))],
		['channel.2.stemiso', new MidiBoolean(new MidiButton(2, 57), new MidiLight(2, 57))],
		['channel.3.stemiso', new MidiBoolean(new MidiButton(3, 57), new MidiLight(3, 57))],
		// M8 MASTER LEVEL
		// M9 MASTER CUE

		// F8 BEAT FX ON/OFF
		['beatfx.onoff', new MidiBoolean(new MidiButton(4, 71), new MidiLight(4, 71))],
	]);

	constructor() {
		super();
		
		this.controls.forEach((control, key) => {
			control.on('valueChanged', (value: any) => {
				console.log(`Control ${key} value changed:`, value);
			});
		});

		if (hid.devices().some(device => device.product?.includes("DDJ-GRV6"))) {
			this.connected = true;
			console.log("Found DDJ-GRV6 controller, attempting to connect...");
			this.connect();
		}
		setInterval(() => {
			if (!this.connected) {
				if (hid.devices().some(device => device.product?.includes("DDJ-GRV6"))) {
						this.connect();
						console.log("Found DDJ-GRV6 controller, attempting to connect...");
						this.connected = true;
				}
			} else {
				if (!hid.devices().some(device => device.product?.includes("DDJ-GRV6"))) {
					this.connected = false;
					this.close();
					console.log("DDJ-GRV6 controller disconnected.");
				}
			}
		}, 1000);
	}

	connect() {
		let connectionInterval: NodeJS.Timeout | null = null;
		let tryConnect = () => {
			if(!this.connected) {
				if (connectionInterval) {
					clearInterval(connectionInterval);
				}
				return false;
			}
			console.log("Attempting to connect to GRV6 controller...");
			try {
				let port = Midi.getInputs().find((input) => input.includes("DDJ-GRV6"))
				if (!port) {
					throw new Error("GRV6 controller not found. Please ensure it is connected.");
				}
				let input = new Midi.Input(port);
				let output = new Midi.Output(port);
				this.listen([input, output]);
				if (connectionInterval) {
					clearInterval(connectionInterval);
				}
				console.log("Connected to GRV6 controller.");
				return true;
			} catch (error) {
				console.error("Failed to connect to GRV6 controller:", error);
				return false;
			}
		}
		if (!tryConnect()) {
			connectionInterval = setInterval(tryConnect, 5000); // Retry every 5 seconds
		}
	}
}