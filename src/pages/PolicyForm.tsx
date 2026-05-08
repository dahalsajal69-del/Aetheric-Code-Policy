import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { usePolicies } from '../hooks/usePolicies';
import { useAuth } from '../hooks/useAuth';

export function PolicyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { policies, loading, addPolicy, editPolicy } = usePolicies();
  const { isAdmin, loading: authLoading } = useAuth();
  
  const [name, setName] = useState('');
  const [policyContent, setPolicyContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id && !loading) {
      const existingPolicy = policies.find(p => p.id === id);
      if (existingPolicy) {
        setName(existingPolicy.name);
        setPolicyContent(existingPolicy.policyContent);
      }
    }
  }, [id, policies, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !policyContent.trim()) return;

    setSubmitting(true);
    try {
      if (id) {
        await editPolicy(id, { name, policyContent });
      } else {
        await addPolicy({ name, policyContent });
      }
      navigate('/');
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  if (authLoading || (loading && id)) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-gray-500 font-medium">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
        <div className="text-2xl font-serif text-gray-900 font-bold">Access Denied</div>
        <p className="text-gray-600">You must be logged in as an administrator to access this page.</p>
        <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-12 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </Link>

      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm p-8 sm:p-10">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-8">
          {id ? 'Edit Policy' : 'Create New App Policy'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Application Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
              placeholder="e.g. Zenith Connect"
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Privacy Policy Configuration (Markdown)
            </label>
            <textarea
              id="content"
              value={policyContent}
              onChange={(e) => setPolicyContent(e.target.value)}
              rows={16}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all font-mono text-sm"
              placeholder="## Privacy Policy..."
              required
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              {submitting ? 'Saving...' : id ? 'Save Changes' : 'Create Policy'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
