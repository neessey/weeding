// Lecteur audio réel (fichier MP3), même interface qu'avant :
// weddingAudio.subscribe / toggle / play / pause / setVolume

const AUDIO_SRC = '/assets/musique.mp3';

type Listener = (playing: boolean) => void;

class WeddingAudio {
  private audio: HTMLAudioElement | null = null;
  private listeners = new Set<Listener>();
  private playing = false;

  private getAudio(): HTMLAudioElement {
    if (!this.audio) {
      const a = new Audio(AUDIO_SRC);
      a.loop = true;
      a.preload = 'auto';
      a.volume = 0.65;
      a.addEventListener('play', () => this.setPlaying(true));
      a.addEventListener('pause', () => this.setPlaying(false));
      a.addEventListener('error', () => this.setPlaying(false));
      this.audio = a;
    }
    return this.audio;
  }

  private setPlaying(value: boolean) {
    if (this.playing === value) return;
    this.playing = value;
    this.listeners.forEach((l) => l(value));
  }

  async play() {
    try {
      await this.getAudio().play();
    } catch {
      this.setPlaying(false);
    }
  }

  pause() {
    this.getAudio().pause();
  }

  toggle() {
    if (this.playing) {
      this.pause();
    } else {
      void this.play();
    }
  }

  setVolume(value: number) {
    this.getAudio().volume = Math.min(1, Math.max(0, value));
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    listener(this.playing);
    return () => {
      this.listeners.delete(listener);
    };
  }
}

export const weddingAudio = new WeddingAudio();
