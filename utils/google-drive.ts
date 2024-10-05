import { google } from 'googleapis';
import { Readable } from 'stream';
import path from 'path';

// Initialize Google Drive API client
function initializeDriveClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/drive.file'],
  });

  return google.drive({ version: 'v3', auth });
}

export async function uploadImageToDrive(
  file: File | Buffer,
  directory: string = 'ecommerce-images'
): Promise<string> {
  try {
    const drive = initializeDriveClient();
    
    // Split the directory path and create folders recursively
    const pathParts = directory.split('/').filter(Boolean);
    let currentFolderId = await createFolderPath(drive, pathParts);

    // Prepare file metadata
    const fileMetadata = {
      name: `${Date.now()}-${file instanceof File ? file.name : 'upload'}`,
      parents: [currentFolderId],
    };

    // Prepare media
    const media = {
      mimeType: file instanceof Buffer ? 'image/jpeg' : (file as File).type,
      body: file instanceof Buffer ? Readable.from(file) : Readable.from(Buffer.from(await (file as File).arrayBuffer())),
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id',
    });

    // Make the file publicly accessible
    await drive.permissions.create({
      fileId: response.data.id!,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    // Get the file's web view link
    const result = await drive.files.get({
      fileId: response.data.id!,
      fields: 'webViewLink',
    });

    return result.data.webViewLink || '';
  } catch (error) {
    console.error('Error uploading file to Google Drive:', error);
    throw error;
  }
}

export async function deleteImageFromDrive(fileUrl: string): Promise<void> {
  try {
    const drive = initializeDriveClient();
    const fileId = extractFileIdFromUrl(fileUrl);
    
    if (!fileId) {
      throw new Error('Invalid file URL');
    }

    await drive.files.delete({
      fileId: fileId,
    });
  } catch (error) {
    console.error('Error deleting file from Google Drive:', error);
    throw error;
  }
}

async function createFolderPath(drive: any, pathParts: string[]): Promise<string> {
  let parentId = 'root';
  
  for (const folderName of pathParts) {
    const existingFolder = await getFolderId(drive, folderName, parentId);
    
    if (existingFolder) {
      parentId = existingFolder;
    } else {
      const folder = await drive.files.create({
        requestBody: {
          name: folderName,
          mimeType: 'application/vnd.google-apps.folder',
          parents: [parentId],
        },
        fields: 'id',
      });
      parentId = folder.data.id;
    }
  }
  
  return parentId;
}

async function getFolderId(drive: any, folderName: string, parentId: string = 'root'): Promise<string | null> {
  const response = await drive.files.list({
    q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and '${parentId}' in parents`,
    fields: 'files(id)',
  });

  if (response.data.files.length > 0) {
    return response.data.files[0].id;
  }

  return null;
}

function extractFileIdFromUrl(url: string): string | null {
  const match = url.match(/[-\w]{25,}/);
  return match ? match[0] : null;
}