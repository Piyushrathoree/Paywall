/** @type {import('next').NextConfig} */
module.exports = {
  // Emit a self-contained production server that the Docker runtime can start
  // without the full monorepo or its development dependencies.
  output: "standalone",
  transpilePackages: ["@repo/ui"],
};
