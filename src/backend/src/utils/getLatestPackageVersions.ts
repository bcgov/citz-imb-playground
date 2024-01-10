import RssParser from "rss-parser";

const rssParser = new RssParser();

type RepoTagMap = {
  [repoUrl: string]: string | null;
};

const repoUrls = [
  "https://github.com/bcgov/citz-imb-kc-react",
  "https://github.com/bcgov/citz-imb-kc-express",
  "https://github.com/bcgov/citz-imb-kc-css-api",
  "https://github.com/bcgov/citz-imb-richtexteditor",
];

// Get latest tags for a list of GitHub repo URLs.
export const getLatestPackageVersions = async (): Promise<RepoTagMap> => {
  const tagMap: RepoTagMap = {};

  for (const url of repoUrls) {
    const repoDetails = extractRepoDetails(url);
    if (!repoDetails) {
      tagMap[url] = null;
      continue;
    }

    const tag = await getLatestTag(repoDetails.owner, repoDetails.repo);
    tagMap[url] = tag;
  }

  return tagMap;
};

// Extracts the owner and repo name from a GitHub URL.
const extractRepoDetails = (
  url: string
): { owner: string; repo: string } | null => {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  return match ? { owner: match[1], repo: match[2] } : null;
};

// Gets the latest tag of a GitHub repository from its Atom feed.
const getLatestTag = async (
  owner: string,
  repo: string
): Promise<string | null> => {
  try {
    const feed = await rssParser.parseURL(
      `https://github.com/${owner}/${repo}/releases.atom`
    );
    if (feed.items && feed.items.length > 0) {
      const latestRelease = feed.items[0];
      const match = latestRelease.link?.match(/\/tag\/(.+)$/);
      return match ? match[1].substring(1) : null;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching tags for ${owner}/${repo}:`, error);
    return null;
  }
};
