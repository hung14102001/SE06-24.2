import React from "react"
import '../styles/popup.css'

function Popup(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <a className="nav-mobile-menu-close close-btn" onClick={() => props.setTrigger(false)}>
                    <svg width="32" height="32" className="" viewBox="0 0 32 32">
                        <circle opacity=".07" cx="16" cy="16" r="16" fill="#F9F9F9">
                        </circle>
                        <path d="M12.007 11.973l8.132 8.132m-8.146-.012l8.131-8.132"
                            stroke="#C7C7C7" strokeWidth="2"></path>
                    </svg>
                </a>
                { props.children }
            </div>
        </div>
    ) : ""
}

export default Popup