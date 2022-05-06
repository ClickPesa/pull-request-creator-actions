import * as core from '@actions/core'
import * as github from '@actions/github'

const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN')
const octokit = github.getOctokit(GITHUB_TOKEN)
const {context = {}}: any = github

async function run(): Promise<string> {
  try {
    const author: string = context?.payload?.head_commit?.author.username
    core.info(context?.payload?.head_commit?.message)
    // this returns commit with pr informations
    // get pull Number, make an api request to fetch pr informations
    const pullNumber: number = context.payload?.head_commit?.message
      ?.split(' ')
      ?.find((o: string) => o?.includes('#'))
      ?.split('#')[1]
    const pullRequest: any = await octokit.rest.pulls.get({
      owner: context.payload?.repository?.owner?.login,
      repo: context.payload?.repository?.name,
      pull_number: pullNumber
    })
    core.info(pullRequest?.data)
    return author
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
