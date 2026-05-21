export interface NavigationItem {
    id: string;
    titleKeyTranslate: string;
    titleDefault: string;
    type: 'item' | 'collapsable';
    translate?: string;
    icon?: string;
    url?: string;
    ishr?: boolean;
    ismdi?: boolean;
    param?: any,
    permission?: string[];
    children?: NavigationItem[];
}

export interface NtsNavigation extends NavigationItem {
    permission?: string[];
    children?: NavigationItem[];
}
