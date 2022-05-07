import * as core from '@actions/core'
import * as github from '@actions/github'

const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN')
const octokit = github.getOctokit(GITHUB_TOKEN)
const {context = {}}: any = github

async function run(): Promise<any> {
  try {
    const pullNumber: string = context.payload?.head_commit?.message
      ?.split(' ')
      ?.find((o: string) => o?.includes('#'))
      ?.split('#')[1]
    const pullRequest: any = await octokit.rest.pulls.get({
      owner: context.payload?.repository?.owner?.login,
      repo: context.payload?.repository?.name,
      pull_number: Number(pullNumber)
    })
    const author: string = pullRequest?.data?.head.user.login
    core.setOutput('author', author)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
