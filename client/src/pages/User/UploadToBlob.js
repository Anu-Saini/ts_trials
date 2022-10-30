// ./src/azure-storage-blob.ts

// <snippet_package>
// THIS IS SAMPLE CODE ONLY - NOT MEANT FOR PRODUCTION USE
import { BlobServiceClient, ContainerClient} from '@azure/storage-blob';

var containerName = "";
//for Anu to change
const sasToken = "sv=2021-06-08&ss=b&srt=sco&sp=rwdlacx&se=2022-12-31T19:23:48Z&st=2022-10-29T11:23:48Z&spr=https&sig=5lVSRaDgMXyaRaUK27xNKm5jf%2Feq2tPOYALJJNr3L7E%3D";
// key 1 - DefaultEndpointsProtocol=https;AccountName=animalkingdomstorage;AccountKey=VPAobDEnr1vyznsUmbw2eWF1UpGmekGsZa3+8xZZZxLcChDzBLlXZyefvMmm2DHToJIKsuakvcAg+AStnoCmaQ==;EndpointSuffix=core.windows.net
// key 2 - DefaultEndpointsProtocol=https;AccountName=animalkingdomstorage;AccountKey=d6iblWWP5pf50bE1wx/jjbQ+WNu4hS81BzE5znx3+8rOKFBmUZQL3cnrVwpEijrsvDGGChlzyL2D+AStjwDJxA==;EndpointSuffix=core.windows.net
const storageAccountName = "rahatblob9b2e"; 
// change till here
// </snippet_package>

// <snippet_isStorageConfigured>
// Feature flag - disable storage feature to app if not configured
export const isStorageConfigured = () => {
  return (!storageAccountName || !sasToken) ? false : true;
}
// </snippet_isStorageConfigured>

// <snippet_getBlobsInContainer>
// return list of blobs in container to display
const getBlobsInContainer = async (containerClient) => {
  const returnedBlobUrls = [];

  // get list of blobs in container
  // eslint-disable-next-line
  for await (const blob of containerClient.listBlobsFlat()) {
    // if image is public, just construct URL
    returnedBlobUrls.push(
       
      `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`
    );
  }

  return returnedBlobUrls;
}
// </snippet_getBlobsInContainer>

// <snippet_createBlobInContainer>
const createBlobInContainer = async (containerClient, file) => {
  
  // create blobClient for container
  const blobClient = containerClient.getBlockBlobClient(file.name);

  // set mimetype as determined from browser with file upload control
  const options = { blobHTTPHeaders: { blobContentType: file.type } };

  // upload file
  await blobClient.uploadData(file, options);
  
}
// </snippet_createBlobInContainer>

// <snippet_uploadFileToBlob>
const uploadFileToBlob = async (file, container) => {
  if (!file) return [];

containerName = container;
  // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  );

  // get Container - full public read access
  const containerClient = blobService.getContainerClient(containerName);
  await containerClient.createIfNotExists({
    access: 'container',
  });

  // upload file
  await createBlobInContainer(containerClient, file);

  // get list of blobs in container
  return getBlobsInContainer(containerClient);
};
// </snippet_uploadFileToBlob>

export default uploadFileToBlob;