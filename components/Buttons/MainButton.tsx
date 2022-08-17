import React from 'react';

interface MainBtnProps {
    txt: string,
    width?: number,
    bold?: boolean
}

const MainBtn: React.FC<MainBtnProps> = ({txt, width, bold = false}) => {
    return (
        <button
            className="btn-eletron main"
            style={{width: width ? width : 'auto'}}
        >
            {bold ? <strong>{txt}</strong> : txt}
        </button>
    );
};

export default MainBtn;