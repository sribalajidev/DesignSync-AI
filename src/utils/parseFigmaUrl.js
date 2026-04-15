// Take figma url and return file key and node id
function parseFigmaUrl(figmaUrl) {
  if (!figmaUrl || typeof figmaUrl !== 'string') {
    throw new Error('Invalid Figma URL');
  }

  try {
    const url = new URL(figmaUrl); // create url object from string

    const pathParts = url.pathname.split('/'); //split path
    const designIndex = pathParts.indexOf('design'); // find index of design in path

    if (designIndex === -1 || designIndex + 2 >= pathParts.length) {
      throw new Error('Invalid Figma URL format');
    }

    const fileKey = pathParts[designIndex + 1]; // get file key from path
    const nodeIdRaw = url.searchParams.get('node-id'); // get node id from query parameters

    if(!nodeIdRaw) {
      throw new Error('Invalid Figma URL: node-id not found');
    }

    const nodeId = nodeIdRaw.replace('-', ':' );

    return { fileKey, nodeId }; // return file key and node id as an object
  }

  catch (error) {
    throw new Error(`Error parsing Figma URL: ${error.message}`);
  }
}

export default parseFigmaUrl; // export the function for use in other files