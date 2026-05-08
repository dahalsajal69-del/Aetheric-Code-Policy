import { Link } from "react-router-dom";
import { ArrowRight, Plus, Edit2, Trash2, Smartphone } from "lucide-react";
import { developerName } from "../data/apps";
import { usePolicies } from "../hooks/usePolicies";
import { useAuth } from "../hooks/useAuth";

export function Home() {
  const { policies, loading: policiesLoading, deletePolicy } = usePolicies();
  const { isAdmin, loading: authLoading } = useAuth();

  if (policiesLoading || authLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-gray-500 font-medium">Loading policies...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-serif text-gray-900 font-bold tracking-tight mb-4">
            Privacy Policies
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            We believe in transparency and data protection. Below you can find the privacy policies for all active mobile applications published by {developerName}.
          </p>
        </div>
        {isAdmin && (
          <Link
            to="/policy/new"
            className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors shrink-0"
          >
            <Plus size={18} />
            Add App Policy
          </Link>
        )}
      </div>

      {policies.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-200 border-dashed">
          <Smartphone size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No policies yet</h3>
          <p className="text-gray-500">Get started by creating your first app privacy policy.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {policies.map((app) => (
            <div 
              key={app.id} 
              className="group block bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 hover:shadow-lg hover:border-gray-300 transition-all duration-200 relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="bg-gray-50 text-gray-700 p-3 rounded-xl group-hover:bg-gray-900 group-hover:text-white transition-colors duration-200">
                  <Smartphone size={24} />
                </div>
                
                {isAdmin && (
                  <div className="flex items-center gap-2">
                    <Link 
                      to={`/policy/edit/${app.id}`}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors z-10 relative"
                      title="Edit Policy"
                    >
                      <Edit2 size={18} />
                    </Link>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        if (window.confirm('Are you sure you want to delete this policy?')) {
                          deletePolicy(app.id);
                        }
                      }}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors z-10 relative"
                      title="Delete Policy"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </div>
              <Link to={`/policy/${app.id}`} className="block">
                <h2 className="text-xl font-semibold text-gray-900 mb-2 font-serif group-hover:text-blue-600 transition-colors">
                  {app.name}
                </h2>
                <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mt-6">
                  Updated: {app.lastUpdated}
                </div>
                
                <div className="absolute bottom-6 right-8 text-gray-300 group-hover:text-gray-900 transition-colors">
                  <ArrowRight size={20} />
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-16 bg-blue-50/50 rounded-2xl p-8 border border-blue-100">
        <h3 className="text-lg font-serif font-semibold text-gray-900 mb-3">
          For Play Store Reviewers
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          The policies linked above represent the definitive privacy terms for each application published by {developerName} on the Google Play Store. These URLs are maintained and updated regularly in accordance with Play Store developer policies.
        </p>
      </div>
    </div>
  );
}
