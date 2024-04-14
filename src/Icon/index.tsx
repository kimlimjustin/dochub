import React from "react";
export const AddIcon = ({ fillColor = "currentColor", size = 24 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        width={size}
        height={size}
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
    >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill={fillColor} />
    </svg>
);

export const CopyIcon = ({ fillColor = "currentColor", size = 24 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        className="iconify iconify--ic"
        width={size}
        height={size}
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
    >
        <path
            d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4l6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z"
            fill={fillColor}
        />
    </svg>
);

export const PasteIcon = ({ fillColor = "currentColor", size = 24 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        className="iconify iconify--ic"
        width={size}
        height={size}
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
    >
        <path
            d="M19 20H5V4h2v3h10V4h2m-7-2a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1m7 0h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"
            fill={fillColor}
        />
    </svg>
);

export const RenameIcon = ({ fillColor = "currentColor", size = 24 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        className="iconify iconify--ic"
        width={size}
        height={size}
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
    >
        <path
            d="M18 17h-7.5l2-2H18M6 17v-2.5l7.88-7.85c.19-.2.51-.2.71 0l1.76 1.76c.2.2.2.51 0 .71L8.47 17M19 3H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"
            fill={fillColor}
        />
    </svg>
);
export const CutIcon = ({ fillColor = "currentColor", size = 24 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        width={size}
        height={size}
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 512 512"
    >
        <path
            d="M103.48 224a71.64 71.64 0 0 0 44.76-15.66l41.5 16.89l6.82-12.63a39.15 39.15 0 0 1 4.32-6.37l14.22-14.42l-41.17-24.94A72 72 0 1 0 103.48 224zm0-112a40 40 0 1 1-40 40a40 40 0 0 1 40-40z"
            fill={fillColor}
        />
        <path
            d="M480 169l-5.52-12.58c-4.48-10.42-14.74-16-32.78-17.85c-10.12-1-26.95-1.24-49.69 3.81c-20 4.45-122.14 28.2-164.95 58.62c-20.25 14.39-24.06 33.67-27.06 49.16c-2.78 14.14-5 25.31-18 35c-15 11.14-27.27 16.38-33.58 18.6a71.74 71.74 0 1 0 24.79 38zm-224.52 87a16 16 0 1 1 16-16a16 16 0 0 1-16 16zm-152 144a40 40 0 1 1 40-40a40 40 0 0 1-40 40z"
            fill={fillColor}
        />
        <path
            d="M343.79 259.87l-83.74 48.18l27.63 13.08l3.62 1.74C310 331.92 359.74 356 410.53 359c3.89.23 7.47.34 10.78.34C442 359.31 453 354 459.75 350L480 336z"
            fill={fillColor}
        />
    </svg>
);
