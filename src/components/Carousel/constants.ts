export type Indicators = {
    show: boolean;
    styling: {
        container: string;
        indicator: string;
    };
};
export type Controls = {
    show: boolean;
    styling: {
        container: string;
        icon: string;
    };
};
export type Item = {
    route: string;
    alt: string;
    styling: string
    
};

export type Styling = {
    container: string;
    wrapper: string;
    item: string;
}