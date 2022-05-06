import * as core from '@actions/core'
import * as github from '@actions/github'

const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN')
const octokit = github.getOctokit(GITHUB_TOKEN)
const {context = {}}: any = github

async function run(): Promise<string> {
  try {
    core.info(context?.payload?.head_commit?.message)
    // this returns commit with pr informations
    // get pull Number, make an api request to fetch pr informations
    const pullNumber: string = context.payload?.head_commit?.message
      ?.split(' ')
      ?.find((o: string) => o?.includes('#'))
      ?.split('#')[1]

    core.info(pullNumber)

    const pullRequest: any = await octokit.rest.pulls.get({
      owner: context.payload?.repository?.owner?.login,
      repo: context.payload?.repository?.name,
      pull_number: Number(pullNumber)
    })
    core.info(pullRequest?.data?.head.user.login)
    const author: string = pullRequest?.data?.head.user.login
    return author
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
