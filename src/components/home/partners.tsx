import { motion } from 'framer-motion';

const Partners = () => {
    const partnerLogos = [
        '/images/rapid.jpg',
        '/images/gorillae.png',
        '/images/sandtech.png',
        '/images/rapid.jpg',
        '/images/gorillae.png',
        '/images/sandtech.png',
        '/images/rapid.jpg',
        '/images/gorillae.png',
        '/images/sandtech.png',
        '/images/rapid.jpg',
        '/images/gorillae.png',
        '/images/sandtech.png',
        '/images/rapid.jpg',
        '/images/gorillae.png',
        '/images/sandtech.png',
        '/images/rapid.jpg',
        '/images/gorillae.png',
        '/images/sandtech.png',
        '/images/rapid.jpg',
        '/images/gorillae.png',
        '/images/sandtech.png',
        '/images/rapid.jpg',
        '/images/gorillae.png',
        '/images/sandtech.png',
        '/images/rapid.jpg',
        '/images/gorillae.png',
        '/images/sandtech.png',
        '/images/rapid.jpg',
        '/images/gorillae.png',
        '/images/sandtech.png',
        '/images/rapid.jpg',
    ];

    return (
        <div className='flex flex-col items-center bg-[#1782CF] mt-3 overflow-hidden'>
            <div className='flex gap-x-5 text-white items-center p-2'>
                <p>In Partnership with more than </p>
                <p className='font-bold text-4xl'>100+</p>
            </div>
            <motion.div
                className='flex'
                animate={{ x: '-100%' }}
                transition={{ 
                    repeat: Infinity,
                    duration: 10,
                    ease: 'linear'
                }}
            >
                {partnerLogos.map((logo, index) => (
                    <img
                        key={index}
                        src={logo}
                        alt={`Partner ${index + 1}`}
                        className='w-32 h-auto mx-4'
                    />
                ))}
                {partnerLogos.map((logo, index) => (
                    <img
                        key={`duplicate-${index}`}
                        src={logo}
                        alt={`Partner ${index + 1}`}
                        className='w-32 h-auto mx-4'
                    />
                ))}
            </motion.div>
        </div>
    );
}

export default Partners;
