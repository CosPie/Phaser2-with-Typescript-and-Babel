import '../scss/main.scss';
import customPreload from './preload';
import autoPreload from './auto_preload';
import { gameConfig } from '../../typings/dto';

class IGame {
    private game: Phaser.Game;
    private static gameConfig: gameConfig;

    constructor() {
        IGame.gameConfig = {
            width: 'GLOBALWIDTH',
            height: 'GLOBALHEIGHT',
        };
        this.game = new Phaser.Game(
            Number(IGame.gameConfig.width),
            Number(IGame.gameConfig.height),
            Phaser.CANVAS,
            'gameContainer',
            {
                preload: () => {
                    this.preload();
                },
                create: () => {
                    this.create();
                },
            },
        );
        return this;
    }
    preload() {
        autoPreload(this.game);
        customPreload(this.game);
    }
    create() {
        let phaser2 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'phaser2');
        phaser2.scale.setTo(0.2, 0.2);
        phaser2.anchor.setTo(0.5, 0.5);
    }
}
window.onload = () => {
    const game = new IGame();
    console.log(game);
    // dev Env: replace with devURL
    // production Env: auto replace with android/IOS URL.
    console.log('GLOBALDOWNLOADURL');
};
