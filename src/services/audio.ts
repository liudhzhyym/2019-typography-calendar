import { Injectable } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio';
import { IS_DEBUG } from '../utils/constants';

const TEAR_AUDIO_CNT = 4;

@Injectable()
export class AudioService {

    constructor(protected nativeAudio: NativeAudio) {
    }

    async init() {
        for (let i = 0; i < TEAR_AUDIO_CNT; ++i) {
            await this._preload('tear' + i);
        }
    }

    play(name: string) {
        if (name === 'tear') {
            name += Math.floor(Math.random() * TEAR_AUDIO_CNT);
        }

        if (IS_DEBUG) {
            const audio = new Audio(`assets/audio/${name}.mp3`);
            audio.play().catch(e => console.error(e));
        }
        else {
            this.nativeAudio.play(name);
        }
    }

    protected async _preload(name: string) {
        if (IS_DEBUG) {
            return;
        }
        await this.nativeAudio.preloadSimple(name, `assets/audio/${name}.mp3`)
            .then(() => {
            }, err => {
                console.log(err);
            });
    }

}
