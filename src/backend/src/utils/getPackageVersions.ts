import fs from "fs";

type PackageVersionMap = {
  [packageName: string]: string;
};

// File paths.
const frontendPackageJsonPath = "../frontendPackage.json";
const backendPackageJsonPath = "./package.json";

// Search for the following packages:
const frontendPackages = [
  "@bcgov/citz-imb-kc-react",
  "@bcgov/citz-imb-richtexteditor",
];
const backendPackages = [
  "@bcgov/citz-imb-kc-express",
  "@bcgov/citz-imb-kc-css-api",
];

/**
 * Parses package.json files to get current package versions.
 * @returns a map of packages to the current verions.
 */
export const getPackageVersions = (): PackageVersionMap => {
  const frontendPackageJson = JSON.parse(
    fs.readFileSync(frontendPackageJsonPath, "utf8")
  );
  const backendPackageJson = JSON.parse(
    fs.readFileSync(backendPackageJsonPath, "utf8")
  );

  const versions: PackageVersionMap = {};

  frontendPackages.forEach((pkg) => {
    const version =
      frontendPackageJson.dependencies[pkg] ||
      frontendPackageJson.devDependencies[pkg];
    versions[pkg] = extractVersion(version);
  });

  backendPackages.forEach((pkg) => {
    const version =
      backendPackageJson.dependencies[pkg] ||
      backendPackageJson.devDependencies[pkg];
    versions[pkg] = extractVersion(version);
  });

  return versions;
};

/**
 * Extracts the version number from a string.
 * If the string starts with 'https://', it extracts the version number,
 * if the string starts with 'file:', it returns 'from file',
 * otherwise returns the string as is.
 */
const extractVersion = (versionString: string): string => {
  if (versionString.startsWith("file:")) {
    return "from file";
  } else if (versionString.startsWith("https://")) {
    const match = versionString.match(/v\d+\.\d+\.\d+/);
    return match ? match[0].substring(1) : "unknown version";
  }
  return versionString;
};
