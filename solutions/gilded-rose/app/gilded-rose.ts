export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name: string, sellIn: number, quality: number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

const MIN_QUALITY = 0;
const MAX_QUALITY = 50;

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            this.updateQualityFor(item);
        }

        return this.items;
    }

    private updateQualityFor(item: Item) {
        const agedBrie = 'Aged Brie';
        const backstagePasses = 'Backstage passes to a TAFKAL80ETC concert';

        if (this.isLegendaryItem(item)) {
            return;
        }

        if (item.name === agedBrie) {
            this.processAgedBrie(item);
        } else if (item.name == backstagePasses) {
            this.processBackstagePasses(item);
        } else if (item.name.startsWith("Conjured")) {
            this.processConjured(item);
        } else {
            this.processNormalItem(item);
        }

        this.decreaseSellIn(item);
    }

    private processNormalItem(item: Item) {
        this.decreaseQuality(item);

        if (this.hasExpired(item)) {
            this.decreaseQuality(item);
        }
    }

    private processBackstagePasses(item: Item) {
        const LIMIT_IN_DAYS_TO_DECREASE_BY_THREE = 6;
        const DAYS_REMAINING_TO_CONCERT = 11;

        if (this.concertHasHappened(item)) {
            item.quality = 0
        } else if (item.sellIn < LIMIT_IN_DAYS_TO_DECREASE_BY_THREE) {
            this.increaseQuality(item, 3);
        } else if (item.sellIn < DAYS_REMAINING_TO_CONCERT) {
            this.increaseQuality(item, 2);
        } else if (item.sellIn >= DAYS_REMAINING_TO_CONCERT) {
            this.increaseQuality(item);
        }
    }

    private processAgedBrie(item: Item) {
        this.increaseQuality(item);

        if (this.hasExpired(item)) {
            this.increaseQuality(item);
        }
    }

    private processConjured(item: Item) {
        this.decreaseQuality(item, 2);

        if (this.hasExpired(item)) {
            this.decreaseQuality(item, 2);
        }
    }

    private isLegendaryItem(item: Item) {
        const sulfuras = 'Sulfuras, Hand of Ragnaros';
        return item.name === sulfuras;
    }

    private decreaseSellIn(item: Item) {
        item.sellIn = item.sellIn - 1;
    }

    private decreaseQuality(item: Item, by: number = 1) {
        item.quality -= by;
        if (item.quality < MIN_QUALITY) {
            item.quality = MIN_QUALITY;
        }
    }

    private increaseQuality(item: Item, by: number = 1) {
        item.quality += by
        if (item.quality > MAX_QUALITY) {
            item.quality = MAX_QUALITY;
        }
    }

    private hasExpired(item: Item) {
        return item.sellIn < 1;
    }


    private concertHasHappened(item: Item) {
        return item.sellIn < 1;
    }
}
