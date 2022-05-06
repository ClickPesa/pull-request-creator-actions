import * as core from '@actions/core'
import * as github from '@actions/github'

const {context = {}}: any = github

async function run(): Promise<string> {
  try {
    const author: string = context?.payload?.head_commit?.author.username
    return author
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
