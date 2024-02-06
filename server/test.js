


// const axios = require('axios');
// const fs = require('fs');
// const path = require('path');

// const gitlabBaseUrl = 'https://gitlab.com'; // Update this with your GitLab instance URL
// const projectId = '47495939'; // Replace with your GitLab project ID
// const projectName ='arrowaimonorepo';
// const privateToken = 'glpat-hUxhMFHuoTP99ykvM_Us'; // Replace with your personal access token
// const groupPath = 'arrowyugmonorepos'; 
// const releaseTagName = '5643457874'; // Replace with the tag name of the release you want to download
// const releaseUrl = 'https://gitlab.com/arrowyugmonorepos/arrowaimonorepo/-/releases/5643457874'; // Replace with your release URL

// async function downloadRelease() {
//     try {
//       // Extract group path, project name, and release tag from the release URL
//       const urlParts = releaseUrl.split('/');
//       const groupPath = urlParts[3];
//       const projectName = urlParts[4];
//       const releaseTag = urlParts[6];
  
//       // Get information about the release
//       const releaseApiUrl = `${gitlabBaseUrl}/api/v4/projects/${encodeURIComponent(groupPath)}/${encodeURIComponent(projectName)}/releases/${releaseTag}`;
//       const response = await axios.get(releaseApiUrl, {
//         headers: {
//           'PRIVATE-TOKEN': privateToken,
//         },
//       });
  
//       let assets = response.data.assets || response.data.links || [];
  
//       if (assets.length === 0) {
//         console.log('No assets found for the specified release.');
//         return;
//       }
  
//       // Handle the case where assets are nested within another property
//       if (!Array.isArray(assets)) {
//         assets = assets.assets || assets.links || [];
//       }
  
//       // Download each asset
//       for (const asset of assets) {
//         const assetUrl = `${gitlabBaseUrl}/api/v4/projects/${encodeURIComponent(groupPath)}/${encodeURIComponent(projectName)}/repository/files/${encodeURIComponent(asset.path)}/raw?ref=${releaseTag}`;
//         const assetResponse = await axios.get(assetUrl, {
//           headers: {
//             'PRIVATE-TOKEN': privateToken,
//           },
//           responseType: 'arraybuffer',
//         });
  
//         const assetFileName = path.basename(asset.path);
//         const outputPath = path.join(__dirname, assetFileName);
  
//         fs.writeFileSync(outputPath, Buffer.from(assetResponse.data));
//         console.log(`Downloaded: ${assetFileName}`);
//       }
  
//       console.log('All assets downloaded successfully!');
//     } catch (error) {
//       console.error('Error downloading release:', error.message);
//     }
//   }
  
//   // Run the script
//   downloadRelease();


const { createRest } = require('@gitbraker/rest');
const fs = require('fs');
const path = require('path');

const gitlabBaseUrl = 'https://gitlab.com'; // Update this with your GitLab instance URL
const releaseUrl = 'https://gitlab.com/arrowyugmonorepos/arrowaimonorepo/-/releases/5643457874'; // Replace with your release URL
const privateToken = 'glpat-hUxhMFHuoTP99ykvM_Us'; // Replace with your personal access token

async function downloadRelease() {
  try {
    // Extract group path, project name, and release tag from the release URL
    const urlParts = releaseUrl.split('/');
    const groupPath = urlParts[3];
    const projectName = urlParts[4];
    const releaseTag = urlParts[6];

    // Initialize gitbraker/rest client
    const gitlab = createRest({
      baseUrl: gitlabBaseUrl,
      token: privateToken,
    });

    // Get information about the release
    const release = await gitlab.get(`/projects/${encodeURIComponent(groupPath)}/${encodeURIComponent(projectName)}/releases/${releaseTag}`);

    let assets = release.data.assets || release.data.links || [];

    if (assets.length === 0) {
      console.log('No assets found for the specified release.');
      return;
    }

    // Handle the case where assets are nested within another property
    if (!Array.isArray(assets)) {
      assets = assets.assets || assets.links || [];
    }

    // Download each asset
    for (const asset of assets) {
      const assetUrl = `/projects/${encodeURIComponent(groupPath)}/${encodeURIComponent(projectName)}/repository/files/${encodeURIComponent(asset.path)}/raw?ref=${releaseTag}`;
      const assetResponse = await gitlab.get(assetUrl, {
        responseType: 'arraybuffer',
      });

      const assetFileName = path.basename(asset.path);
      const outputPath = path.join(__dirname, assetFileName);

      fs.writeFileSync(outputPath, Buffer.from(assetResponse.data));
      console.log(`Downloaded: ${assetFileName}`);
    }

    console.log('All assets downloaded successfully!');
  } catch (error) {
    console.error('Error downloading release:', error.message);
  }
}

// Run the script
downloadRelease();


