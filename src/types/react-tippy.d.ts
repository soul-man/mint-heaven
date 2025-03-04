declare module 'react-tippy' {
  import * as React from 'react';

  export interface TooltipProps {
    title?: string;
    html?: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    trigger?: 'mouseenter' | 'focus' | 'click' | 'manual';
    tabIndex?: number;
    disabled?: boolean;
    hideOnClick?: boolean;
    interactive?: boolean;
    interactiveBorder?: number;
    delay?: number;
    hideDelay?: number;
    animation?: string;
    arrow?: boolean;
    arrowSize?: string;
    animateFill?: boolean;
    duration?: number;
    distance?: number;
    offset?: number;
    hideOnClick?: boolean;
    multiple?: boolean;
    followCursor?: boolean;
    inertia?: boolean;
    transitionFlip?: boolean;
    popperOptions?: object;
    size?: 'small' | 'regular' | 'big';
    unmountHTMLWhenHide?: boolean;
    sticky?: boolean;
    stickyDuration?: number;
    touchHold?: boolean;
    onShow?: () => void;
    onHide?: () => void;
    open?: boolean;
    useContext?: boolean;
    onRequestClose?: () => void;
    tag?: string;
    theme?: 'dark' | 'light' | 'transparent';
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }

  export class Tooltip extends React.Component<TooltipProps> { }
} 