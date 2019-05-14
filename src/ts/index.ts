import '../scss/main.scss';
import initPreload from './preload';
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
        initPreload(this.game);
    }
    create() {
        let logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        logo.scale.setTo(0.2, 0.2);
        logo.anchor.setTo(0.5, 0.5);
    }
}
window.onload = () => {
    const game = new IGame();
    console.log(game);
    // dev Env: replace with devURL
    // production Env: auto replace with android/IOS URL.
    console.log('GLOBALDOWNLOADURL');
};
