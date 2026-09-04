// Class that creates a new audio track
class AudioTrack {
    constructor(
        id: number,
        title: string,
        artist: string,
        duration: number
    ) { }
}

// Interface for calling functions
interface AudioCollection {
    addTrack(): void;
    removeTrack(): void;
    findTrack(): void;
    getAllTrack(): void;
}

