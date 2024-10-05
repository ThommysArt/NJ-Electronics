// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { uploadImageToDrive } from '@/utils/google-drive';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const directory = formData.get('directory') as string || 'ecommerce-images';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const fileUrl = await uploadImageToDrive(file, directory);
    return NextResponse.json({ fileUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
