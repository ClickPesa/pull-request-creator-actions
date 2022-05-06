import * as core from '@actions/core'
import * as github from '@actions/github'

// getting env variables
const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN')
const octokit = github.getOctokit(GITHUB_TOKEN)
const {context = {}}: any = github

async function run(): Promise<any> {
  try {
    console.log('context info', context?.payload)
    // get pull request number
    const pullNumber = context.payload?.head_commit?.message
      ?.split(' ')
      ?.find((o: any) => o?.includes('#'))
      ?.split('#')[1]
    console.log('pull number', pullNumber)

    // fetch pull request
    const pullRequest = await octokit.rest.pulls.get({
      owner: context.payload?.repository?.owner?.login,
      repo: context.payload?.repository?.name,
      pull_number: pullNumber
    })
    console.log('pull request info', pullRequest?.data)

    return pullRequest?.data
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
