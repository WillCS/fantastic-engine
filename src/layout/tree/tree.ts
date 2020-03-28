export interface TreeViewItem {
    populate(): TreeViewItem[];
    decorate(): TreeItemStyling;
}

export interface TreeItemStyling {
    name: string;
}
