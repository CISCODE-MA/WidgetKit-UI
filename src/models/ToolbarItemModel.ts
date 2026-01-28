import React from 'react';

export interface ToolbarItem {
    /** Whether to show/hide the item. Default is true. */
    visible?: boolean;
    /**
     * The position for this item: 'left' or 'right'.
     * If not specified, default to 'left'.
     */
    position?: 'left' | 'right';
    /** The React node to render. e.g. a search input, a button, etc. */
    node: React.ReactNode;
}