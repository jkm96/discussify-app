import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import styles from "./ThemeSwitcher.module.css";
import {MoonIcon, SunIcon} from "@nextui-org/shared-icons";
import {Switch} from "@nextui-org/react";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Switch
            defaultSelected
            size="sm"
            color="primary"
            onValueChange={() => setTheme(theme === "dark" ? "light" : "dark")}
            thumbIcon={({ isSelected, className }) =>
                isSelected ? (
                    <SunIcon className={className} />
                ) : (
                    <MoonIcon className={className} />
                )
            }
        >
        </Switch>
    );
}
