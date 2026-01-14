export declare class Analytics {
    apiKey: string;
    endpoint: string;
    constructor(key: string, url: string);
    bootstrap(): void;
    track(event: string, props?: any): Promise<void>;
    flush(): Promise<void>;
}
