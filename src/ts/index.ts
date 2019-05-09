import '../scss/main.scss';
import initPreload from './preload';
import { gameConfig } from '../../typings/dto';

class IGame {
    private game: Phaser.Game;
    private static gameConfig: gameConfig;

    constructor() {
        IGame.gameConfig = {
            width: 480,
            height: 320,
        };
        this.game = new Phaser.Game(IGame.gameConfig.width, IGame.gameConfig.height, Phaser.CANVAS, 'gameContainer', {
            preload: this.preload,
            create: this.create,
        });
    }
    preload() {
        initPreload(this.game);
    }
    create() {
        let bar = this.game.add.graphics();
        bar.beginFill(0xf66666, 0.2);
        bar.drawRect(0, 100, IGame.gameConfig.width, 100);
        let style = { font: 'bold 24px Arial', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle' };
        let text = this.game.add.text(0, 0, 'phaser 2.4 text bounds', style);
        //  The Text is positioned at 0, 100
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
        text.setTextBounds(0, 100, IGame.gameConfig.width, 100);

        let logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        logo.scale.setTo(0.2, 0.2);
        logo.anchor.setTo(0.5, 0.5);
    }
}
window.onload = () => {
    const game = new IGame();
};
