class ApplicationState {
    static #instance: ApplicationState;

    public LoginId: string;
    public MaxSize: number;

    private constructor() {
        this.LoginId = "";
        this.MaxSize = 100
    }

    public static get instance(): ApplicationState {
        if (!ApplicationState.#instance) {
            ApplicationState.#instance = new ApplicationState();
        }

        return ApplicationState.#instance;
    }
}
function clientCode(): void {
    const state1 = ApplicationState.instance;

    state1.LoginId = "user123";
    state1.MaxSize = 500;

    const state2 = ApplicationState.instance;

    console.log("LoginId:", state2.LoginId);
    console.log("MaxSize:", state2.MaxSize);

    if (state1 === state2) {
        console.log(
            "Singleton works, both variables contain the same instance."
        );
    } else {
        console.log(
            "Singleton failed, variables contain different instances."
        );
    }
}

clientCode();
