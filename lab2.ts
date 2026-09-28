interface JewelryFactory {
    createEarring(weight: number, complexity: number): Jewelry;
    createRing(weight: number, complexity: number): Jewelry;
    createChain(weight: number, complexity: number): Jewelry;
    createPendant(weight: number, complexity: number): Jewelry;
    createBracelet(weight: number, complexity: number): Jewelry;
}

interface Jewelry {
    getName(): string;
    getPrice(): number;
}
