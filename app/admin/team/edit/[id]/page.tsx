'use client';

import React, { useEffect, useState } from 'react';
import { use } from 'react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
}

export default function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params with React.use
  const { id } = use(params);

  const [teamMember, setTeamMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState<Partial<TeamMember>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch team member data (fix for line 61 error)
  useEffect(() => {
    const fetchTeamMember = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/team/${id}`);
        const data = await res.json();
        if (res.ok) {
          setTeamMember(data);
          setFormData(data);
        } else {
          setError(data.error || 'Failed to fetch team member');
        }
      } catch (err) {
        setError('Error fetching team member');
        console.error('Error fetching team member:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMember();
  }, [id]); // Use unwrapped id instead of params.id

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission (fix for line 82 error)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(`/api/admin/team/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess('Team member updated successfully');
        setTeamMember(data);
      } else {
        setError(data.error || 'Failed to update team member');
      }
    } catch (err) {
      setError('Error updating team member');
      console.error('Error updating team member:', err);
    }
  };

  // Handle delete action
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this team member?')) return;

    try {
      const res = await fetch(`/api/admin/team/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess('Team member deleted successfully');
        // Optionally redirect to team list page
        // window.location.href = '/admin/team';
      } else {
        setError(data.error || 'Failed to delete team member');
      }
    } catch (err) {
      setError('Error deleting team member');
      console.error('Error deleting team member:', err);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Team Member</h1>
      {success && <div className="mb-4 text-green-500">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role || ''}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}