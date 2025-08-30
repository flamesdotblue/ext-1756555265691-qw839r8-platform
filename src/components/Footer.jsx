import { Github, Home } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Home className="w-4 h-4" />
          <span>Real Estate Commission App</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-gray-900">Privacy</a>
          <a href="#" className="hover:text-gray-900">Terms</a>
          <a href="https://github.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-gray-900">
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
