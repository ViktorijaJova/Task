import * as PIXI from 'pixi.js';
import BetButton from '../../components/BetButton'; // Assuming BetButton is exported

describe('BetButton', () => {
    it('should set initial bet correctly', () => {
        const bets = [10, 20, 50];
        const button = new BetButton({ bets, buttonWidth: 100, buttonHeight: 50, listWidth: 100, listHeight: 150 });
        expect(button.currentBet).toBe(10); // Initial bet should be the first one
    });

    it('should increase bet correctly', () => {
        const bets = [10, 20, 50];
        const button = new BetButton({ bets, buttonWidth: 100, buttonHeight: 50, listWidth: 100, listHeight: 150 });
        button.increaseBet();
        expect(button.currentBet).toBe(20); // Bet should increase
    });

    it('should decrease bet correctly', () => {
        const bets = [10, 20, 50];
        const button = new BetButton({ bets, buttonWidth: 100, buttonHeight: 50, listWidth: 100, listHeight: 150 });
        button.increaseBet(); // Increase first
        button.decreaseBet(); // Decrease again
        expect(button.currentBet).toBe(10); // Bet should go back to the first one
    });
});
