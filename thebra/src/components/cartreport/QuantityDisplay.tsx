import React, { useEffect, useState } from 'react';

interface QuantityDisplayProps {
    initialQuantity: number;
}

const QuantityDisplay: React.FC<QuantityDisplayProps> = ({ initialQuantity }) => {
    const [quantity, setQuantity] = useState(initialQuantity);
    useEffect(() => {
        // window.location.reload()
    }, [])
    return (
        <span>
            {quantity}
        </span>
    );
};

export default QuantityDisplay;
