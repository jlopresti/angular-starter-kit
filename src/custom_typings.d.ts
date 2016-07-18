// allow tsc to not throw errors when including require for html and others with webpack
declare var require: {
    <T>(path: string): T
    (paths: string[], callback: (...modules: any[]) => void): void
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void
}

// allow tsc to not throw errors for tests when referencing window.module
interface Window {
    module?: any
}


