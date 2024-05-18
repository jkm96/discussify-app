import React from 'react';

const Alert = ({type, message}: { type: string, message: string }) => {
    let alertClasses = 'px-4 py-2 mt-2 rounded-sm dark:text-yellow-900 dark:bg-boxdark-mode ' +
        'text-center items-center border-t-1 dark:border-t-white border-b-1 dark:border-b-white border-b-yellow';
    let iconClasses = 'mr-2';

    switch (type) {
        case 'success':
            alertClasses += ' bg-green-200 text-green-800';
            iconClasses += ' fas fa-check-circle';
            break;
        case 'error':
            alertClasses += ' bg-red-200 text-red-800';
            iconClasses += ' fas fa-times-circle';
            break;
        case 'warning':
            alertClasses += 'bg-yellow-100 text-yellow-200';
            iconClasses += ' fas fa-exclamation-circle';
            break;
        default:
            alertClasses += ' bg-blue-200 text-blue-800';
            iconClasses += ' fas fa-info-circle';
    }

    return (
        <div className={alertClasses} role="alert">
            <span className={iconClasses}></span>
            <span className=''>{message}</span>
        </div>
    );
};

export default Alert;
