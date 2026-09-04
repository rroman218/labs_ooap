// Class that creates a new audio track
class AudioTrack {
    constructor(
        public title: string,
        public artist: string,
        public duration: number
    ) { }
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

