import React from 'react'
import useSkrapePayment from "./useSkrapePayment"

export default function SkrapeButton(config) {
    const handleSkrapePayment = useSkrapePayment(config);
    
    // Button Styles
    let buttonStyles = {
        border: 'none', background: '#beed4f',
        color: '#000000', borderRadius: '6px',
        margin: '1rem', cursor: 'pointer'
    }
    let smallButtonStyles = {
        ...buttonStyles,
        padding: '8px 16px', fontWeight: 500
    }
    let mediumButtonStyles = {
        ...buttonStyles,
        padding: '16px 24px', fontWeight: 600
    }
    let largeButtonStyles = {
        ...buttonStyles,
        padding: '22px 32px', fontWeight: 600
    }

    // Select Button size from params or default
    const selectActiveButtonSize = () => {
        if (config.btnSize) {
            if (config.btnSize == 'small') return smallButtonStyles;
            if (config.btnSize == 'medium') return mediumButtonStyles;
            if (config.btnSize == 'large') return largeButtonStyles;
        } else {
            return mediumButtonStyles;
        }
    }

    return (
        <>
            <button onClick={ () => handleSkrapePayment() } style={selectActiveButtonSize()}>{config.text}</button>
        </>
    )
}