import { NavLink } from 'react-router-dom';
import { ApiSpec } from '../types/api';

interface SidebarProps {
  apis: ApiSpec[];
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ apis, collapsed, onToggle }: SidebarProps) {
  const groupedApis = apis.reduce((acc, api) => {
    if (!acc[api.category]) {
      acc[api.category] = [];
    }
    acc[api.category].push(api);
    return acc;
  }, {} as Record<string, ApiSpec[]>);

  const categories = Object.keys(groupedApis).sort();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <aside
      className={`bg-gray-900 text-white h-full overflow-y-auto flex-shrink-0 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        {!collapsed && <h1 className="text-xl font-bold">API Docs</h1>}
        <button
          onClick={onToggle}
          className={`p-1.5 rounded-md hover:bg-gray-800 transition-colors ${
            collapsed ? 'mx-auto' : ''
          }`}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg
            className={`w-5 h-5 transition-transform ${collapsed ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        </button>
      </div>
      <nav className="p-2">
        {categories.map((category) => (
          <div key={category} className="mb-4">
            {!collapsed && (
              <h2 className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {category}
              </h2>
            )}
            <ul className="space-y-1">
              {groupedApis[category].map((api) => (
                <li key={api.id}>
                  <NavLink
                    to={`/docs/${api.id}`}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md text-sm transition-colors ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      } ${collapsed ? 'text-center' : ''}`
                    }
                    title={collapsed ? `${api.name} v${api.version}` : undefined}
                  >
                    {collapsed ? (
                      <div className="font-bold text-xs">{getInitials(api.name)}</div>
                    ) : (
                      <>
                        <div className="font-medium">{api.name}</div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          v{api.version} • {api.type.toUpperCase()}
                        </div>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
