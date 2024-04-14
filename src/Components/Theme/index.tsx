import React, { useContext, PropsWithChildren, HTMLAttributes } from "react";
import * as themeJson from "./theme.json";
export const ThemeContext = React.createContext({ theme: "light" });

const ALLOWED_STYLE_PROPERTIES = [
    "background",
    "color",
    "font",
    "border",
    "text",
    "cursor",
    "outline",
    "box-shadow",
    "--scrollbar",
    "--tabs-scrollbar",
    "--preview-object",
    "--selected-grid",
];

function applyStyles(theme: any, componentName: string) {
    const styles = {};
    //@ts-ignore
    for (const key in themeJson[theme]) {
        const [component, property] = key.split(".");
        if (component === componentName && ALLOWED_STYLE_PROPERTIES.includes(property)) {
            //@ts-ignore
            styles[property] = themeJson[theme][key];
        }
    }

    return styles;
}

type ThemedSpanProps = {
    componentName: string;
} & HTMLAttributes<HTMLSpanElement>;

type ThemedDivProps = {
    componentName: string;
} & HTMLAttributes<HTMLDivElement>;

type ThemedButtonProps = {
    componentName: string;
} & HTMLAttributes<HTMLButtonElement>;

type ThemedInputProps = {
    componentName: string;
} & HTMLAttributes<HTMLInputElement>;

export const ThemedDiv = ({ componentName, children, ...rest }: PropsWithChildren<ThemedDivProps>) => {
    const { theme } = useContext(ThemeContext);
    const styles = applyStyles(theme, componentName);

    return (
        <div style={styles} {...rest}>
            {children}
        </div>
    );
};
export const ThemedSpan = ({ componentName, children, ...rest }: PropsWithChildren<ThemedSpanProps>) => {
    const { theme } = useContext(ThemeContext);
    const styles = applyStyles(theme, componentName);

    return (
        <span style={styles} {...rest}>
            {children}
        </span>
    );
};

export const ThemedButton = ({ componentName, children, ...rest }: PropsWithChildren<ThemedButtonProps>) => {
    const { theme } = useContext(ThemeContext);
    const styles = applyStyles(theme, componentName);

    return (
        <button style={styles} {...rest} role="button">
            {children}
        </button>
    );
};

export const ThemedInput = ({ componentName, children, ...rest }: PropsWithChildren<ThemedInputProps>) => {
    const { theme } = useContext(ThemeContext);
    const styles = applyStyles(theme, componentName);

    return <input style={styles} {...rest} />;
};
