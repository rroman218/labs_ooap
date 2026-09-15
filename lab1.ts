// Class that creates a new audio track

class AudioTrack {
    constructor(
        public title: string,
        public artist: string,
        public duration: string
    ) {}

    public showInfo(): void {
        console.log(
            `Title: ${this.title}, Artist: ${this.artist}, Duration: ${this.duration}`
        );
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
            this.audios.splice(index, 1);

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

        return audio;
    }

    public getAllTrack(): AudioTrack[] {
        return this.audios;
    }
}


// Proxy pattern

class ProxyAudioCollection implements AudioCollection {
    private realCollection: RealAudioCollection;

    constructor(realCollection: RealAudioCollection) {
        this.realCollection = realCollection;
    }

    public addTrack(audio: AudioTrack): void {
        console.log(`Proxy: Check access before adding`);

        this.realCollection.addTrack(audio);
    }

    public removeTrack(title: string): void {
        console.log(`Proxy: Check access before removing`);

        this.realCollection.removeTrack(title);
    }

    public findTrack(title: string): AudioTrack | undefined {
        console.log(`Proxy: Check access before searching`);

        return this.realCollection.findTrack(title);
    }

    public getAllTrack(): AudioTrack[] {
        console.log(`Proxy: Check access before getting all tracks`);

        return this.realCollection.getAllTrack();
    }
}


// ========= Client code =========

function main() {

    console.log(`===== Created Collection =====`);

    const realCollection = new RealAudioCollection();

    const proxy = new ProxyAudioCollection(realCollection);


    // Create audio tracks

    const audios = [
        new AudioTrack(
            "Believer",
            "Imagine Dragons",
            "2:04"
        ),

        new AudioTrack(
            "Numb",
            "Linkin Park",
            "3:05"
        ),

        new AudioTrack(
            "Faded",
            "Alan Walker",
            "3:32"
        )
    ];


    // ===== Add Tracks =====

    console.log(`\n===== Add Tracks =====`);

    for (let index = 0; index < audios.length; index++) {
        proxy.addTrack(audios[index]);
    }


    // ===== Find Track =====

    console.log(`\n===== Find Track =====`);

    const foundTrack = proxy.findTrack("Numb");

    if (foundTrack) {
        foundTrack.showInfo();
    }


    // ===== All Tracks =====

    console.log(`\n===== All Tracks =====`);

    const allTracks = proxy.getAllTrack();

    for (let index = 0; index < allTracks.length; index++) {
        allTracks[index].showInfo();
    }


    // ===== Remove Track =====

    console.log(`\n===== Remove Track =====`);

    proxy.removeTrack("Numb");


    // ===== Collection After Removing =====

    console.log(`\n===== Collection After Removing =====`);

    const tracksAfterRemove = proxy.getAllTrack();

    for (let index = 0; index < tracksAfterRemove.length; index++) {
        tracksAfterRemove[index].showInfo();
    }
}


main();
