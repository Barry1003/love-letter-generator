/**
 * A gentle, self-contained melody using the Web Audio API — no external file,
 * so it works offline and adds nothing to the bundle. A soft looping arpeggio.
 */
let ctx: AudioContext | null = null;
let stopFn: (() => void) | null = null;

export function playMelody() {
  if (typeof window === "undefined") return;
  stopMelody();
  try {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    ctx = new AC();
    const master = ctx.createGain();
    master.gain.value = 0.0;
    master.connect(ctx.destination);
    // fade in
    master.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 1.5);

    // C major 9 feel — gentle, romantic
    const notes = [523.25, 659.25, 783.99, 987.77, 783.99, 659.25];
    let i = 0;
    const beat = 0.62;

    const schedule = () => {
      if (!ctx) return;
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = notes[i % notes.length];
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.9, t + 0.05);
      g.gain.exponentialRampToValueAtTime(0.001, t + beat * 1.4);
      osc.connect(g);
      g.connect(master);
      osc.start(t);
      osc.stop(t + beat * 1.5);
      i++;
    };

    schedule();
    const id = window.setInterval(schedule, beat * 1000);
    stopFn = () => {
      window.clearInterval(id);
      if (ctx) {
        master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
        const c = ctx;
        setTimeout(() => c.close().catch(() => {}), 800);
      }
      ctx = null;
    };
  } catch {
    /* audio not available — ignore silently */
  }
}

export function stopMelody() {
  if (stopFn) {
    stopFn();
    stopFn = null;
  }
}
