import { NextRequest, NextResponse } from 'next/server';
import { deleteImageFromDrive } from '@/utils/google-drive';

export async function POST(request: NextRequest) {
  try {
    const { fileUrl } = await request.json();
    
    if (!fileUrl) {
      return NextResponse.json({ error: 'No file URL provided' }, { status: 400 });
    }

    await deleteImageFromDrive(fileUrl);
    return NextResponse.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}