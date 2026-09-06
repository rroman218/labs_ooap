// Class that creates a new audio track
class AudioTrack {
    constructor(
        public title: string,
        public artist: string,
        public duration: string
    ) { }
    public showInfo(): void {
        console.log(`Title: ${this.title}, Artist: ${this.artist}, Duration: ${this.duration}`);
    }
}

// Interface for calling functions
interface AudioCollection {
    addTrack(audio: AudioTrack): void;
    removeTrack(title: string): void;
    findTrack(title: string): AudioTrack | undefined;
    getAllTrack(): AudioTrack[];
}

// Collection for saving audio tracks
class RealAudioCollection implements AudioCollection {
    private audios: AudioTrack[] = [];

    public addTrack(audio: AudioTrack): void {
        this.audios.push(audio);
        console.log(`Audio ${audio.title} added`);
    }

    public removeTrack(title: string): void {
        const index = this.audios.findIndex(
            (item) => item.title.toLowerCase() === title.toLowerCase()
        );

        if (index !== -1) {
            this.audios.splice(index, 1)
            console.log(`Audio track ${title} removed`);
        } else {
            console.log(`Audio track ${title} not found`);
        }
    }

    public findTrack(title: string): AudioTrack | undefined {
        const audio = this.audios.find(
            (item) => item.title.toLowerCase() === title.toLowerCase()
        );

        if (audio) {
            console.log(`Audio track ${title} found`);
        } else {
            console.log(`Audio track ${title} not found`);
        }

        return audio
    }

    public getAllTrack(): AudioTrack[] {
        return this.audios;
    }
}

// Proxy pattern
class ProxyAudioCollection implements AudioCollection {
    private realCollection: RealAudioCollection;

    // Async Loading animation
    private async loading(): Promise<void> {
        const animation = [".", "..", "..."]
        let i = 0

        const interval = setInterval(() => {
            console.log(`Loading ${animation[i]}`);
            i++;
            if (i > animation.length) {
                i = 0
            }
        }, 500)

        await new Promise<void>((resolve) => {
            setTimeout(resolve, 5000)
        });

        clearInterval(interval)
    }

    constructor(realCollection: RealAudioCollection) {
        this.realCollection = realCollection;
    }

    public addTrack(audio: AudioTrack): void {
        console.log(`Proxy: Check access before adding`);
        this.realCollection.addTrack(audio);
    }

    public removeTrack(title: string): void {

    }

    public findTrack(title: string): AudioTrack | undefined {

    }

    public getAllTrack(): AudioTrack[] {

    }
}

// ========= Client code =========
console.log(`===== Created Collection =====`);

const realCollection = new RealAudioCollection();
const proxy = new ProxyAudioCollection(realCollection);

// Created audio tracks
const audio1 = new AudioTrack("Believer", "Imagine Dragons", "2:04")
const audio2 = new AudioTrack("Numb", "Linkin Park", "3:05");
const audio3 = new AudioTrack("Faded", "Alan Walker", "3:32");

proxy.addTrack(audio1)
proxy.addTrack(audio2)
proxy.addTrack(audio3)
