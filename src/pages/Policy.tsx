import { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import Markdown from "react-markdown";
import { ArrowLeft, FileText, Calendar, Smartphone, Share2, Check } from "lucide-react";
import { usePolicies } from "../hooks/usePolicies";

export function Policy() {
  const { appId } = useParams();
  const { policies, loading } = usePolicies();
  const [copied, setCopied] = useState(false);
  
  const app = policies.find((a) => a.id === appId);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-gray-500 font-medium">Loading policy...</div>
      </div>
    );
  }

  if (!app) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-12 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Apps
      </Link>

      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="bg-gray-50 border-b border-gray-200 p-8 sm:p-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm text-gray-700">
              <Smartphone size={28} />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
                {app.name}
              </h1>
            </div>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
              title="Copy policy link"
            >
              {copied ? <Check size={16} className="text-green-600" /> : <Share2 size={16} />}
              <span className="hidden sm:inline">{copied ? "Copied!" : "Share Link"}</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-500">
            <div className="flex items-center gap-1.5">
              <FileText size={16} />
              <span>Privacy Policy</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={16} />
              <span>Last Updated: {app.lastUpdated}</span>
            </div>
          </div>
        </div>
        
        <div className="p-8 sm:p-10 sm:py-12">
          <div className="markdown-body max-w-none">
            <Markdown>{app.policyContent}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
}
