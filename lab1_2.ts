
class Passenger {
    constructor(
        public readonly id: number,
        public name: string
    ) {}
}

class Baggage {
    constructor(
        public readonly id: number,
        public description: string,
        public weight: number,
        public readonly passenger: Passenger
    ) {}

    getInfo(): string {
        return `Багаж №${this.id}: ${this.description}, ` +
            `вага: ${this.weight} кг, ` +
            `пасажир: ${this.passenger.name} ` +
            `(ID: ${this.passenger.id})`;
    }
}

// Багажне відділення контролює весь багаж
class BaggageDepartment {
    private baggageList: Baggage[] = [];

    addBaggage(baggage: Baggage): void {
        this.baggageList.push(baggage);
    }

    getAllBaggage(): Baggage[] {
        return [...this.baggageList];
    }

    getBaggageByPassenger(passengerId: number): Baggage[] {
        return this.baggageList.filter(
            baggage => baggage.passenger.id === passengerId
        );
    }

    getAllInfo(): string {
        if (this.baggageList.length === 0) {
            return "Багаж відсутній.";
        }

        return this.baggageList
            .map(baggage => baggage.getInfo())
            .join("\n");
    }
}

// Авіарейс делегує облік багажу багажному відділенню
class Flight {
    private baggageDepartment: BaggageDepartment;

    constructor(
        public readonly flightNumber: string,
        baggageDepartment: BaggageDepartment
    ) {
        this.baggageDepartment = baggageDepartment;
    }

    registerBaggage(baggage: Baggage): void {
        this.baggageDepartment.addBaggage(baggage);
    }

    showAllBaggage(): void {
        console.log(`Багаж авіарейсу ${this.flightNumber}:`);
        console.log(this.baggageDepartment.getAllInfo());
    }

    showPassengerBaggage(passengerId: number): void {
        const baggage =
            this.baggageDepartment.getBaggageByPassenger(passengerId);

        if (baggage.length === 0) {
            console.log(
                `Для пасажира ID ${passengerId} багаж не знайдено.`
            );
            return;
        }

        console.log(`Багаж пасажира ID ${passengerId}:`);
        baggage.forEach(item => console.log(item.getInfo()));
    }
}

// Створення пасажирів
const passenger1 = new Passenger(1, "Іван Петренко");
const passenger2 = new Passenger(2, "Олена Коваль");
const passenger3 = new Passenger(3, "Андрій Мельник");

// Створення багажного відділення
const department = new BaggageDepartment();

// Створення авіарейсу
const flight = new Flight("PS101", department);

// Реєстрація багажу
flight.registerBaggage(
    new Baggage(101, "Чорна валіза", 18.5, passenger1)
);

flight.registerBaggage(
    new Baggage(102, "Рюкзак", 7.2, passenger1)
);

flight.registerBaggage(
    new Baggage(103, "Синя валіза", 22.0, passenger2)
);

// Виведення інформації
flight.showAllBaggage();

console.log("\n------------------------\n");

flight.showPassengerBaggage(1);

console.log("\n------------------------\n");

flight.showPassengerBaggage(3);
