const fs = require("fs");
const json5 = require("json5");

/**
 * THIS FILE DOES NOT REQUIRE ANY EDITING.
 * Place within .github/helpers/
 */

// Check if a file path is provided.
if (process.argv.length < 3) {
  console.log("Usage: node parse-json5-config <path_to_json5_file>");
  process.exit(1);
}
const filePath = process.argv[2];

/**
 * Read a Json5 file and parse out its values to a github workflow as env vars.
 *
 * Usage in GitHub Workflow:
 *
 * jobs:
 *  # Parse ENV Vars from config.
 *  parse-json5-config:
 *      runs-on: ubuntu-22.04
 *
 *      steps:
 *        # Checkout branch.
 *        - name: Checkout Repository
 *          uses: actions/checkout@v4
 *
 *        # Install json5 npm package for parsing config.
 *        - name: Install Dependencies
 *          run: npm install json5
 *
 *        # Run script to convert json5 config to ENV Vars.
 *        - name: Run Script
 *          run: node .github/helpers/parse-json5-config <path-to-json5-file>
 */
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  try {
    // Parse the JSON5 data
    const jsonData = json5.parse(data);

    // Set each key-value pair as an environment variable
    for (const [key, value] of Object.entries(jsonData)) {
      // Serialize arrays and objects to JSON strings
      const envValue =
        typeof value === "object" ? JSON.stringify(value) : value;
      fs.appendFileSync(process.env.GITHUB_ENV, `${key}=${envValue}\n`);
    }
  } catch (parseError) {
    console.error("Error parsing JSON5:", parseError);
  }
});
