import { CheckCircle, Code, Github, Key, List, Lock, PenTool, Search, Settings, Trash2 } from 'lucide-react'

export default function Component() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Project Workflow</h1>
      
      <ol className="space-y-6">
        <li className="flex items-start">
          <Github className="w-6 h-6 mr-3 text-blue-500 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Planifier mes tâches sur Projet Github</h2>
            <p className="text-gray-600 mt-1">Utilisation de Github Projects pour organiser et suivre les tâches du projet.</p>
          </div>
        </li>

        <li className="flex items-start">
          <Settings className="w-6 h-6 mr-3 text-green-500 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Installation et configuration de l'environnement dans VS Code</h2>
            <p className="text-gray-600 mt-1">Installation du package Tailwind CSS en suivant les commandes officielles du site web.</p>
          </div>
        </li>

        <li className="flex items-start">
          <Github className="w-6 h-6 mr-3 text-purple-500 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Création Repo sur Github avec First push</h2>
            <p className="text-gray-600 mt-1">Création du dépôt et premier push contenant les packages.</p>
          </div>
        </li>

        <li className="flex items-start">
          <Lock className="w-6 h-6 mr-3 text-red-500 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Création .gitignore</h2>
            <p className="text-gray-600 mt-1">Pour cacher les packages et fichiers sensibles.</p>
          </div>
        </li>

        <li className="flex items-start">
          <Key className="w-6 h-6 mr-3 text-yellow-500 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Configurer SSH key dans Github</h2>
            <p className="text-gray-600 mt-1">Mise en place de l'authentification sécurisée.</p>
          </div>
        </li>

        <li className="flex items-start">
          <Lock className="w-6 h-6 mr-3 text-gray-500 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Cacher .gitignore</h2>
            <p className="text-gray-600 mt-1">S'assurer que .gitignore est bien ignoré.</p>
          </div>
        </li>

        <li className="flex items-start">
          <PenTool className="w-6 h-6 mr-3 text-indigo-500 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Intégration de l'interface</h2>
            <p className="text-gray-600 mt-1">Utilisation de HTML et Tailwind CSS pour créer l'interface utilisateur.</p>
          </div>
        </li>

        <li className="flex items-start">
          <Code className="w-6 h-6 mr-3 text-orange-500 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Interaction de la page avec l'utilisateur</h2>
            <p className="text-gray-600 mt-1">Implémentation des fonctionnalités JavaScript :</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
              <li className="flex items-center">
                <List className="w-4 h-4 mr-2 text-blue-400" />
                <span>Dragging : déplacer les tâches entre les colonnes</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                <span>Alert de suppression réussie</span>
              </li>
              <li className="flex items-center">
                <List className="w-4 h-4 mr-2 text-purple-400" />
                <span>Comptage des tâches par type (To do, In progress, Done)</span>
              </li>
              <li className="flex items-center">
                <Search className="w-4 h-4 mr-2 text-yellow-400" />
                <span>Recherche par titre de tâche</span>
              </li>
              <li className="flex items-center">
                <PenTool className="w-4 h-4 mr-2 text-red-400" />
                <span>Couleur spécifique pour chaque propriété</span>
              </li>
              <li className="flex items-center">
                <Trash2 className="w-4 h-4 mr-2 text-gray-400" />
                <span>Accès utilisateur pour modifier ou supprimer</span>
              </li>
            </ul>
          </div>
        </li>
      </ol>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Liens de déploiement</h2>
        <ul className="space-y-2">
          <li>
            <span className="font-semibold">Vercel :</span>{' '}
            <a href="https://to-do-list-three-eta-66.vercel.app" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              to-do-list-three-eta-66.vercel.app
            </a>
          </li>
          <li>
            <span className="font-semibold">Github :</span>{' '}
            <a href="https://oumaymabrd.github.io/To-Do-List/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              https://oumaymabrd.github.io/To-Do-List/
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
