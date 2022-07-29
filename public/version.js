const childProcess = require('child_process')
const git = 'git'

const projectUrl = childProcess.execSync(git + ' config remote.origin.url').toString().trim()
const branch = childProcess.execSync(git + ' describe --all').toString().trim().split('/').pop()
const commit = childProcess.execSync(git + ' show -s --format=%H').toString().trim()
const committer = childProcess.execSync(git + ' show -s --format=%cn').toString().trim()
const commitMessage = childProcess.execSync(git + ' show -s --format=%s').toString().trim()
const commitDateStr = childProcess.execSync(git + ' show -s --format=%cd').toString().trim()
const committerEmail = childProcess.execSync(git + ' show -s --format=%ce').toString().trim()
// const builder = childProcess.execSync(git + ' config user.name').toString().trim()
// const builderEmail = childProcess.execSync(git + ' config user.email').toString().trim()

const project = projectUrl.split('/').pop()
const buildDate = new Date().toLocaleDateString() + ' ' + new Date().toLocaleDateString()
const commitDate = new Date(commitDateStr).toLocaleDateString() + ' ' + new Date(commitDateStr).toLocaleDateString()

module.exports = {
  branch,
  commit,
  project,
  committer,
  buildDate,
  commitDate,
  commitMessage,
  committerEmail
  // builder,
  // builderEmail,
}
