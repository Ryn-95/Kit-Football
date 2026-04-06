import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const matchesPath = path.join(process.cwd(), 'src', 'data', 'team-matches.json');
    
    if (fs.existsSync(matchesPath)) {
      const matchesData = JSON.parse(fs.readFileSync(matchesPath, 'utf-8'));
      return NextResponse.json(matchesData);
    } else {
      return NextResponse.json({ error: 'Team matches data not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error loading team matches:', error);
    return NextResponse.json({ error: 'Failed to load team matches' }, { status: 500 });
  }
}
