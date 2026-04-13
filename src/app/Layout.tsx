import { NavLink, Outlet } from 'react-router-dom';

import { useTheme } from '@/hooks/useTheme';

export function Layout() {
  const { theme, toggle } = useTheme();

  return (
    <div className="appLayout">
      <header className="appHeaderBar">
        <nav className="appNav">
          <NavLink className="appBrand" to="/">
            Eye Training
          </NavLink>
          <div className="appNavRight">
            <NavLink className="appNavLink" to="/exercises">
              Exercises
            </NavLink>
            <button
              className="button buttonSmall"
              type="button"
              onClick={toggle}
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </div>
        </nav>
      </header>

      <Outlet />
    </div>
  );
}
