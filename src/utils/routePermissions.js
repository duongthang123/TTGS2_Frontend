const routeRules = [
    { path: "/dashboard", permissions: [] },

    { path: "/dashboard/positions", permissions: ["show-position"] },
    { path: "/dashboard/positions/create", permissions: ["create-position"] },
    { path: "/dashboard/positions/:id/edit", permissions: ["update-position"] },

    { path: "/dashboard/ranks", permissions: ["show-rank"] },
    { path: "/dashboard/ranks/create", permissions: ["create-rank"] },
    { path: "/dashboard/ranks/:id/edit", permissions: ["update-rank"] },

    { path: "/dashboard/units", permissions: ["show-unit"] },
    { path: "/dashboard/units/create", permissions: ["create-unit"] },
    { path: "/dashboard/units/:id/edit", permissions: ["update-unit"] },

    { path: "/dashboard/users", permissions: ["show-user"] },
    { path: "/dashboard/users/create", permissions: ["create-user"] },
    { path: "/dashboard/users/:id/edit", permissions: ["update-user"] },
    { path: "/dashboard/users/:id/show", permissions: ["show-user"] },

    { path: "/dashboard/roles", permissions: ["show-role"] },
    { path: "/dashboard/roles/create", permissions: ["create-role"] },
    { path: "/dashboard/roles/:id/edit", permissions: ["update-role"] },
];

function matchesRoute(pattern, pathname) {
    const patternParts = pattern.split("/").filter(Boolean);
    const pathParts = pathname.split("/").filter(Boolean);

    return patternParts.length === pathParts.length &&
        patternParts.every((part, index) =>
            part.startsWith(":") || part === pathParts[index]
        );
}

export function getRequiredPermissions(pathname) {
    const normalizedPath = pathname.replace(/\/+$/, "") || "/";
    const rule = routeRules.find(({path}) =>
        matchesRoute(path, normalizedPath)
    );

    return rule?.permissions ?? null;
}
