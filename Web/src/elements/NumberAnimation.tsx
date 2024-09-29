'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedStatItem = ({ label, value }: { label: string; value: number }) => {
    const [animatedValue, setAnimatedValue] = useState(0);

    useEffect(() => {
        const targetValue = value;
        const duration = 1000; // Duration of the animation in ms
        const stepTime = Math.abs(Math.floor(duration / targetValue));
        let currentValue = 0;

        const animation = setInterval(() => {
            currentValue += 100;
            if (currentValue > targetValue) {
                currentValue = targetValue;
                clearInterval(animation);
            }
            setAnimatedValue(currentValue);
        }, stepTime);

        return () => clearInterval(animation);
    }, [value]);

    return (
        <div className='mx-auto flex max-w-xs flex-col gap-y-4'>
            <dt className='text-base leading-7'>{label}</dt>
            <motion.dd
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='order-first text-3xl font-semibold tracking-tight sm:text-5xl'
            >
                {animatedValue.toLocaleString()} {/* Adds commas for readability */}
            </motion.dd>
        </div>
    );
};

const AnimatedTwitterCount = ({ count, label }: { count: number; label: string }) => {
    const [viewCount, setViewCount] = useState(0);

    useEffect(() => {
        const animation = setInterval(() => {
            setViewCount((prevCount) => {
                const increment = Math.ceil((count - prevCount) / 10);
                return prevCount + increment > count ? count : prevCount + increment;
            });
        }, 50);

        return () => clearInterval(animation);
    }, [count]);

    return (
        <div className='flex items-center space-x-2'>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className='text-xl font-semibold'
            >
                {viewCount}
            </motion.div>
            <span className='text-sm text-muted-foreground'>{label}</span>
        </div>
    );
};

export { AnimatedStatItem, AnimatedTwitterCount };
