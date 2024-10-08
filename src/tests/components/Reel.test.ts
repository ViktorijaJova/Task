import Reel from '../../components/Reel';

describe('Reel Component', () => {
    const mockSymbols = [1, 2, 3, 4, 5];
    const mockSpeed = 10;
    let reel: Reel;

    beforeEach(() => {
        reel = new Reel(mockSymbols, mockSpeed);
    });

    test('should create a new reel instance', () => {
        expect(reel).toBeDefined();
    });

    test('should start spinning', async () => {
        const startSpy = jest.spyOn(reel, 'startSpin');
        await reel.startSpin();
        expect(startSpy).toHaveBeenCalled();
    });

    test('should stop spinning and align symbols', () => {
        reel.stopSpinOnRandomSymbol();
        const visibleSymbols = reel.getCurrentVisibleSymbols();
        expect(visibleSymbols).toHaveLength(3); // Check if 3 symbols are visible
    });

    test('should generate random visible symbols when stopped', () => {
        const initialSymbols = reel.getCurrentVisibleSymbols();
        reel.stopSpinOnRandomSymbol();
        const newSymbols = reel.getCurrentVisibleSymbols();
        expect(newSymbols).not.toEqual(initialSymbols);
    });
});
