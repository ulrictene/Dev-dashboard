export type GithubEventType = "PushEvent" | "PullRequestEvent" | "IssuesEvent" | "Other";

export type GithubActivityItem = {
  id: string;
  type: GithubEventType;
  repo: string;          
  message?: string;      
  createdAt: string;     
  url?: string;          
};
