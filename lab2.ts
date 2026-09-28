interface JewelryFactory {
    createEarrings(weight: number, complexity: number): Jewelry;
    createRing(weight: number, complexity: number): Jewelry;
    createChain(weight: number, complexity: number): Jewelry;
    createPendant(weight: number, complexity: number): Jewelry;
    createBracelet(weight: number, complexity: number): Jewelry;
}

interface Jewelry {
    getName(): string;
    getPrice(): number;
}

class GoldFactory implements JewelryFactory {
    public createEarrings(weight: number, complexity: number): Jewelry {
        return new GoldEarrings(weight, complexity)
    }
    public createRing(weight: number, complexity: number): Jewelry {
        return new GoldRing(weight, complexity)
    }
    public createPendant(weight: number, complexity: number): Jewelry {
        return new GoldPendant(weight, complexity)
    }
    public createChain(weight: number, complexity: number): Jewelry {
        return new GoldChain(weight, complexity)
    }
    public createBracelet(weight: number, complexity: number): Jewelry {
        return new GoldBracelet(weight, complexity)
    }
}

