import { useState, useEffect } from 'react';

interface NumberAnimationProps {
    targetNumber: number;
    initialSpeed: number;
    slowDownFactor: number;
}
const NumberAnimation: React.FC<NumberAnimationProps> = ({ targetNumber, initialSpeed, slowDownFactor }) => {
    const [currentNumber, setCurrentNumber] = useState(0);
    const [speed, setSpeed] = useState(initialSpeed);

    useEffect(() => {
        if (currentNumber < targetNumber) {
            const interval = setInterval(() => {
                const increment = Math.ceil(Math.random() * 10);
                const nextNumber = Math.min(currentNumber + increment, targetNumber);
                if (nextNumber >= targetNumber - 20) {
                    setSpeed(speed * slowDownFactor);
                }

                setCurrentNumber(nextNumber);
            }, speed);

            return () => clearInterval(interval);
        }
    }, [currentNumber, targetNumber, speed, slowDownFactor]);

    return <>{currentNumber}</>;
};

export default NumberAnimation;
