const repoUrls = [
  'https://github.com/bcgov/citz-imb-kc-react',
  'https://github.com/bcgov/citz-imb-kc-express',
  'https://github.com/bcgov/citz-imb-kc-css-api',
  'https://github.com/bcgov/citz-imb-richtexteditor',
  'https://github.com/bcgov/citz-imb-kc-express-api-docs',
];

// Extracts the owner and repo name from a GitHub URL.
const extractRepoDetails = (url: string) => {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  return match ? { owner: match[1], repo: match[2] } : null;
};

// Gets the number of open issues for a GitHub repository using fetch API.
const getOpenIssuesCount = async (owner: string, repo: string) => {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.open_issues_count;
  } catch (error) {
    console.error(`Error fetching open issues for ${owner}/${repo}:`, error);
    return null;
  }
};

// Get open issues count for a list of GitHub repo URLs.
export const getPackageIssues = async () => {
  const issuesCountMap: Record<string, number | null> = {};

  for (const url of repoUrls) {
    const repoDetails = extractRepoDetails(url);
    if (!repoDetails) {
      issuesCountMap[url] = null;
      continue;
    }

    const count = await getOpenIssuesCount(repoDetails.owner, repoDetails.repo);
    issuesCountMap[url] = count;
  }

  return issuesCountMap;
};
