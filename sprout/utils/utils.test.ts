/** @format */

import { getStats } from './utils';

describe('getStats', () => {
  describe('if given stats', () => {
    it('returns the common name given', () => {
      const plantData = {
        commonName: 'common sunflower',
        scientificName: 'Helianthus annuus',
        family: 'Aster family',
        duration: 'annual',
        droughtTol: 'Medium',
        shadeTol: 'Intolerant',
        fertility: 'Low',
        minTemp: 11.111111111,
        phMax: 7.8,
        phMin: 5.5,
        waterMax: 152.40030480060963,
        waterMin: 30.48
      };
      expect(getStats(plantData).commonName).toBe('common sunflower');
    });
    it('returns duration of plant', () => {
      const plantData = {
        commonName: 'common sunflower',
        scientificName: 'Helianthus annuus',
        family: 'Aster family',
        duration: 'annual',
        droughtTol: 'Medium',
        shadeTol: 'Intolerant',
        fertility: 'Low',
        minTemp: 11.11111111,
        phMax: 7.8,
        phMin: 5.5,
        waterMax: 152.40030480060963,
        waterMin: 30.48
      };
      expect(getStats(plantData).duration).toBe('annual');
    });
    it('returns family name', () => {
      const plantData = {
        commonName: 'common sunflower',
        scientificName: 'Helianthus annuus',
        family: 'Aster family',
        duration: 'annual',
        droughtTol: 'Medium',
        shadeTol: 'Intolerant',
        fertility: 'Low',
        minTemp: 11.111111111,
        phMax: 7.8,
        phMin: 5.5,
        waterMax: 152.40030480060963,
        waterMin: 30.48
      };
      expect(getStats(plantData).family).toBe('Aster family');
    });
    it('returns scientific name of the plant', () => {
      const plantData = {
        commonName: 'common sunflower',
        scientificName: 'Helianthus annuus',
        family: 'Aster family',
        duration: 'annual',
        droughtTol: 'Medium',
        shadeTol: 'Intolerant',
        fertility: 'Low',
        minTemp: 11.111111111,
        phMax: 7.8,
        phMin: 5.5,
        waterMax: 152.40030480060963,
        waterMin: 30.48
      };
      expect(getStats(plantData).scientificName).toBe('Helianthus annuus');
    });
    it('returns average precipitation level to one decimal point if not an integer', () => {
      const plantData = {
        commonName: 'common sunflower',
        scientificName: 'Helianthus annuus',
        family: 'Aster family',
        duration: 'annual',
        droughtTol: 'Medium',
        shadeTol: 'Intolerant',
        fertility: 'Low',
        minTemp: 11.111111111,
        phMax: 7.8,
        phMin: 5.5,
        waterMax: 152.40030480060963,
        waterMin: 30.48
      };
      expect(getStats(plantData).precipitation).toBe(91.4);
    });
    it('returns average precipitation level as a whole number if an integer', () => {
      const plantData = {
        commonName: 'common sunflower',
        scientificName: 'Helianthus annuus',
        family: 'Aster family',
        duration: 'annual',
        droughtTol: 'Medium',
        shadeTol: 'Intolerant',
        fertility: 'Low',
        minTemp: 11.111111111,
        phMax: 7.8,
        phMin: 5.5,
        waterMax: 152,
        waterMin: 30
      };
      expect(getStats(plantData).precipitation).toBe(91);
    });
    it('returns average ph level to one decimal if not an integer', () => {
      const plantData = {
        commonName: 'common sunflower',
        scientificName: 'Helianthus annuus',
        family: 'Aster family',
        duration: 'annual',
        droughtTol: 'Medium',
        shadeTol: 'Intolerant',
        fertility: 'Low',
        minTemp: 11.111111111,
        phMax: 7.8,
        phMin: 5.5,
        waterMax: 152,
        waterMin: 30
      };
      expect(getStats(plantData).ph).toBe(6.7);
    });
    it('returns average ph level as an integer if given an integer', () => {
      const plantData = {
        commonName: 'common sunflower',
        scientificName: 'Helianthus annuus',
        family: 'Aster family',
        duration: 'annual',
        droughtTol: 'Medium',
        shadeTol: 'Intolerant',
        fertility: 'Low',
        minTemp: 11.111111111,
        phMax: 7,
        phMin: 5,
        waterMax: 152,
        waterMin: 30
      };
      expect(getStats(plantData).ph).toBe(6);
    });
    it('returns light level needed as a string', () => {
      const plantData = {
        commonName: 'common sunflower',
        scientificName: 'Helianthus annuus',
        family: 'Aster family',
        duration: 'annual',
        droughtTol: 'Medium',
        shadeTol: 'Intolerant',
        fertility: 'Low',
        minTemp: 11.111111111,
        phMax: 7,
        phMin: 5,
        waterMax: 152,
        waterMin: 30
      };
      expect(getStats(plantData).lightLevel).toBe('Medium');
    });
    it('returns light level needed as a string', () => {
      const plantData = {
        commonName: 'common sunflower',
        scientificName: 'Helianthus annuus',
        family: 'Aster family',
        duration: 'annual',
        droughtTol: 'Medium',
        shadeTol: 'Intolerant',
        fertility: 'Low',
        minTemp: 11.111111111,
        phMax: 7,
        phMin: 5,
        waterMax: 152,
        waterMin: 30
      };
      expect(getStats(plantData).lightLevel).toBe('Medium');
    });
    it('returns min temp to one decimal point if not an integer', () => {
      const plantData = {
        commonName: 'common sunflower',
        scientificName: 'Helianthus annuus',
        family: 'Aster family',
        duration: 'annual',
        droughtTol: 'Medium',
        shadeTol: 'Intolerant',
        fertility: 'Low',
        minTemp: 11.111111111,
        phMax: 7,
        phMin: 5,
        waterMax: 152,
        waterMin: 30
      };
      expect(getStats(plantData).minTemp).toBe(11.1);
    });
    it('returns min temp as an integer if given an integer', () => {
      const plantData = {
        commonName: 'common sunflower',
        scientificName: 'Helianthus annuus',
        family: 'Aster family',
        duration: 'annual',
        droughtTol: 'Medium',
        shadeTol: 'Intolerant',
        fertility: 'Low',
        minTemp: 11,
        phMax: 7,
        phMin: 5,
        waterMax: 152,
        waterMin: 30
      };
      expect(getStats(plantData).minTemp).toBe(11);
    });
    it('returns difficulty based on stats (green)', () => {
      const plantData = {
        commonName: 'common sunflower',
        scientificName: 'Helianthus annuus',
        family: 'Aster family',
        duration: 'annual',
        droughtTol: 'Medium',
        shadeTol: 'Intolerant',
        fertility: 'Low',
        minTemp: 11,
        phMax: 7,
        phMin: 5,
        waterMax: 152,
        waterMin: 30
      };
      expect(getStats(plantData).difficulty).toBe('green');
    });
    it('returns difficulty based on stats (red)', () => {
      const plantData = {
        commonName: 'common sunflower',
        scientificName: 'Helianthus annuus',
        family: 'Aster family',
        duration: 'annual',
        droughtTol: 'Intolerant',
        shadeTol: 'Low',
        fertility: 'High',
        minTemp: 11,
        phMax: 7,
        phMin: 5,
        waterMax: 152,
        waterMin: 30
      };
      expect(getStats(plantData).difficulty).toBe('red');
    });
    it('returns watering schedule based on average precipitation (medium)', () => {
      const plantData = {
        commonName: 'common sunflower',
        scientificName: 'Helianthus annuus',
        family: 'Aster family',
        duration: 'annual',
        droughtTol: 'Intolerant',
        shadeTol: 'Low',
        fertility: 'High',
        minTemp: 11,
        phMax: 7,
        phMin: 5,
        waterMax: 152,
        waterMin: 30
      };
      expect(getStats(plantData).wateringSchedule).toBe('medium: once a week');
    });
    it('returns watering schedule based on average precipitation (low)', () => {
      const plantData = {
        commonName: 'common sunflower',
        scientificName: 'Helianthus annuus',
        family: 'Aster family',
        duration: 'annual',
        droughtTol: 'Intolerant',
        shadeTol: 'Low',
        fertility: 'High',
        minTemp: 11,
        phMax: 7,
        phMin: 5,
        waterMax: 40,
        waterMin: 1
      };
      expect(getStats(plantData).wateringSchedule).toBe('low: once a month');
    });
    it('returns watering schedule based on average precipitation (high)', () => {
      const plantData = {
        commonName: 'common sunflower',
        scientificName: 'Helianthus annuus',
        family: 'Aster family',
        duration: 'annual',
        droughtTol: 'Intolerant',
        shadeTol: 'Low',
        fertility: 'High',
        minTemp: 11,
        phMax: 7,
        phMin: 5,
        waterMax: 500,
        waterMin: 100
      };
      expect(getStats(plantData).wateringSchedule).toBe(
        'high: once every one to three days'
      );
    });
  });
  describe('default options', () => {
    it('if not given a common name, returns scientificName as commonName', () => {
      const plantData = {
        commonName: null,
        scientificName: 'Helianthus annuus',
        family: 'Aster family',
        duration: 'annual',
        droughtTol: 'Intolerant',
        shadeTol: 'Low',
        fertility: 'High',
        minTemp: 11,
        phMax: 7,
        phMin: 5,
        waterMax: 500,
        waterMin: 100
      };
      expect(getStats(plantData).commonName).toBe('Helianthus annuus');
    });
    it('if not given a duration, returns n/a', () => {
      const plantData = {
        commonName: null,
        scientificName: 'Helianthus annuus',
        family: 'Aster family',
        duration: null,
        droughtTol: 'Intolerant',
        shadeTol: 'Low',
        fertility: 'High',
        minTemp: 11,
        phMax: 7,
        phMin: 5,
        waterMax: 500,
        waterMin: 100
      };
      expect(getStats(plantData).duration).toBe('n/a');
    });
    it('if not given precipitation data, returns a default average of 70', () => {
      const plantData = {
        commonName: null,
        scientificName: 'Helianthus annuus',
        family: 'Aster family',
        duration: null,
        droughtTol: 'Intolerant',
        shadeTol: 'Low',
        fertility: 'High',
        minTemp: null,
        phMax: null,
        phMin: null,
        waterMax: null,
        waterMin: null
      };
      expect(getStats(plantData).precipitation).toBe(70);
    });
    it('if not given ph data, returns a default average of 6.5', () => {
      const plantData = {
        commonName: null,
        scientificName: 'Helianthus annuus',
        family: 'Aster family',
        duration: null,
        droughtTol: 'Intolerant',
        shadeTol: 'Low',
        fertility: 'High',
        minTemp: null,
        phMax: null,
        phMin: null,
        waterMax: null,
        waterMin: null
      };
      expect(getStats(plantData).ph).toBe(6.5);
    });
    it('if not given temperature data, returns a default average of 15', () => {
      const plantData = {
        commonName: null,
        scientificName: 'Helianthus annuus',
        family: 'Aster family',
        duration: null,
        droughtTol: 'Intolerant',
        shadeTol: 'Low',
        fertility: 'High',
        minTemp: null,
        phMax: null,
        phMin: null,
        waterMax: null,
        waterMin: null
      };
      expect(getStats(plantData).minTemp).toBe(15);
    });
    it('if not given lightLevel, returns a default average of Medium', () => {
      const plantData = {
        commonName: null,
        scientificName: 'Helianthus annuus',
        family: 'Aster family',
        duration: null,
        droughtTol: null,
        shadeTol: null,
        fertility: null,
        minTemp: null,
        phMax: null,
        phMin: null,
        waterMax: null,
        waterMin: null
      };
      expect(getStats(plantData).lightLevel).toBe('Medium');
    });
    it('if not given wateringSchedule, returns a default average of Medium', () => {
      const plantData = {
        commonName: null,
        scientificName: 'Helianthus annuus',
        family: 'Aster family',
        duration: null,
        droughtTol: null,
        shadeTol: null,
        fertility: null,
        minTemp: null,
        phMax: null,
        phMin: null,
        waterMax: null,
        waterMin: null
      };
      expect(getStats(plantData).wateringSchedule).toBe('medium: once a week');
    });
    it('if not given fertility, drought or shade data, returns a default average of amber difficulty', () => {
      const plantData = {
        commonName: null,
        scientificName: 'Helianthus annuus',
        family: 'Aster family',
        duration: null,
        droughtTol: null,
        shadeTol: null,
        fertility: null,
        minTemp: null,
        phMax: null,
        phMin: null,
        waterMax: null,
        waterMin: null
      };
      expect(getStats(plantData).difficulty).toBe('green');
    });
  });
});
