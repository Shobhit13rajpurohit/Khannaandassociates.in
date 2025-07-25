'use client';

import React, { useEffect, useState } from 'react';
import { use } from 'react';
import { TeamMember } from '../../../../../lib/db';
import { ImageUpload } from '../../../../../components/ImageUpload';
import { Button } from '../../../../../components/ui/button';
import { Input } from '../../../../../components/ui/input';
import { Label } from '../../../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../../components/ui/select';
import { Textarea } from '../../../../../components/ui/textarea';
import { useRouter } from 'next/navigation';

export default function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [image, setImage] = useState('');
  const [expertise, setExpertise] = useState('');
  const [slug, setSlug] = useState('');
  const [bio, setBio] = useState('');
  const [education, setEducation] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [office, setOffice] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive'>('inactive');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamMember = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/team/${id}`);
        const data: TeamMember = await res.json();
        if (res.ok) {
          setName(data.name);
          setPosition(data.position);
          setImage(data.image);
          setExpertise(data.expertise);
          setSlug(data.slug);
          setBio(data.bio);
          setEducation(data.education);
          setEmail(data.contact.email);
          setPhone(data.contact.phone);
          setOffice(data.office || '');
          setStatus(data.status);
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
  }, [id]);

  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newEducation = [...education];
    newEducation[index] = e.target.value;
    setEducation(newEducation);
  };

  const addEducationField = () => {
    setEducation([...education, '']);
  };

  const removeEducationField = (index: number) => {
    const newEducation = [...education];
    newEducation.splice(index, 1);
    setEducation(newEducation);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const updatedMember: Partial<TeamMember> = {
      name,
      position,
      image,
      expertise,
      slug,
      bio,
      education,
      contact: {
        email,
        phone,
      },
      office,
      status,
    };

    try {
      const res = await fetch(`/api/admin/team/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedMember),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess('Team member updated successfully');
      } else {
        setError(data.error || 'Failed to update team member');
      }
    } catch (err) {
      setError('Error updating team member');
      console.error('Error updating team member:', err);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this team member?')) return;

    try {
      const res = await fetch(`/api/admin/team/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setSuccess('Team member deleted successfully');
        router.push('/admin/team');
      } else {
        const data = await res.json();
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
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Team Member</h1>
      {success && <div className="mb-4 text-green-500">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="position">Position</Label>
          <Input id="position" value={position} onChange={(e) => setPosition(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="image">Image</Label>
          <ImageUpload value={image} onChange={url => setImage(url)} />
        </div>
        <div>
          <Label htmlFor="expertise">Expertise</Label>
          <Input id="expertise" value={expertise} onChange={(e) => setExpertise(e.target.value)} />
        </div>
        <div>
          <Label>Education</Label>
          {education.map((edu, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <Input value={edu} onChange={(e) => handleEducationChange(e, index)} />
              <Button type="button" onClick={() => removeEducationField(index)} variant="destructive">-</Button>
            </div>
          ))}
          <Button type="button" onClick={addEducationField}>+</Button>
        </div>
        <div>
          <Label htmlFor="office">Office</Label>
          <Input id="office" value={office} onChange={(e) => setOffice(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select onValueChange={(value: "active" | "inactive") => setStatus(value)} value={status}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex space-x-4">
          <Button type="submit">Save Changes</Button>
          <Button type="button" onClick={handleDelete} variant="destructive">Delete</Button>
        </div>
      </form>
    </div>
  );
}
