import * as PIXI from 'pixi.js';
import BetButton from '../../components/BetButton'; 

describe('BetButton', () => {
    it('should set initial bet correctly', () => {
        const bets = [10, 20, 50];
        const button = new BetButton({ bets, buttonWidth: 100, buttonHeight: 50, listWidth: 100, listHeight: 150 });
        expect(button.currentBet).toBe(10); 
    });

    it('should increase bet correctly', () => {
        const bets = [10, 20, 50];
        const button = new BetButton({ bets, buttonWidth: 100, buttonHeight: 50, listWidth: 100, listHeight: 150 });
        button.increaseBet();
        expect(button.currentBet).toBe(20); 
    });

    it('should decrease bet correctly', () => {
        const bets = [10, 20, 50];
        const button = new BetButton({ bets, buttonWidth: 100, buttonHeight: 50, listWidth: 100, listHeight: 150 });
        button.increaseBet(); 
        button.decreaseBet(); 
        expect(button.currentBet).toBe(10); 
    });
});
