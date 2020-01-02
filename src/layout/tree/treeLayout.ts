export interface TreeLayout {
    populate(parent: any): any[];
    decorate(treeObject: any): TreeItemStyling;
}

export interface TreeItemStyling {
    name: string;
}