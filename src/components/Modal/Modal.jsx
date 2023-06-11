import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./modal.module.css"

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, children }) {
    useEffect(() => {
        function handleKeyDown(e){
        if (e.code === 'Escape') {
                onClose();
            };
        };
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [onClose]);

    

    function handleBackdropClick(e){
        if (e.currentTarget === e.target) {
            onClose();
        };
    };

    return createPortal(<div className={css.overlay} onClick={handleBackdropClick}>
                     <div className={css.modal}>
                         {children}
                     </div>
                 </div>, modalRoot)
};

// export default class Modal extends Component{
//     state = {
        
//     };

//     componentDidMount() {
//         window.addEventListener('keydown', this.handleKeyDown)
//     };

//     componentWillUnmount() {
//         window.removeEventListener('keydown', this.handleKeyDown)
//     }

//     handleKeyDown = e => {
//         if (e.code === 'Escape') {
//                 this.props.onClose();
//             };
//     }

//     handleBackdropClick = e => {
//         if (e.currentTarget === e.target) {
//             this.props.onClose();
//         }
//     }

//     render() {
//         return createPortal(<div className={css.overlay} onClick={this.handleBackdropClick}>
//                     <div className={css.modal}>
//                         {this.props.children}
//                     </div>
//                 </div>, modalRoot)
//     };
// };