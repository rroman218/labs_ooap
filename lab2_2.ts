interface Builder {
    produceLollipops(): void;
    produceChocolates(): void;
    produceWafers(): void;
    produceDragees(): void;
}

class CandySet {
    public name: string = "";
    public lollipops: number = 0;
    public chocolates: number = 0;
    public wafers: number = 0;
    public dragees: number = 0;
    public price: number = 0;

    public showInfo(): void {
        console.log(`\nПодарунковий набір: ${this.name}`);
        console.log(`Льодяники: ${this.lollipops.toFixed(2)} кг`);
        console.log(`Шоколадні цукерки: ${this.chocolates.toFixed(2)} кг`);
        console.log(`Вафлі: ${this.wafers.toFixed(2)} кг`);
        console.log(`Драже: ${this.dragees.toFixed(2)} кг`);
        console.log(`Загальна вага: ${
            (this.lollipops + this.chocolates +
            this.wafers + this.dragees).toFixed(2)
        } кг`);
        console.log(`Вартість набору: ${this.price.toFixed(2)} грн`);
    }
}

class CandySetBuilder implements Builder {
    private product: CandySet;

    constructor(
        private prices: {
            lollipops: number;
            chocolates: number;
            wafers: number;
            dragees: number;
        }
    ) {
        this.reset();
    }

    public reset(): void {
        this.product = new CandySet();
    }

    public setName(name: string): void {
        this.product.name = name;
    }

    public produceLollipops(): void {
        this.product.lollipops = 0.4;
        this.product.price +=
            this.product.lollipops * this.prices.lollipops;
    }

    public produceChocolates(): void {
        this.product.chocolates = 0.3;
        this.product.price +=
            this.product.chocolates * this.prices.chocolates;
    }

    public produceWafers(): void {
        this.product.wafers = 0.2;
        this.product.price +=
            this.product.wafers * this.prices.wafers;
    }

    public produceDragees(): void {
        this.product.dragees = 0.1;
        this.product.price +=
            this.product.dragees * this.prices.dragees;
    }

    public getProduct(): CandySet {
        const result = this.product;
        this.reset();
        return result;
    }
}

class EconomyBuilder extends CandySetBuilder {
    constructor(prices: {
        lollipops: number;
        chocolates: number;
        wafers: number;
        dragees: number;
    }) {
        super(prices);
    }

    public build(): CandySet {
        this.reset();
        this.setName("Ласунка");
        this.produceLollipops();
        this.produceChocolates();
        this.produceWafers();
        this.produceDragees();
        return this.getProduct();
    }
}

class StandardBuilder extends CandySetBuilder {
    constructor(prices: {
        lollipops: number;
        chocolates: number;
        wafers: number;
        dragees: number;
    }) {
        super(prices);
    }

    public build(): CandySet {
        this.reset();
        this.setName("Наминайко");
        this.produceLollipops();
        this.produceChocolates();
        this.produceWafers();
        this.produceDragees();

        // Стандартний набір: інший розподіл ваги
        return this.getProduct();
    }
}

class ExtraBuilder extends CandySetBuilder {
    constructor(prices: {
        lollipops: number;
        chocolates: number;
        wafers: number;
        dragees: number;
    }) {
        super(prices);
    }

    public build(): CandySet {
        this.reset();
        this.setName("Пан Коцький");

        this.produceLollipops();
        this.produceChocolates();
        this.produceWafers();
        this.produceDragees();

        return this.getProduct();
    }
}

class Director {
    private builder: CandySetBuilder;

    public setBuilder(builder: CandySetBuilder): void {
        this.builder = builder;
    }

    public buildSet(): CandySet {
        return this.builder.build();
    }
}

function main(): void {
    const prices = {
        lollipops: 80,
        chocolates: 250,
        wafers: 120,
        dragees: 180
    };

    console.log("Ціни за 1 кг солодощів:");
    console.log(`Льодяники: ${prices.lollipops} грн`);
    console.log(`Шоколадні цукерки: ${prices.chocolates} грн`);
    console.log(`Вафлі: ${prices.wafers} грн`);
    console.log(`Драже: ${prices.dragees} грн`);

    const director = new Director();

    console.log("\nОберіть набір:");
    console.log("1 — Економічний «Ласунка»");
    console.log("2 — Стандартний «Наминайко»");
    console.log("3 — Екстра «Пан Коцький»");

    // Для прикладу обрано економічний набір.
    const choice = 1;

    let builder: CandySetBuilder;

    switch (choice) {
        case 1:
            builder = new EconomyBuilder(prices);
            break;
        case 2:
            builder = new StandardBuilder(prices);
            break;
        case 3:
            builder = new ExtraBuilder(prices);
            break;
        default:
            console.log("Невідомий тип набору.");
            return;
    }

    director.setBuilder(builder);
    const candySet = director.buildSet();
    candySet.showInfo();
}

main();
