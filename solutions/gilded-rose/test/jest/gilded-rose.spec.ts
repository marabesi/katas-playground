import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });
  it('should process Conjured item', () => {
    const gildedRose = new GildedRose([new Item('Conjured iPhone', 2, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(1);
    expect(items[0].quality).toBe(8);
  });
  it('should process Conjured item degrading after the sell in date', () => {
    const gildedRose = new GildedRose([new Item('Conjured iPhone', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(6);
  });
  it('should process Conjured item degrading non negative quality', () => {
    const gildedRose = new GildedRose([new Item('Conjured iPhone', 0, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
  });
});
