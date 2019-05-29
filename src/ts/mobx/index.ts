import { observable, computed, autorun, action } from 'mobx';

export default class Stock {
    // id = Math.random();
    @observable title = 'A';
    @observable price = 400;
    @observable num = 1000;

    @computed get totalVal() {
        return this.price * this.num;
    }

    @action
    buyIn = (num: number) => {
        this.num += num;
    };

    @action
    sayOut = (num: number) => {
        this.num -= num;
    };
}
