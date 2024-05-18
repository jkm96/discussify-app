'use client';

import Alert from "@/components/shared/notifications/Alert";
import {useAuth} from "@/hooks/useAuth";
import {useEffect, useState} from "react";

export default function NotificationBar(){
    const {user, loading} = useAuth();
    const [showNotification, setShowNotification] = useState(false);


    useEffect(() => {
        // Show the notification after a delay
        const delay = setTimeout(() => {
            if (user !== null && !loading && !user.isGracePeriodExpired && !user.isEmailVerified) {
                setShowNotification(true);
            }
        }, 5000); // 5000 milliseconds = 5 seconds

        // Clear the timeout when the component unmounts or user changes
        return () => clearTimeout(delay);
    }, [user, loading]);

    return (
        <>
            {showNotification && (
                <Alert type="warning" message={`Please verify your email address. You have ${user?.gracePeriodCount} days`} />
            )}
        </>
    )
}