import { githubRepos } from "@/data/github";

/**
 * Static GitHub data for now.
 * Later: fetch from GitHub on the server using a token that never ships to the client.
 * Example:
 *   const token = process.env.GITHUB_TOKEN;
 *   const res = await fetch(`https://api.github.com/users/${username}/repos`, {
 *     headers: token ? { Authorization: `Bearer ${token}` } : {},
 *   });
 */
export function getGithubRepos() {
  return githubRepos;
}
