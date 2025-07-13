import {default as Midi} from 'easymidi';
import GRV6 from './grv6';

// Midi.getInputs().forEach((input) => {
//   console.log(`Input: ${input}`);
// });

// let input = new Midi.Input("DDJ-GRV6:DDJ-GRV6 MIDI 1 32:0");
// input.on("noteon", (param) => {
//   console.log(`Note On: ${param.note} Velocity: ${param.velocity} Channel: ${param.channel}`);
// });
// input.on("noteoff", (param) => {
//   console.log(`Note Off: ${param.note} Velocity: ${param.velocity} Channel: ${param.channel}`);
// });
// input.on("cc", (param) => {
//   console.log(`Control Change: Controller: ${param.controller} Value: ${param.value} Channel: ${param.channel}`);
// });
// input.on("program", (param) => {
//   console.log(`Program Change: Number: ${param.number} Channel: ${param.channel}`);
// });
// input.on("channel aftertouch", (param) => {
//   console.log(`Channel Aftertouch: Pressure: ${param.pressure} Channel: ${param.channel}`);
// });
// input.on("pitch", (param) => {
//   console.log(`Pitch Bend: Value: ${param.value} Channel: ${param.channel}`);
// });
// input.on("poly aftertouch", (param) => {
//   console.log(`Polyphonic Aftertouch: Note: ${param.note} Pressure: ${param.pressure} Channel: ${param.channel}`);
// });
// input.on("mtc", (param) => {
//     console.log(`MTC: Type: ${param.type} Value: ${param.value}`);
// });
// input.on("position", (param) => {
//   console.log(`Position: Value: ${param.value}`);
// });
// input.on("select", (param) => {
//   console.log(`Song Select: Song: ${param.song}`);
// });
// input.on("sysex", (param) => {
//   console.log(`SysEx: Bytes: ${param.bytes}`);
// });

let grv6 = new GRV6();