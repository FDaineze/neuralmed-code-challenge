import React from 'react';

const LoadingScreen: React.FC = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-950 bg-opacity-80 z-50">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 120 120"
                className="w-24 h-24"
            >
                <path id="avengers1" className="path-animation" d="M36.4,112.8c7.1,3.6,15.1,5.7,23.6,5.7c28.5,0,51.6-23.1,51.6-51.6c0-18-9.2-33.9-23.2-43.1l0,10c9.3,8,15.2,19.8,15.2,33.1c0,24.1-19.5,43.6-43.6,43.6c-7.4,0-14.3-1.8-20.4-5L36.4,112.8z" />
                <path id="avengers3" className="path-animation" d="M84,1L84,72L69.5,58.3L69.5,27.8L51.9,69.6L69.5,69.6L69.5,63L85.7,78.3L69,91.1L69,84.6L45.6,84.6L30.3,119L11.3,119L68.4,1" />
                <path id="avengers2" className="path-animation" d="M22.3,88.8c-3.7-6.4-5.8-13.9-5.8-21.8c0-21.9,16.1-40,37.1-43.1l4.1-8.4C30.2,16.7,8.4,39.3,8.4,67c0,11.3,3.6,21.7,9.8,30.2L22.3,88.8z" />
                <path id="iron1" className="path-animation" d="M73.9,103.2H46.1l-5.3,5.8l-8.3-3.7c-1.1,4.3-2.2,8.5-2.3,8.7c-0.1,0.4,0.1,2.2,3.2,4.2c3.1,2.1,5,2.7,9.2-0.3c4.2-3.1,6-3.5,8.3-3.5c2.3,0,4.2,0,4.2,0l0.9-2h7.7l1,2c0,0,1.9,0,4.2,0s4,0.4,8.2,3.5c4.2,3.1,6.2,2.4,9.2,0.3c3.1-2,3.3-3.8,3.2-4.2c0-0.2-1.1-4.5-2.3-8.7l-8.3,3.7L73.9,103.2z" />
                <path id="iron2" className="path-animation" d="M103.2,62.3l-3.5-15.4l0.5-32.9c0,0-0.5-1.1-6.3-5.7C88,3.7,79.1,0,79.1,0l-6.6,20.3H47.5L40.9,0c0,0-8.9,3.7-14.8,8.3S19.9,14,19.9,14l0.5,32.9l-3.5,15.4c0,0-1.1,6.6,2.3,11.1c3.4,4.5,14,17.1,14.3,22c0.3,4.9,0.2,6.5,0.2,6.5l6.7,2.7l4.7-5h12.3h5.6h12.3l4.7,5l6.7-2.7c0,0-0.2-1.5,0.2-6.5c0.3-4.9,10.9-17.5,14.3-22C104.3,68.9,103.2,62.3,103.2,62.3z M47.1,58.9c0,0-7.6,2.3-13.7,1.9c-6.2-0.5-10.3-2.7-10-4c0.2-1.4,2.4-7.3,2.4-7.3l21.3,6.7L47.1,58.9z M86.6,60.8c-6,0.5-13.7-1.9-13.7-1.9l0-2.8l21.3-6.7c0,0,2.2,5.9,2.4,7.3C96.8,58.1,92.7,60.3,86.6,60.8z" />
                <path id="iron3" className="path-animation" d="M103.2,62.3l-3.5-15.4l0.5-32.9c0,0-0.5-1.1-6.3-5.7C88,3.7,79.1,0,79.1,0l-6.6,20.3H47.5L40.9,0c0,0-8.9,3.7-14.8,8.3S19.9,14,19.9,14l0.5,32.9l-3.5,15.4c0,0-1.1,6.6,2.3,11.1c3.4,4.5,14,17.1,14.3,22c0.3,4.9,0.2,6.5,0.2,6.5l6.7,2.7l4.7-5h12.3h5.6h12.3l4.7,5l6.7-2.7c0,0-0.2-1.5,0.2-6.5c0.3-4.9,10.9-17.5,14.3-22C104.3,68.9,103.2,62.3,103.2,62.3z M47.1,58.9c0,0-7.6,2.3-13.7,1.9c-6.2-0.5-10.3-2.7-10-4c0.2-1.4,2.4-7.3,2.4-7.3l21.3,6.7L47.1,58.9z M86.6,60.8c-6,0.5-13.7-1.9-13.7-1.9l0-2.8l21.3-6.7c0,0,2.2,5.9,2.4,7.3C96.8,58.1,92.7,60.3,86.6,60.8z" />
                <path id="america1" className="path-animation" d="M60,0C26.9,0,0,26.9,0,60s26.9,60,60,60s60-26.9,60-60S93.1,0,60,0z M60,113.1C30.7,113.1,6.9,89.3,6.9,60C6.9,30.7,30.7,6.9,60,6.9s53.1,23.8,53.1,53.1C113.1,89.3,89.3,113.1,60,113.1z" />
                <path id="america2" className="path-animation" d="M60,15.6c-24.5,0-44.4,19.9-44.4,44.4c0,24.5,19.9,44.4,44.4,44.4s44.4-19.9,44.4-44.4C104.4,35.5,84.5,15.6,60,15.6z M60,97.5c-20.7,0-37.5-16.8-37.5-37.5S39.3,22.5,60,22.5S97.5,39.3,97.5,60S80.7,97.5,60,97.5z" />
                <path id="america3" className="path-animation" d="M60,22.9l8.4,25.8l27.1,0L73.6,64.6l8.4,25.8L60,74.4L38.1,90.4l8.4-25.8L24.5,48.7l27.1,0L60,22.9z" />
            </svg>
            <style jsx>{`
                .path-animation {
                    stroke: #fff;
                    stroke-width: 2;
                    fill: none;
                    stroke-dasharray: 1000;
                    stroke-dashoffset: 1000;
                    animation: draw 6s infinite;
                }

                .path-animation:nth-child(1) { animation-delay: 0s; }
                .path-animation:nth-child(2) { animation-delay: 0s; }
                .path-animation:nth-child(3) { animation-delay: 0s; }

                .path-animation:nth-child(4) { animation-delay: 2s; }
                .path-animation:nth-child(5) { animation-delay: 2s; }
                .path-animation:nth-child(6) { animation-delay: 2s; }

                .path-animation:nth-child(7) { animation-delay: 4s; }
                .path-animation:nth-child(8) { animation-delay: 4s; }
                .path-animation:nth-child(9) { animation-delay: 4s; }

                @keyframes draw {
                    0%, 30% { stroke-dashoffset: 1000; }
                    18%, 20% { stroke-dashoffset: 0; }
                }

                svg {
                    width: 100px;
                    height: 100px;
                }
            `}</style>
        </div>
    );
};

export default LoadingScreen;
