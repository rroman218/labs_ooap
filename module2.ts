
import { writeFile } from "node:fs/promises";

// ==========================================
// 1. Клас Student
// ==========================================

class Student {
    constructor(
        public fullName: string,
        public birthDate: string,
        public faculty: string,
        public group: string,
        public educationForm: string
    ) {}

    clone(): Student {
        return Object.assign(
            Object.create(Object.getPrototypeOf(this)),
            this
        );
    }

    getInfo(): string {
        return `
ПІБ: ${this.fullName}
Дата народження: ${this.birthDate}
Факультет: ${this.faculty}
Група: ${this.group}
Форма навчання: ${this.educationForm}`;
    }
}

// ==========================================
// 2. Клас Prototype (кімната)
// ==========================================

abstract class Room {
    public residents: Student[] = [];

    constructor(
        public roomNumber: number,
        public capacity: number,
        public roomType: string,
        public rent: number
    ) {}

    // Клонування кімнати
    public clone(newRoomNumber: number): this {
        const clone = Object.assign(
            Object.create(Object.getPrototypeOf(this)),
            this
        );

        clone.roomNumber = newRoomNumber;

        // Копіювання мешканців
        clone.residents = this.residents.map(
            student => student.clone()
        );

        return clone;
    }

    // Додавання мешканця
    addResident(student: Student): void {
        if (this.residents.length >= this.capacity) {
            throw new Error("Кімната заповнена!");
        }

        this.residents.push(student);
    }

    // Інформація про кімнату
    getInfo(): string {
        let result = `
================================
КІМНАТА № ${this.roomNumber}
================================
Тип: ${this.roomType}
Місткість: ${this.capacity}
Кількість мешканців: ${this.residents.length}
`;

        this.residents.forEach((student, index) => {
            result += `
Мешканець №${index + 1}
Квартплата: ${this.rent} грн
${student.getInfo()}
`;
        });

        return result;
    }
}

// ==========================================
// 3. Двомісна кімната
// ==========================================

class DoubleRoom extends Room {
    constructor(roomNumber: number) {
        super(roomNumber, 2, "Двомісна", 800);
    }
}

// ==========================================
// 4. Трьохмісна кімната
// ==========================================

class TripleRoom extends Room {
    constructor(roomNumber: number) {
        super(roomNumber, 3, "Трьохмісна", 700);
    }
}

// ==========================================
// 5. Клас Dormitory
// ==========================================

class Dormitory {
    private rooms: Room[] = [];

    addRoom(room: Room): void {
        if (this.rooms.some(r => r.roomNumber === room.roomNumber)) {
            throw new Error("Така кімната вже існує!");
        }

        this.rooms.push(room);
    }

    getRoom(roomNumber: number): Room | undefined {
        return this.rooms.find(
            room => room.roomNumber === roomNumber
        );
    }

    // Створення кімнати через прототип
    cloneRoom(prototypeNumber: number, newRoomNumber: number): void {
        const prototype = this.getRoom(prototypeNumber);

        if (!prototype) {
            throw new Error("Прототип кімнати не знайдено!");
        }

        const clone = prototype.clone(newRoomNumber);

        this.addRoom(clone);
    }

    // Додавання студента
    addStudent(roomNumber: number, student: Student): void {
        const room = this.getRoom(roomNumber);

        if (!room) {
            throw new Error("Кімнату не знайдено!");
        }

        room.addResident(student);
    }

    // Формування звіту
    async generateReport(): Promise<void> {
        let report = "ЗВІТ ПРО МЕШКАНЦІВ ГУРТОЖИТКУ\n";
        report += `Дата: ${new Date().toLocaleDateString("uk-UA")}\n`;
        report += `Кількість кімнат: ${this.rooms.length}\n`;

        for (const room of this.rooms) {
            report += room.getInfo();
        }

        await writeFile("report.txt", report, "utf-8");

        console.log("Звіт створено: report.txt");
    }
}

// ==========================================
// 6. Демонстрація роботи (Client Code)
// ==========================================

async function clientCode(): Promise<void> {
    const dormitory = new Dormitory();

    // Створення прототипів
    const doublePrototype = new DoubleRoom(1);
    const triplePrototype = new TripleRoom(2);

    // Додавання прототипів
    dormitory.addRoom(doublePrototype);
    dormitory.addRoom(triplePrototype);

    // Створення копій кімнат
    dormitory.cloneRoom(1, 101);
    dormitory.cloneRoom(2, 102);
    dormitory.cloneRoom(2, 103);

    // Додавання мешканців
    dormitory.addStudent(101, new Student(
        "Іваненко Іван Іванович",
        "15.05.2005",
        "Комп'ютерні науки",
        "КН-21",
        "Державне замовлення"
    ));

    dormitory.addStudent(101, new Student(
        "Петренко Петро Олександрович",
        "20.08.2004",
        "Інформаційні технології",
        "ІТ-22",
        "За кошти фізичних осіб"
    ));

    dormitory.addStudent(102, new Student(
        "Коваленко Марія Андріївна",
        "10.02.2005",
        "Економіка",
        "ЕК-21",
        "Державне замовлення"
    ));

    dormitory.addStudent(102, new Student(
        "Шевченко Олег Васильович",
        "12.11.2004",
        "Комп'ютерні науки",
        "КН-22",
        "Державне замовлення"
    ));

    // Виведення інформації
    for (const room of dormitory["rooms"]) {
        console.log(room.getInfo());
    }

    // Перевірка Prototype
    const original = dormitory.getRoom(1)!;
    const copy = original.clone(200);

    console.log("Перевірка клонування:");

    console.log(
        "Оригінал і копія — різні об'єкти:",
        original !== copy
    );

    console.log(
        "Масиви мешканців — різні об'єкти:",
        original.residents !== copy.residents
    );

    // Формування звіту
    await dormitory.generateReport();
}

clientCode().catch(error => console.error(error));
