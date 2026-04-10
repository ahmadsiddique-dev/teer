import { useSearchParams } from "react-router-dom";
import {
  createContext,
  type ReactNode,
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { Theme } from "@/lib/themes";

const COOKIE_NAME = "active_theme";
const DEFAULT_THEME = Theme.Default;

function setThemeCookie(theme: Theme) {
  if (typeof window === "undefined") {
    return;
  }
  
  document.cookie = `${COOKIE_NAME}=${theme}; path=/; max-age=31536000; SameSite=Lax; ${
    window.location.protocol === "https:" ? "Secure;" : ""
  }`;
}

interface ThemeContextType {
  activeTheme: Theme;
  setActiveTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ActiveThemeProvider({
  children,
  initialTheme,
}: {
  children: ReactNode;
  initialTheme?: Theme;
}) {
  // const { pathname } = useLocation();

  const [activeTheme, setActiveTheme] = useState<Theme>(
    () => initialTheme || DEFAULT_THEME
  );

  // useEffect(() => {
  //   queueMicrotask(() => {
  //     setActiveTheme(DEFAULT_THEME);
  //   });
  // }, [pathname]);

  useEffect(() => {
    setThemeCookie(activeTheme);

    const targets = [document.body, document.documentElement];

    for (const el of targets) {
      const themeClasses = Array.from(el.classList).filter((className) =>
        className.startsWith("theme-")
      );
      for (const className of themeClasses) {
        el.classList.remove(className);
      }
      el.classList.add(`theme-${activeTheme}`);
    }
  }, [activeTheme]);

  return (
    <ThemeContext.Provider value={{ activeTheme, setActiveTheme }}>
      <Suspense>
        <ActiveThemeUrlSync />
      </Suspense>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeConfig() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      "useThemeConfig must be used within an ActiveThemeProvider"
    );
  }
  return context;
}

export const useUrlTheme = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawTheme = searchParams.get("theme");
  const theme = Object.values(Theme).includes(rawTheme as Theme) ? (rawTheme as Theme) : null;
  
  const setUrlTheme = (newTheme: Theme | null) => {
    if (newTheme) {
      searchParams.set("theme", newTheme);
    } else {
      searchParams.delete("theme");
    }
    setSearchParams(searchParams);
  };
  
  return [theme, setUrlTheme] as const;
};

export function ActiveThemeUrlSync() {
  const [urlTheme] = useUrlTheme();
  const synced = useRef(false);
  const { activeTheme, setActiveTheme } = useThemeConfig();

  useEffect(() => {
    if (synced.current || !urlTheme) {
      return;
    }
    if (urlTheme !== activeTheme) {
      queueMicrotask(() => {
        setActiveTheme(urlTheme);
      });
    }

    synced.current = true;
  }, [urlTheme, activeTheme, setActiveTheme]);

  return null;
}
