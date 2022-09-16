export interface GameParms {
    id: string,
    title: string,
    bannrUrl: string
}

export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            home: undefined;
            game: GameParms;
        }
    }
}