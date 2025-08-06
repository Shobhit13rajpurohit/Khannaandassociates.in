export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from 'next/server';
import { searchBlogPosts } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
  }

  try {
    const results = await searchBlogPosts(query);
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error searching blog posts:', error);
    return NextResponse.json({ error: 'Failed to search blog posts' }, { status: 500 });
  }
}
