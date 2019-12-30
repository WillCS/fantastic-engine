export abstract class AppContext {
    public shouldDisplayDetailView(): boolean {
        return true;
    }
}

export class DefaultContext extends AppContext {
    public static readonly DEFAULT_CONTEXT = new DefaultContext();

    private constructor() {
        super();
    }
}