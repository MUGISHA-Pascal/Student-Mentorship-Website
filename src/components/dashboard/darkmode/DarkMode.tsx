import Sun from '/svgs/Sun.svg'
import Moon from '/svgs/Moon.svg'
import "./DarkMode.css";

const DarkMode = () => {
    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
            />
            <label className='dark_mode_label' htmlFor='darkmode-toggle'>
                <img src={Sun} alt="Sun Icon" className="sun_icon w-5" />
                <img src={Moon} alt="Moon Icon" className="moon_icon w-5" />
            </label>
        </div>
    );
};

export default DarkMode;
