import { motion } from 'framer-motion';

const Partners = () => {
    const partnerLogos = [
        '/images/rapid.jpg',
        '/images/gorillae.png',
        '/images/rapid.jpg',
        '/images/gorillae.png',
        '/images/rapid.jpg',
        '/images/gorillae.png',
        '/images/rapid.jpg',
        '/images/gorillae.png',
        '/images/rapid.jpg',
        '/images/gorillae.png',
        '/images/rapid.jpg',
        '/images/gorillae.png',
        '/images/rapid.jpg',
        '/images/gorillae.png',
        '/images/rapid.jpg',
        '/images/gorillae.png',
        '/images/rapid.jpg',
        '/images/gorillae.png',
        '/images/rapid.jpg',
        '/images/gorillae.png',
        '/images/rapid.jpg',
    ];

    return (
        <div className='py-10 mt-3 overflow-hidden'>
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
