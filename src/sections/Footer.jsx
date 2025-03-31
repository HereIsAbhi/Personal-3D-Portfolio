// import React from 'react';

const Footer=()=>{
    return(
    <footer className="c-space pt-7 pb-3 border-t border-black-200 flex justify-between items-center flex-wrap gap-5">
        <div className="text-white-600 text-sm">
            <p>&copy; 2024 All rights reserved</p>
            <p>Designed by <span className="text-white">Abhinav</span></p>
        </div>
        <div className="flex gap-3">
            <div className="social-icon">
                <img src="assets/github.svg" alt="" className="w-1/2 h-1/2"/>
            </div>
            <div className="social-icon">
                <img src="assets/twitter.svg" alt="" className="w-1/2 h-1/2"/>
            </div>
            <div className="social-icon">
                <img src="assets/instagram.svg" alt="" className="w-1/2 h-1/2"/>
            </div>
        </div>
    </footer>
    )
}

export default Footer;